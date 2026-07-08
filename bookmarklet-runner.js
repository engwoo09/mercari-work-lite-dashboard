(function () {
  'use strict';

  const DASHBOARD_URL = 'https://engwoo09.github.io/mercari-work-lite-dashboard/';
  const MERCARI_URL = 'https://jp.mercari.com';
  const ID_RE = /m\d{9,12}|(?=[A-Za-z0-9]{18,32}\b)(?=[A-Za-z0-9]*[A-Za-z])(?=[A-Za-z0-9]*\d)[A-Za-z0-9]{18,32}/g;
  const CONFIRM_TARGET_COUNT = 12;
  const mode = (document.currentScript && document.currentScript.dataset.mode) || window.__mercariBookmarkletMode || 'item';

  function unique(values) {
    return Array.from(new Set(values.map((value) => String(value || '').trim()).filter(Boolean)));
  }

  function rowForCheckbox(checkbox) {
    return checkbox.closest('tr')
      || checkbox.closest('[role=row]')
      || checkbox.closest('[class*=row]')
      || checkbox.closest('li')
      || checkbox.closest('div')
      || checkbox.parentElement;
  }

  function linkMatchesMode(href, targetMode) {
    if (!href || !href.includes(MERCARI_URL)) return false;
    if (targetMode === 'item') return href.includes('/item/') || href.includes('/shops/product/');
    return href.includes('/transaction/');
  }

  function collectMercariLinks(root, targetMode) {
    if (!root) return [];
    return Array.from(root.querySelectorAll('a[href]'))
      .map((link) => link.href || '')
      .filter((href) => linkMatchesMode(href, targetMode));
  }

  function checkboxLooksLikeBulkSelector(checkbox) {
    const row = rowForCheckbox(checkbox);
    if (!row) return true;
    if (row.querySelectorAll('input[type=checkbox]').length > 1) return true;
    if (checkbox.closest('th, thead')) return true;
    const text = row.innerText || row.textContent || '';
    ID_RE.lastIndex = 0;
    const hasMercariId = ID_RE.test(text);
    ID_RE.lastIndex = 0;
    const hasMercariLink = collectMercariLinks(row, 'item').length || collectMercariLinks(row, 'transaction').length;
    if (hasMercariId || hasMercariLink) return false;
    const aria = `${checkbox.getAttribute('aria-label') || ''} ${checkbox.title || ''}`.toLowerCase();
    return /all|select|전체|선택/.test(aria);
  }

  function checkedOrderCheckboxes() {
    return Array.from(document.querySelectorAll('input[type=checkbox]:checked'))
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

  function urlForId(id, targetMode) {
    if (/^[A-Za-z0-9]{18,32}$/.test(id) && !/^m\d{9,12}$/i.test(id)) return `${MERCARI_URL}/shops/product/${id}`;
    if (targetMode === 'item') return `${MERCARI_URL}/item/${id}`;
    return `${MERCARI_URL}/transaction/${id}`;
  }

  function extractIds(checkboxes) {
    let ids = [];
    checkboxes.forEach((checkbox) => {
      collectTextAndLinks(rowForCheckbox(checkbox)).forEach((text) => {
        const matches = text.match(ID_RE);
        if (matches) ids = ids.concat(matches);
      });
    });
    return unique(ids);
  }

  function extractTargets(targetMode) {
    let urls = [];
    const checked = checkedOrderCheckboxes();
    if (!checked.length) return [];
    checked.forEach((checkbox) => {
      urls = urls.concat(collectMercariLinks(rowForCheckbox(checkbox), targetMode));
    });
    const ids = extractIds(checked);
    urls = urls.concat(ids.map((id) => urlForId(id, targetMode)));
    return unique(urls).map((url) => ({ url, key: (url.match(ID_RE) || [url])[0] }));
  }

  function clearCheckedRows() {
    checkedOrderCheckboxes().forEach((checkbox) => {
      if (checkbox.checked) checkbox.click();
      if (checkbox.checked) checkbox.checked = false;
      checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      checkbox.dispatchEvent(new Event('input', { bubbles: true }));
    });
  }

  const targets = extractTargets(mode);
  if (!targets.length) {
    window.alert('체크된 주문에서 Mercari ID를 찾을 수 없습니다. 주문 행을 체크한 뒤 다시 실행하세요.');
    return;
  }
  if (targets.length > CONFIRM_TARGET_COUNT && !window.confirm(`${targets.length}개 탭을 열려고 합니다. 계속할까요?`)) return;
  const opened = targets.map((target) => window.open(target.url, `mercari_${mode}_${target.key}`)).filter(Boolean).length;
  const ids = unique(targets.map((target) => target.key));
  window.open(`${DASHBOARD_URL}?view=opener&mode=${encodeURIComponent(mode)}&ids=${encodeURIComponent(ids.join(' '))}`, 'mercari_work_dashboard');
  clearCheckedRows();
  if (!opened) window.alert('탭 열기가 차단되었습니다. Chrome 주소창 오른쪽의 팝업 차단을 허용한 뒤 다시 실행하세요.');
})();
