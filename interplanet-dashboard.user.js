// ==UserScript==
// @name         Mercari Work Dashboard Opener
// @namespace    https://mercari.local/work-dashboard
// @version      1.4.2
// @description  Interplanet 주문목록에서 Mercari 업무 대시보드를 엽니다.
// @match        *://cs.interplanet.co.kr/cpanel/manager/mercari*
// @match        *://cs30.interplanet.co.kr/cpanel/manager/mercari*
// @match        https://engwoo09.github.io/mercari-work-lite-dashboard/*
// @updateURL    https://raw.githubusercontent.com/engwoo09/mercari-work-lite-dashboard/main/interplanet-dashboard.user.js
// @downloadURL  https://raw.githubusercontent.com/engwoo09/mercari-work-lite-dashboard/main/interplanet-dashboard.user.js
// @grant        none
// @run-at       document-idle
// ==/UserScript==
(function () {
  'use strict';

  const DASHBOARD_URL = 'https://engwoo09.github.io/mercari-work-lite-dashboard/';
  const MERCARI_URL = 'https://jp.mercari.com';
  const ID_RE = /m\d{9,12}|(?=[A-Za-z0-9]{18,32}\b)(?=[A-Za-z0-9]*[A-Za-z])(?=[A-Za-z0-9]*\d)[A-Za-z0-9]{18,32}/g;
  const SCRIPT_ID = 'opener';
  const SCRIPT_NAME = 'Mercari Work Dashboard Opener';
  const SCRIPT_VERSION = '1.4.2';
  const CONFIRM_TARGET_COUNT = 12;
  const DASHBOARD_HOSTS = new Set(['engwoo09.github.io']);

  function reportInstalled() {
    try {
      const key = 'mercariManagedUserscripts';
      const current = JSON.parse(localStorage.getItem(key) || '{}');
      current[SCRIPT_ID] = { name: SCRIPT_NAME, version: SCRIPT_VERSION, checkedAt: new Date().toISOString() };
      localStorage.setItem(key, JSON.stringify(current));
      window.dispatchEvent(new CustomEvent('mercari-userscript-installed', { detail: current[SCRIPT_ID] }));
      window.postMessage({ source: 'mercari-userscript', installedScript: current[SCRIPT_ID], scriptId: SCRIPT_ID }, location.origin);
    } catch (_error) {
    }
  }

  const isDashboardPage = DASHBOARD_HOSTS.has(location.hostname) && (
    location.hostname !== 'engwoo09.github.io' || location.pathname.startsWith('/mercari-work-lite-dashboard/')
  );
  if (isDashboardPage) {
    reportInstalled();
    return;
  }

  function unique(values) {
    return Array.from(new Set(values.map((value) => String(value || '').trim()).filter(Boolean)));
  }

  function isVisible(el) {
    if (!el || !el.isConnected) return false;
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    return Boolean(el.getClientRects().length);
  }

  function rowForCheckbox(checkbox) {
    const row = checkbox.closest('tr') || checkbox.closest('[role=row]') || checkbox.closest('li');
    if (!row || !isVisible(row)) return null;
    return row;
  }

  function checkboxLooksLikeBulkSelector(checkbox) {
    const row = rowForCheckbox(checkbox);
    if (!row) return true;
    const inputCount = row.querySelectorAll('input[type=checkbox]').length;
    const headerCell = checkbox.closest('th, thead');
    if (headerCell) return true;
    const text = row.innerText || row.textContent || '';
    ID_RE.lastIndex = 0;
    const idCount = unique(text.match(ID_RE) || []).length;
    ID_RE.lastIndex = 0;
    const hasMercariLink = collectMercariLinks(row, 'item').length || collectMercariLinks(row, 'transaction').length;
    if ((idCount > 0 && idCount <= 3) || hasMercariLink) return false;
    if (inputCount > 1 || idCount > 3) return true;
    const aria = `${checkbox.getAttribute('aria-label') || ''} ${checkbox.title || ''}`.toLowerCase();
    return /all|select|전체|선택/.test(aria);
  }

  function checkedOrderCheckboxes() {
    return Array.from(document.querySelectorAll('input[type=checkbox]:checked'))
      .filter(isVisible)
      .filter((checkbox) => !checkboxLooksLikeBulkSelector(checkbox));
  }

  function collectTextAndLinks(root) {
    const parts = [];
    if (!root) return parts;
    parts.push(root.innerText || root.textContent || '');
    root.querySelectorAll('a[href]').forEach((link) => {
      parts.push(link.href || '');
      parts.push(link.textContent || '');
    });
    return parts;
  }

  function linkMatchesMode(href, mode) {
    if (!href || !href.includes(MERCARI_URL)) return false;
    if (mode === 'item') return href.includes('/item/') || href.includes('/shops/product/');
    return href.includes('/transaction/');
  }

  function collectMercariLinks(root, mode) {
    if (!root) return [];
    return Array.from(root.querySelectorAll('a[href]'))
      .map((link) => link.href || '')
      .filter((href) => linkMatchesMode(href, mode));
  }

  function idsFromRow(row) {
    let ids = [];
    collectTextAndLinks(row).forEach((text) => {
      const matches = text.match(ID_RE);
      if (matches) ids = ids.concat(matches);
    });
    return unique(ids);
  }

  function rowLooksTooBroad(row) {
    return idsFromRow(row).length > 3 || row.querySelectorAll('input[type=checkbox]').length > 1;
  }

  function extractIds() {
    let ids = [];
    checkedOrderCheckboxes().forEach((checkbox) => {
      const row = rowForCheckbox(checkbox);
      if (!row || rowLooksTooBroad(row)) return;
      ids = ids.concat(idsFromRow(row));
    });
    return unique(ids);
  }

  function extractTargets(mode) {
    let urls = [];
    const checked = checkedOrderCheckboxes();
    if (!checked.length) {
      return [];
    }
    checked.forEach((checkbox) => {
      const row = rowForCheckbox(checkbox);
      if (!row || rowLooksTooBroad(row)) return;
      urls = urls.concat(collectMercariLinks(row, mode));
    });

    const ids = extractIds();
    urls = urls.concat(ids.map((id) => urlForId(id, mode)));
    return unique(urls).map((url) => ({
      url,
      key: (url.match(ID_RE) || [url])[0],
    }));
  }

  function urlForId(id, mode) {
    if (/^[A-Za-z0-9]{18,32}$/.test(id) && !/^m\d{9,12}$/i.test(id)) {
      return `${MERCARI_URL}/shops/product/${id}`;
    }
    if (mode === 'item') return `${MERCARI_URL}/item/${id}`;
    return `${MERCARI_URL}/transaction/${id}`;
  }

  function clearCheckedRows() {
    checkedOrderCheckboxes().forEach((checkbox) => {
      if (checkbox.checked) checkbox.click();
      if (checkbox.checked) checkbox.checked = false;
      checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      checkbox.dispatchEvent(new Event('input', { bubbles: true }));
    });
  }

  function openDashboard(mode) {
    const targets = extractTargets(mode);
    if (!targets.length) {
      window.alert('체크된 주문에서 Mercari ID를 찾을 수 없습니다. 주문 행을 체크한 뒤 다시 실행하세요.');
      return;
    }
    if (targets.length > CONFIRM_TARGET_COUNT && !window.confirm(`${targets.length}개 탭을 열려고 합니다. 계속할까요?`)) {
      return;
    }
    const opened = targets
      .map((target) => window.open(target.url, `mercari_${mode}_${target.key}`))
      .filter(Boolean).length;
    const ids = unique(targets.map((target) => target.key));
    const dashboardUrl = `${DASHBOARD_URL}?view=opener&mode=${encodeURIComponent(mode)}&ids=${encodeURIComponent(ids.join(' '))}`;
    window.open(dashboardUrl, 'mercari_work_dashboard');
    clearCheckedRows();
    if (!opened) {
      window.alert('탭 열기가 차단되었습니다. Chrome 주소창 오른쪽의 팝업 차단을 허용한 뒤 다시 실행하세요.');
    }
  }

  function addButton(label, mode) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.style.cssText = [
      'border:1px solid #dadce0',
      'background:#fff',
      'border-radius:6px',
      'padding:7px 10px',
      'font-size:12px',
      'cursor:pointer',
      'white-space:nowrap',
    ].join(';');
    button.addEventListener('click', () => openDashboard(mode));
    return button;
  }

  function mountPanel() {
    if (document.getElementById('mercari-work-dashboard-panel')) return;
    const panel = document.createElement('div');
    panel.id = 'mercari-work-dashboard-panel';
    panel.style.cssText = [
      'position:fixed',
      'right:16px',
      'top:42vh',
      'transform:translateY(-50%)',
      'z-index:999999',
      'display:flex',
      'flex-direction:column',
      'gap:6px',
      'align-items:stretch',
      'padding:8px 7px',
      'background:#fff',
      'border:1px solid #e3e6ea',
      'border-top:4px solid #ff0211',
      'border-radius:8px',
      'box-shadow:0 4px 14px rgba(0,0,0,.14)',
      'font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif',
    ].join(';');
    const title = document.createElement('span');
    title.textContent = 'Mercari';
    title.style.cssText = 'font-size:12px;color:#ff0211;font-weight:700;text-align:center;line-height:1;';
    panel.appendChild(title);
    panel.appendChild(addButton('거래', 'transaction'));
    panel.appendChild(addButton('상품', 'item'));
    document.body.appendChild(panel);
  }

  mountPanel();
})();
