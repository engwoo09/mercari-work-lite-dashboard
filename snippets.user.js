// ==UserScript==
// @name         Mercari Dashboard Snippets
// @namespace    https://mercari.local/dashboard
// @version      1.3.1
// @description  팀 공용 자동완성 문구를 Mercari 및 Interplanet 주문 입력창에서 바로 사용합니다.
// @match        https://jp.mercari.com/*
// @match        https://*.mercari.com/*
// @match        https://mercari.com/*
// @match        https://mercari-shops.com/orders/*
// @match        https://mercari-shops.com/orders/*/contact*
// @match        https://*.mercari-shops.com/orders/*
// @match        https://*.mercari-shops.com/orders/*/contact*
// @match        *://manager.interplanet.co.kr/cpanel/order/order_detail/*
// @match        *://*.interplanet.co.kr/cpanel/order/order_detail/*
// @match        *://manager.interplanet.co.kr/cpanel/order/modal_sms_pop*
// @match        *://*.interplanet.co.kr/cpanel/order/modal_sms_pop*
// @match        https://engwoo09.github.io/mercari-work-lite-dashboard/*
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @connect      engwoo09.github.io
// @connect      raw.githubusercontent.com
// @updateURL    https://raw.githubusercontent.com/engwoo09/mercari-work-lite-dashboard/main/snippets.user.js
// @downloadURL  https://raw.githubusercontent.com/engwoo09/mercari-work-lite-dashboard/main/snippets.user.js
// @run-at       document-idle
// ==/UserScript==
(function () {
  'use strict';

  const API_URLS = ['https://engwoo09.github.io/mercari-work-lite-dashboard/data/snippets.json', 'https://raw.githubusercontent.com/engwoo09/mercari-work-lite-dashboard/main/data/snippets.json'];
  const SCRIPT_ID = 'snippets';
  const SCRIPT_NAME = 'Mercari Dashboard Snippets';
  const SCRIPT_VERSION = '1.3.1';
  const DASHBOARD_HOSTS = new Set(['engwoo09.github.io']);
  function reportInstalled() {
    try {
      const key = 'mercariManagedUserscripts';
      const current = JSON.parse(localStorage.getItem(key) || '{}');
      current[SCRIPT_ID] = { name: SCRIPT_NAME, version: SCRIPT_VERSION, checkedAt: new Date().toISOString() };
      localStorage.setItem(key, JSON.stringify(current));
      window.dispatchEvent(new CustomEvent('mercari-userscript-installed', { detail: { ...current[SCRIPT_ID], scriptId: SCRIPT_ID } }));
      window.postMessage({ source: 'mercari-userscript', installedScript: current[SCRIPT_ID], scriptId: SCRIPT_ID }, location.origin);
    } catch (_error) {
    }
  }
  const isDashboardPage = DASHBOARD_HOSTS.has(location.hostname);
  if (isDashboardPage) {
    reportInstalled();
  }
  const DEFAULT_SNIPPETS = [{"trigger":"@샵스인사","text":"こんにちは。合同会社HEYCOです。\n韓国のお客様向けに購入・配送代行を行っております。\n\nお手数ですが、スムーズなお取引のため、以下2点にご協力いただけますと幸いです。\n\n① 追跡番号なしの発送方法の場合（定形外郵便など）\n→ 商品確認のため、仮注文番号(⭐)の記載をお願いいたします。\n\n② 適格請求書（インボイス）の発行\n→ 発行事業者様は、以下の内容を記載のうえ、インボイスのご対応をお願いいたします。\n\t•\t宛名：合同会社HEYCO\n\t•\tメール：merukariheyco01@gmail.com\n\t•\t備考：商品代金など\n※メールでの送付を推奨しておりますが、商品に同封でも構いません。\n\nどちらも任意のお願いであり、お取引自体には影響ございません。\nご検討いただけましたら幸いです。何卒よろしくお願いいたします。","enabled":true},{"trigger":"@배송문의","text":"お忙しい中申し訳ありませんが、発送期限が過ぎていることに気づきました。発送可能な日程をお知らせいただけますでしょうか。大幅な遅れが生じる場合は、キャンセルをお願いする可能性もございますので、ご事情をお聞かせください。よろしくお願いいたします。","enabled":true},{"trigger":"@정밀검수","text":"[상품 도착 안내] 정밀 검수 사진 확인 요청\n도착 상품의 정밀 검수 사진 업로드가 완료되었습니다. 아래 두 가지 중 한 가지 방법으로 검수 확인을 부탁드립니다.\n1. 2차 결제 (실비 정산) 진행\n2. 결제가 어려운 경우, 1:1 문의 게시판에 **'정밀검수 확인 완료'**라고 남겨주세요.\n▶ 정밀검수 확인이 필수인 이유\n최종 동의 절차: 사진으로 확인 가능한 범위 내에서 상품 상태에 최종 동의하는 절차입니다.\n책임 소재: 사진 확인 후 별도 문의 없이 진행될 경우, 사진 기준으로 상품에 문제가 없음을 동의하신 것으로 간주됩니다.\n대응 불가: 이후 실물 수령 후 사진에서 확인 가능했던 부분을 놓쳐 발생한 문제에 대해서는 대응이 어렵거나 불가할 수 있습니다.\n메루카리 규정: 구매자 평가가 완료되면 출품자에게 대금이 지급되어, 이후 출품자가 응대를 거부하거나 사무국 지원이 제한됩니다.\n▶ 확인 기한 (문자 발송 당일 · 영업시간 내)\n원활한 처리를 위해 본 문자 발송일의 영업시간 내에 회신을 부탁드립니다.\n영업시간 내 회신이 없을 경우, 검수 결과에 동의하신 것으로 보고 당사 기준에 따라 평가 및 실비 정산 등 거래를 진행할 수 있으며, 그 이후에는 상품 관련 추가 대응이 어렵습니다.","enabled":true},{"trigger":"@주소","text":"〒559-0034\n大阪府 大阪市住之江区 南港北2-1-10 ITM棟12階 C-4 heyco-office\n山田 花子(ヤマダ ハナコ) 様\n06-4703-3277\nここでお願いします。","enabled":true},{"trigger":"@합배수정","text":"합배송 중 일부 주문이 취소되었습니다. 취소된 주문을 제외한 나머지 합배송 주문건들은 이미 입고되어 있어 다음과 같이 안내드립니다.\n1. 추가 없이 도착한 주문만 입고 진행\n- 취소된 상품이 도착하지 않아 무게가 0g이므로, 개인결제창을 통해 국제배송비를 별도 결제하셔야 합니다.\n2. 새로운 주문 혹은 기존 주문을 합배송에 포함\n- 어떤 주문을 어디에 포함하고 싶으신지 명확히 알려주셔야 합니다.\n위 두 가지 경우 모두 1:1 문의 게시판으로 회신해 주셔야 처리가 가능하오니 양해 부탁드립니다.\n\n- 현재 합배송 중 입고완료된 주문번호\n:","enabled":true},{"trigger":"@송료포함","text":"안녕하세요. 고객님.\n메루카리샵스의 경우 상점 정책에 따라 상품가에 송료가 포함되지 않고 구매자가 별도 지불하도록 설정할 수 있습니다. 해당 출품의 경우 상품가 000엔 외 송료가 000엔 발생하는 출품입니다. 해당 내용은 구매 시 출품페이지에서 확인이 가능합니다. 발생하는 송료는 상품가에 반영해 2차정산 시 처리되므로 참고부탁드립니다. 그대로 진행하실 지 1:1문의 게시판으로 회신부탁드립니다.","enabled":true},{"trigger":"@착불","text":"この度は、メルカリ公式パートナーとして、商品購入の申し込みをされた海外のお客さまに代わってお手続きさせていただきます「heyco」です。通常の取引と変わらず、出品者様側で特別な対応は一切不要ですので、ご安心ください。お取引終了まで責任をもってご対応させていただきます。また、★梱包の際は商品IDをご明記いただけますと幸いです（商品IDは取引画面でご確認いただけます）。なお、複数商品を購入した場合は、各取引ごとに発送をお願いいたします。また、記載のないおまけ等がございましたら事前にお知らせください。ご不明点やお取引が難しい場合は、お気軽にお知らせくださいませ。\n\nお世話になっております。着払いの場合、取引画面で追跡番号を確認することが難しいため、運送会社名、追跡番号、着払い料金を教えていただけますでしょうか？\nスムーズな受け取り確認を行うため、ご協力お願いします。","enabled":true},{"trigger":"@취소사유","text":"連絡不在及び発送期限超過のため、やむを得ずキャンセルさせていただきます。一旦キャンセルさせていただきますが、発送可能であれば取引を再開させていただきます。 発送が遅れる場合は、新しい発送日をお知らせください。","enabled":true},{"trigger":"@추적불가","text":"お世話になっております。発送通知をいただいておりますが、現在追跡確認ができない状況となっております。問題ないかご確認いただけますでしょうか。","enabled":true},{"trigger":"@주류안내","text":"주류 첫 구매에 대한 안내입니다. 향후 주류 구매 시 아래 내용을 참고해 주시기 바랍니다. 이후 거래에서는 별도 안내가 없으니 양해 부탁드립니다.\n\n1. 주류는 통관 시 용량, 도수, 주종 등에 따라 관부가세 및 추가세금(교육세, 주세 등)이 발생합니다. (자세한 내용은 관세청 125번으로 문의)\n2. 항공특송으로 배송 시 도수 70도 이상의 주류는 통관이 불가하여 자동으로 선편으로 변경됩니다.","enabled":true},{"trigger":"@가격인상","text":"상품가격이 0,000엔으로 인상되어 안내드립니다. 결제하신 가격으로 인하요청을 진행 중이나, 거절될 수 있습니다. 가격인하가 되지 않더라도 현재 가격으로 구매를 진행하실지 1:1 문의 게시판으로 회신 부탁드립니다. 회신이 지연될 경우 부득이하게 주문이 취소될 수 있는 점 양해 부탁드립니다.","enabled":true},{"trigger":"@묶음변동","text":"고객님께서 요청하신 묶음 주문 상품 중 n번째 상품(000엔)이 품절되거나 페이지가 삭제되어 현재 구매가 불가능합니다.\n만약 품절된 상품을 제외한 나머지 상품만이라도 구매를 원하실 경우, 1:1 문의 게시판으로 회신해 주시기를 바랍니다.\n만약 회신이 없을 경우, 주문이 취소될 수 있으니 양해 부탁드립니다.\n회신을 확인하는 과정에서 추가 품절이 발생할 수 있으며, 이 경우 구매 가능한 남은 상품으로만 주문이 진행됩니다.\n(예시: 3개 주문 중 1개가 품절되어 2개 구매에 동의하셨으나, 이후 1개가 추가로 품절되면 남은 1개만 진행됩니다.)","enabled":true},{"trigger":"@특수패킹","text":"안녕하세요, 고객님.\n\n구매하신 메루카리 상품의 특수포장에 대해 안내드립니다.\n\n★중요: 이 메시지를 보낸 날부터 2일 안에 게시판으로 답변이 없으면 특수포장에 동의하신 것으로 보고 자동으로 진행됩니다.\n답변 기한: [메시지 보낸 날부터 2일]\n━━━━━━━━━━━━━━━━━━\n★왜 특수포장이 필요한가요?\n고객님의 상품은 국제 배송 중 파손될 위험이 높아서 안전한 배송을 위해 특수포장을 권장합니다.\n- 맞춤 케이스 제작\n- 충격 완화 재료 사용\n- 내부 고정 작업\n━━━━━━━━━━━━━━━━━━\n★예상 비용: 0,000엔\n상품 종류, 크기, 무게에 따라 다릅니다 (비용 및 특수패킹 관련 아래 링크 참고)\nhttps://docs.google.com/document/d/1U6idJUG1BnQ2kD3hh4Xzkft2rBEpvcH0Cu7s0hGynF8/edit?usp=sharing\n(참고: 특수포장을 거부하셔도 국제 배송 규정상 기본 포장 작업이 필요해서 최소 비용이 발생할 수 있습니다.)\n\n★주의사항\n특수포장을 하면 비용이 많이 들고, 무게가 늘어나서 진행 후에는 취소가 불가능합니다.\n따라서 고객님의 확인과 동의가 필요합니다.\n\n★답변 방법 (게시판에 작성해주세요)\nO : 특수포장을 원하시는 경우\n  → 게시판에 \"특수포장 진행 동의합니다\" 라고 남겨주세요\n  → 또는 답변 없이 2일이 지나면 동의하신 것으로 간주됩니다\n\nX : 특수포장을 원하지 않는 경우\n  → 게시판에 이렇게 남겨주세요:\n  \"특수포장을 거부하며, 국제 배송 중 파손이 발생해도 책임을 묻지 않겠습니다.\"\n\n★빠른 답변을 주시면 더 빨리 배송 처리가 가능합니다.\n기한 내에 답변 주시면 바로 처리하겠습니다.\n━━━━━━━━━━━━━━━━━━\n\n궁금하신 점이 있으면 언제든지 연락 주세요.\n감사합니다.","enabled":true},{"trigger":"@파손면책","text":"안녕하세요.\n메루카리에서 주문하신 상품에 대해 안내드립니다.\n주문하신 상품은 유리나 아크릴 등 파손위험이 높은 재질의 상품으로 배송 중에 파손위험이 높습니다. 저희가 최대한 안전하게 포장하지만, 배송 중 파손될 위험이 있고 운송사에서 보상이 안 됩니다. 그래서 고객님께서 파손 가능성에 동의해 주셔야 국제배송을 진행할 수 있습니다.\n★1:1 문의게시판에 아래 문구를 남겨주세요:\n'국제운송 중 상품이 파손되어도 당사에 책임을 묻지 않겠습니다.'\n동의 확인 후 출하가 진행되오니 1:1 문의게시판이나 고객센터로 빠른 답변 부탁드립니다.\n\n★중요: 본 메시지에 회신이 없으시면 파손면책 동의로 간주하여 자동 진행됩니다.\n회신 기한: [2영업일 이내]\n\n감사합니다.","enabled":true},{"trigger":"@가격인하","text":"コメント失礼します。 即決の場合、000円まで値下げは可能でしょうか？ 検討お願いします。","enabled":true},{"trigger":"@보류실수","text":"해당 상품은 보류 안내를 드렸으나 현지에서 구매가 정상적으로 진행되었습니다. 아직 구매 의사가 있으신 경우, 개인결제를 통해 재결제해 주시면 정상적으로 진행 가능합니다. 번거롭게 해드려 죄송합니다. 구매 의사가 없으신 경우 1:1 문의 게시판으로 회신해 주시면 감사하겠습니다.\n- 회신 지연 혹은 미회신 시 도착한 상품은 폐기 처리됩니다.\n- 개인결제 방법\n[마이페이지]-[마이포켓]-[개인결제]","enabled":true},{"trigger":"@코멘트진행","text":"[메루카리 요청 사항 반영 및 결제 안내]\n\n고객님께서 문의하신 내용에 대해 출품자의 긍정적인 답변과 페이지 수정이 완료되었습니다. 지금 바로 확인 후 결제를 진행해 주시면 감사하겠습니다.\n\n메루카리 이용 에티켓과 관련하여 잠시 안내 말씀 드립니다. 일본 현지 거래 문화상, 페이지 수정 및 답변 이후 결제나 회신 없이 거래가 지연될 경우 출품자로부터 구매 거부 및 블랙리스트 등록 등의 불이익을 받을 수 있습니다. 이는 당사 공식 계정의 신뢰도에도 큰 영향을 미치게 됩니다.\n\n원활한 구매 진행과 향후 지속적인 서비스 이용을 위해, 페이지 반영 후에는 가급적 빠른 결제를 부탁드립니다. 요청 후 장시간 결제나 회신이 이루어지지 않는 사례가 반복될 경우, 부득이하게 문의 요청 서비스 이용이 제한될 수 있는 점 너그러운 양해 부탁드립니다.\n\n항상 저희 서비스를 이용해 주셔서 감사합니다. 만족스러운 쇼핑이 되실 수 있도록 최선을 다하겠습니다.","enabled":true},{"trigger":"@정형외지연","text":"[현지배송 확인중 알림]\n해당 상품은 추적 및 보상이 불가한 배송편으로 발송되었습니다. 이 배송편은 우체국에서 주말 및 공휴일에 처리되지 않아 배송까지 영업일 기준 7~10일이 소요됩니다. 현재 배송문제(분실이나 반송 등)가 발생한 것으로 보여 출품자에게 확인 중입니다.\n배송 지연은 출품자의 주소 오기입, 우편요금 부족, 포장 과대 등으로 인한 반송이 원인일 수 있습니다. 분실의 경우, 추적 및 보상이 불가하여 출품자와의 협의 과정에서 처리가 지연될 수 있음을 양해 부탁드립니다.\n특히 카드류나 작은 장난감류는 이 배송편을 이용해 저렴하게 판매되는 경우가 많습니다. 수집용 고가 카드 등을 구매하실 때는 '메루카리 배송편'과 같이 추적 및 보상이 가능한 배송방법으로 변경하시기를 권장드립니다. 다만, 배송방법 변경 시 배송비로 인해 상품가가 인상될 수 있는 점 양해 부탁드립니다.","enabled":true},{"trigger":"@조사의뢰","text":"お世話になっております。\n定形外郵便や普通郵便での配送は時間がかかる場合があることは承知しております。0月0日に発送通知を受け取り、1週間後の0月0日に自動取引完了防止の処理もいたしました。しかし、現在10営業日が経過しても商品が届いておりません。もしかして、出品者様へ返送されたり、紛失したりなど、配送に問題が生じていないかご確認いただけますでしょうか。","enabled":true},{"trigger":"@당일발송요청","text":"本日の発送をお願いいたします。","enabled":true},{"trigger":"@해제문의","text":"現在、決済ができないことをお知らせします。商品を購入したいのですが、利用制限が解除される時期を知ることができますか？待ち時間が長すぎないのであれば、待つ意思があります。確認後、返信をお願いします。","enabled":true},{"trigger":"@취소요청","text":"ご連絡ありがとうございます。やむを得ない状況のため、双方の合意による「その他の理由」として取り消しのご対応は可能でしょうか。ご検討いただけますと幸いです。","enabled":true},{"trigger":"@취소거절","text":"購入者の都合によるキャンセルではございません（メルカリ即時購入ルールに関連して）\nお世話になっております。弊社はメルカリ公式アカウントとして、本社提供のAPIを通じて韓国のお客様の決済と同時にメルカリでのリアルタイム購入が可能なシステムを運営しております。\n商品説明やプロフィールにてコメントが必要な旨を事前に告知しておりますが、全ての取引を完全にコントロールすることが難しい状況でございます。\n在庫の問題や出品者様のご不便により取引のキャンセルをご希望の場合は、双方の同意による「その他の理由」でキャンセル申請をいただければ、確認次第承認させていただきます。ご検討のほど、よろしくお願い申し上げます。","enabled":true},{"trigger":"@상품아이디","text":"上記番号が商品IDです。弊社の事情によりご迷惑をおかけして申し訳ありません。必須ではありませんので、出品者様のご都合の良い方法で対応ください。ご理解いただき、誠にありがとうございます。","enabled":true},{"trigger":"@평가코멘트","text":"今回のお取引、ありがとうございました。また機会がございましたら、よろしくお願いいたします。","enabled":true},{"trigger":"@거래완료후문의","text":"お世話になっております。取引完了後のお問い合わせとなり、申し訳ございません。ECビジネスの性質上、韓国のお客様からお問い合わせがある場合にはやむを得ずご連絡させていただく点、ご了承くださいますようお願い申し上げます。\n可能でしたら、以下の内容をご確認の上、ご返信いただけますでしょうか。ご検討のほど、よろしくお願いいたします。\n「—」","enabled":true},{"trigger":"@개인정보문의회신","text":"お世話になっております。ご連絡ありがとうございます。個人情報流出についてのご懸念、承知いたしました。弊社では、検品のため商品の開封を行い、海外発送用に再包装させていただいております。また、個人情報が記載された包装材などは、適切に廃棄・処分させていただいております。もしご不安がございましたら、お取引のキャンセルも承りますので、ご検討くださいませ。なお、キャンセルの際は、やむえない事情として双方の同意による「その他の理由」での対応とさせていただけますでしょうか。ご検討のほど、よろしくお願いいたします。","enabled":true},{"trigger":"@발송통지요청","text":"お世話になっております。商品を無事に受け取りました。お手数ですが、受取評価のため発送通知をお願いいたします！","enabled":true},{"trigger":"@코멘트미회신","text":"申し訳ございません。ご返信が難しい状況と判断し、今回の取引を辞退させていただきます。また機会がございましたら、よろしくお願い申し上げます。","enabled":true},{"trigger":"@사무국문의종료","text":"いつもお世話になっております。メルカリ事務局のサポートに日頃より感謝申し上げます。今回も誠にありがとうございました。","enabled":true},{"trigger":"@반품진행문의","text":"商品の返送について相談させていただきたいと思います。\nお手数ですが、ご住所を教えていただけますでしょうか。\n出品者様のミスなどによる返送の場合は、着払いにて返送させていただきます。\n配送会社は佐川急便を利用しております。\n申し訳ございませんが、返送用封筒などをお送りいただく場合を除き、普通郵便や定形外郵便での対応は致しかねますので、ご了承くださいませ。","enabled":true},{"trigger":"@반품접수완료","text":"お待たせいたしまして申し訳ございません。昨日返品受付を完了いたしましたので、ご都合のよろしい時にご確認いただけますと幸いです。","enabled":true},{"trigger":"@추적번호문의","text":"追跡番号を教えていただけますでしょうか？","enabled":true},{"trigger":"@페이지정리요청","text":"お世話になっております。まとめ買いのリクエストをしております。もし個別購入の方が便利であったり、弊社との取引が不都合な場合はご返信いただけますでしょうか？ご検討よろしくお願いいたします。","enabled":true},{"trigger":"@평가연기","text":"お世話になっております。ご返信が遅くなり、大変申し訳ございません。\n弊社では、テナントビルの管理事務所（大阪法人営業支店）に荷物が届き、そこから会社事務所へ配送される仕組みとなっております。\n\n追跡番号により、商品は管理事務所（大阪法人営業支店）に到着していることを確認しております。\nただし、プロフィールに記載させていただいておりますように、営業時間内での対応と商品数の多さから、全商品の確認に時間を要しております。商品確認が完了するまで、今しばらくお待ちいただけますと幸いです。\n1～2営業日以内には受け取り完了となる予定でございます。\nご迷惑をおかけし、誠に申し訳ございません。何卒よろしくお願い申し上げます。","enabled":true},{"trigger":"@오배송문의","text":"お世話になっております。\n注文した商品と異なる商品が届きましたので、ご確認をお願いいたします。届いた商品の写真は上記URLにてご確認いただけますので、ご参照くださいませ。","enabled":true},{"trigger":"@오배송안내","text":"안녕하세요. 고객님.\n상품이 도착했으나 상품정보와 다르게 도착하여 출품자에게 문의 중입니다. 확인 및 처리까지 시간이 소요될 수 있는 점 양해부탁드립니다.\n* 링크에서 사진으로 내용을 확인하실 수 있습니다.","enabled":true},{"trigger":"@코멘트완료","text":"문의 내용을 상품 페이지에 코멘트로 남겼습니다.\n한국에서 접속하실 경우, 원문페이지의 코멘트란이 보이지 않을 수 있습니다.\n답변은 사이트 내 상품 페이지 내 ‘판매자 질문/답변’란에서 확인 부탁드립니다.\n저희 메루카리 계정은 **‘heyco公式アカウント01’**입니다.\n해당 계정으로 남긴 문의에 대해 판매자가 답변한 내용을 확인해주세요.\n또한, 거래 중 오해나 문제를 방지하기 위해, 고객님의 문의 내용을 일부 수정하거나 생략해서 전달하는 경우가 있습니다.\n판매자에 따라 코멘트가 삭제될 수 있으며, 당사 계정이 차단될 경우 추가 문의가 어려울 수 있습니다.\n이 점 미리 양해 부탁드립니다.","enabled":true},{"trigger":"@샵스코멘트완료","text":"샵스는 문의기능이 제한적이며, 회신이 없거나 문의하기 기능을 차단해둘 수 있습니다. 또, 일반메루카리와 달리 가격인하 등이 원활하지 않으므로 이 점 양해부탁드립니다. 감사합니다.","enabled":true},{"trigger":"@방지","text":"お世話になっております。\nまだ商品が到着していないため、やむを得ず自動的な取引完了を防ぐ処理をさせていただきました。\n何卒よろしくお願いいたします。\n\nもし配送に関して何か問題が確認されているようでしたら、ご連絡いただけますようお願いいたします。\nありがとうございます。","enabled":true},{"trigger":"@샵스가격변동","text":"안녕하세요, 고객님.\n해당 상품은 현재 엔화 기준 000엔으로 가격이 변동되었습니다.\n샵스에서는 가격 인하 요청이 불가능하므로, 변동된 가격으로 거래를 진행하실지 여부를 1:1 문의 게시판을 통해 회신 부탁드립니다.\n회신이 없거나 지연될 경우, 주문이 보류될 수 있는 점 양해 부탁드립니다.","enabled":true},{"trigger":"@아이디기재","text":"誤ってハングルが入力されてしまいました。申し訳ございません。\n\n追跡不可の配送方法をご利用の場合は、商品IDをご記載いただけますと大変助かります。\n何卒よろしくお願いいたします。","enabled":true},{"trigger":"@평가누락","text":"お世話になっております。\n通信障害により、受取評価の処理이遅れてしまったようです。\n事務局からのお知らせを確認し、すぐに評価を完了いたしましたので、ご確認いただけますと幸いです。\nご不便をおかけしておりましたら、誠に申し訳ございません。\nこのたびのお取引、誠にありがとうございました。\nまたのご縁がございましたら、どうぞよろしくお願いいたします。","enabled":true},{"trigger":"@샵스문의","text":"메루카리 샵스에 남겨주신 문의는 메루카리 앱의 문의/답변 란에 자동으로 노출되지 않습니다.\n\n따라서 담당자가 직접 샵에 문의하여 답변을 확인한 후, 별도로 문자로 안내해 드리겠습니다.\n\n샵 측의 답변이 늦어지거나 샵 자체정책으로 문의를 받지 않을 수 있습니다.\n\n시간이 다소 소요될 수 있는 점 양해 부탁드립니다.\n\n--\n\n죄송하지만 해당 샵은 문의 기능을 닫아두었거나, 샵 정책상 문의를 받지 않는다고 프로필에 명시되어 있어 문의 진행이 어렵습니다.\n\n이 점 양해 부탁드립니다.\n--\n메루카리의 경우 상품번호 m으로 시작하는 상품은 코멘트 가능합니다\n★메루카리샵★  제품은 코멘트불가능하오니 이용에 참고 부탁드립니다\n감사합니다","enabled":true},{"trigger":"@발송거부취소","text":"お世話になっております。\n\n発送期限を過ぎたためキャンセルを依頼し、かつご返信もいただけなかったことから、お取引の続行を希望いたしません。\n\n独断で商品を発送することはなさいませんようお願いいたします。\n\n万が一ご発送されましても受取拒否（着払い返品）で対応させていただきますので、何卒ご容赦ください。","enabled":true},{"trigger":"@락택","text":"いつもお世話になっております。\n\n商品が無事に到着いたしました。\n\n恐れ入りますが、インボイス（適格請求書）の受領のため、ダウンロードリンクとアクセスに必要なRから始まる注文番号を併せてお送りいただけますでしょうか？\n\n毎度お手数をおかけし、大変申し訳ございません。","enabled":true},{"trigger":"@취소불가","text":"우선 당사 서비스를 이용해 주셔서 감사합니다. 요청하신 주문 취소 건에 대해 안내 말씀을 드립니다.\n\n**메르카리(Mercari)**는 개인 간의 거래가 이루어지는 플랫폼 특성상, 구매/결제 완료 후 구매자의 단순 변심이나 개인 사정으로 인한 취소가 엄격히 금지되어 있습니다.\n\n당사에서는 원활한 거래 진행을 위해 구매 과정에서 다음과 같은 유의사항을 안내해 드리고 있습니다.\n\n1. 실시간 구매 완료 후 취소 불가 안내 (팝업 동의 절차)\n2. 현지 출품자의 발송 여부와 관계없이 결제 후에는 취소 신청이 제한됨\n\n현재 고객님의 주문은 이미 현지 구매가 완료된 상태입니다. 따라서 메르카리 규정에 따라 취소 처리가 불가능한 점 너그러운 양해를 부탁드립니다.\n\n다만, 출품자가 사전에 공지한 발송 기한을 정당한 사유 없이 초과할 경우에는 당사에서 직접 출품자에게 확인 및 취소 문의를 진행하여 고객님의 불편을 최소화할 수 있도록 돕겠습니다.\n\n고객님의 소중한 상품이 안전하게 도착할 수 있도록 최선을 다하겠습니다. 감사합니다.","enabled":true},{"trigger":"@문의재요청","text":"죄송하지만 메루카리 문의 시\n상품사진 혹은 상품명으로 출품페이지를 찾을 수 없습니다.\n\n따라서 상품페이지 주소와 문의내용을 함께 기재하시어 재문의부탁드립니다.","enabled":true},{"trigger":"@코멘트불가","text":"상품이 품절되어 코멘트불가하오니 양해부탁드립니다.","enabled":true},{"trigger":"@인사","text":"この度は、メルカリ公式パートナーとして、商品購入の申し込みをされた海外のお客さまに代わってお手続きさせていただきます「heyco」です。通常の取引と変わらず、出品者様側で特別な対応は一切不要ですので、ご安心ください。お取引終了まで責任をもってご対応させていただきます。また、★梱包の際は商品IDをご明記いただけますと幸いです（商品IDは取引画面でご確認いただけます）。なお、複数商品を購入した場合は、各取引ごとに発送をお願いいたします。また、記載のないおまけ等がございましたら事前にお知らせください。ご不明点やお取引が難しい場合は、お気軽にお知らせくださいませ。（ご返信は不要です。）","enabled":true},{"trigger":"묶음일부품절","text":"안녕하세요, 고객님.\n신청하신 묶음 주문 상품과 관련하여 현지 구매 진행 상황을 안내드립니다.\n1. 안내 내용 메루카리의 특성상 묶음 주문 건이라 하더라도 각 상품에 대해 개별적으로 실시간 구매가 이루어집니다. 이 과정에서 안타깝게도 2번째 상품이 현지 품절되어 구매가 불가능한 상태입니다.\n2. 향후 진행 사항 현재 품절된 상품을 제외하고, 구매가 완료된 1번째 상품만 단독으로 거래 및 배송이 진행될 예정입니다. 모든 상품을 함께 준비해 드리지 못한 점 고객님의 너그러운 양해를 부탁드립니다.\n3. 기타 안내 품절된 상품에 대한 결제 금액은 2차결제 시 반영하여 정산될 예정입니다.\n원활한 배송이 이루어질 수 있도록 최선을 다하겠습니다.\n감사합니다.","enabled":true},{"trigger":"@연휴지연","text":"お忙しい中失礼いたします。\n連休期間中でご多忙のところ恐縮ですが、発送のご予定についてお伺いしたくご連絡いたしました。\n\n当初の発送期限を過ぎておりますので、お手すきの際におおよその発送可能日をご教示いただけますでしょうか。\nもし、連休の影響などで大幅な遅れが生じる場合は、事務局と相談のうえキャンセルも検討させていただく可能性がございます。\n\nお忙しいところ恐縮ですが、ご事情をお聞かせいただけますと幸いです。よろしくお願いいたします。","enabled":true}];
  const CACHE_KEY = 'mercariDashboardSnippetsCache';
  const CUSTOM_SNIPPETS_KEY = 'mercariDashboardSnippetsCustom';
  const CACHE_TIME_KEY = 'mercariDashboardSnippetsCacheTime';
  const REFRESH_MS = 10 * 60 * 1000;
  const INPUT_SCAN_MS = 30000;
  let snippets = [];
  let sortedSnippets = [];
  let lastEditable = null;
  const replacing = new WeakSet();
  const pending = new WeakMap();

  function normalizeRows(rows) {
    return Array.isArray(rows)
      ? rows.filter((row) => row && row.enabled !== false && row.trigger && row.text)
      : [];
  }

  function setSnippets(rows) {
    snippets = normalizeRows(rows);
    if (!snippets.length) snippets = normalizeRows(DEFAULT_SNIPPETS);
    sortedSnippets = snippets.slice().sort((a, b) => String(b.trigger).length - String(a.trigger).length);
  }

  function readStoredSnippets() {
    try {
      if (typeof GM_getValue === 'function') {
        const stored = GM_getValue(CUSTOM_SNIPPETS_KEY, null);
        if (stored) return JSON.parse(stored);
      }
    } catch (_error) {
    }
    try {
      return JSON.parse(localStorage.getItem(CUSTOM_SNIPPETS_KEY) || '[]');
    } catch (_error) {
      return [];
    }
  }

  function writeCache(rows) {
    setSnippets(rows);
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(snippets));
      localStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
    } catch (_error) {
    }
  }

  function persistSnippets(rows) {
    const normalized = normalizeRows(rows);
    try {
      if (typeof GM_setValue === 'function') GM_setValue(CUSTOM_SNIPPETS_KEY, JSON.stringify(normalized));
    } catch (_error) {
    }
    try {
      localStorage.setItem(CUSTOM_SNIPPETS_KEY, JSON.stringify(normalized));
    } catch (_error) {
    }
    writeCache(normalized);
  }

  function resetStoredSnippets() {
    try {
      if (typeof GM_deleteValue === 'function') GM_deleteValue(CUSTOM_SNIPPETS_KEY);
    } catch (_error) {
    }
    try {
      localStorage.removeItem(CUSTOM_SNIPPETS_KEY);
    } catch (_error) {
    }
    writeCache(DEFAULT_SNIPPETS);
  }

  function readCache() {
    const stored = normalizeRows(readStoredSnippets());
    if (stored.length) {
      setSnippets(stored);
      return;
    }
    try {
      setSnippets(JSON.parse(localStorage.getItem(CACHE_KEY) || '[]'));
    } catch (_error) {
      setSnippets(DEFAULT_SNIPPETS);
    }
  }

  function requestText(url) {
    return new Promise((resolve, reject) => {
      if (typeof GM_xmlhttpRequest === 'function') {
        GM_xmlhttpRequest({
          method: 'GET',
          url,
          timeout: 5000,
          onload: (response) => {
            if (response.status >= 200 && response.status < 300) resolve(response.responseText || '[]');
            else reject(new Error(String(response.status)));
          },
          onerror: () => reject(new Error('request failed')),
          ontimeout: () => reject(new Error('request timeout')),
        });
        return;
      }
      fetch(url, { cache: 'no-store' })
        .then((response) => {
          if (!response.ok) throw new Error(String(response.status));
          return response.text();
        })
        .then(resolve)
        .catch(reject);
    });
  }

  async function refreshSnippets(force = false) {
    if (!force && normalizeRows(readStoredSnippets()).length) {
      readCache();
      renderPanel();
      return;
    }
    const cachedAt = Number(localStorage.getItem(CACHE_TIME_KEY) || 0);
    if (!force && snippets.length && Date.now() - cachedAt < REFRESH_MS) return;
    for (const baseUrl of API_URLS) {
      const joiner = baseUrl.includes('?') ? '&' : '?';
      try {
        const text = await requestText(`${baseUrl}${joiner}v=${Date.now()}`);
        const rows = JSON.parse(text || '[]');
        if (normalizeRows(rows).length) {
          writeCache(rows);
          renderPanel();
          return;
        }
      } catch (_error) {
      }
    }
    if (!snippets.length) setSnippets(DEFAULT_SNIPPETS);
    renderPanel();
  }

  function activeSnippets() {
    return sortedSnippets;
  }

  function dashboardBridgeRows() {
    const stored = normalizeRows(readStoredSnippets());
    return stored.length ? stored : normalizeRows(DEFAULT_SNIPPETS);
  }

  function installDashboardLiteBridge() {
    setSnippets(dashboardBridgeRows());
    const sendRows = () => {
      window.postMessage({ source: 'mercari-snippets-bridge', type: 'rows', rows: snippets }, location.origin);
    };
    window.addEventListener('message', (event) => {
      if (event.source !== window || !event.data || event.data.source !== 'mercari-dashboard-lite') return;
      if (event.data.type === 'requestRows') {
        setSnippets(dashboardBridgeRows());
        sendRows();
        return;
      }
      if (event.data.type === 'saveRows') {
        persistSnippets(event.data.rows);
        sendRows();
        return;
      }
      if (event.data.type === 'resetRows') {
        resetStoredSnippets();
        sendRows();
      }
    });
    window.addEventListener('mercari-dashboard-lite-request', sendRows);
    window.setTimeout(sendRows, 0);
  }

  if ((location.hostname === 'engwoo09.github.io' && location.pathname.startsWith('/mercari-work-lite-dashboard/')) || (location.protocol === 'file:' && location.pathname.endsWith('/mercari-dashboard-lite.html'))) {
    installDashboardLiteBridge();
    return;
  }

  function isEditable(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.isContentEditable) return true;
    if (el.tagName === 'TEXTAREA') return true;
    if (el.tagName !== 'INPUT') return false;
    const type = String(el.type || 'text').toLowerCase();
    return !['button', 'checkbox', 'color', 'file', 'hidden', 'image', 'radio', 'range', 'reset', 'submit'].includes(type);
  }

  function editableRoot(el) {
    if (!isEditable(el)) return null;
    if (!el.isContentEditable) return el;
    let root = el;
    while (root.parentElement && root.parentElement.isContentEditable) root = root.parentElement;
    return root;
  }

  function editableFromEvent(event) {
    const path = typeof event.composedPath === 'function' ? event.composedPath() : [event.target];
    for (const node of path) {
      const root = editableRoot(node);
      if (root) return root;
    }
    return editableRoot(event.target);
  }

  function editableFromSelection() {
    const selection = window.getSelection && window.getSelection();
    if (!selection || !selection.anchorNode) return null;
    let node = selection.anchorNode;
    if (node.nodeType !== 1) node = node.parentElement;
    while (node && node !== document.documentElement) {
      const root = editableRoot(node);
      if (root) return root;
      node = node.parentElement;
    }
    return null;
  }

  function deepActiveElement(root = document) {
    let active = root.activeElement;
    while (active && active.shadowRoot && active.shadowRoot.activeElement) {
      active = active.shadowRoot.activeElement;
    }
    return editableRoot(active) || editableFromSelection();
  }

  function dispatchTextEvents(el) {
    try { el.dispatchEvent(new InputEvent('beforeinput', { bubbles: true, composed: true, inputType: 'insertReplacementText', data: '' })); } catch (_error) {}
    try { el.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true, inputType: 'insertReplacementText', data: '' })); } catch (_error) { el.dispatchEvent(new Event('input', { bubbles: true })); }
    el.dispatchEvent(new Event('change', { bubbles: true }));
    try { el.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, composed: true, key: 'Process' })); } catch (_error) {}
  }

  function setNativeValue(el, value) {
    const prototype = el instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : el instanceof HTMLInputElement
        ? HTMLInputElement.prototype
        : Object.getPrototypeOf(el);
    const descriptor = Object.getOwnPropertyDescriptor(prototype, 'value');
    if (descriptor && descriptor.set) descriptor.set.call(el, value);
    else el.value = value;
  }

  function moveContentEditableCaretToEnd(el) {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function replaceInText(value) {
    let next = value;
    let matched = null;
    for (const item of activeSnippets()) {
      if (!next.includes(item.trigger)) continue;
      next = next.split(item.trigger).join(item.text);
      matched = item;
      break;
    }
    return { next, matched };
  }

  function replaceContentEditable(el) {
    const value = el.innerText || el.textContent || '';
    const { next, matched } = replaceInText(value);
    if (!matched || next === value) return false;
    el.focus();
    el.textContent = next;
    moveContentEditableCaretToEnd(el);
    if (el.getAttribute('role') === 'textbox') {
      el.setAttribute('aria-label', el.getAttribute('aria-label') || 'message');
    }
    dispatchTextEvents(el);
    return true;
  }

  function replaceInputValue(el) {
    if (typeof el.value !== 'string') return false;
    const value = el.value;
    const { next, matched } = replaceInText(value);
    if (!matched || next === value) return false;
    const cursor = Number.isFinite(el.selectionStart) ? el.selectionStart : value.length;
    const beforeCursor = value.slice(0, cursor);
    const cursorShift = beforeCursor.includes(matched.trigger) ? matched.text.length - matched.trigger.length : 0;
    setNativeValue(el, next);
    try {
      const pos = Math.max(0, Math.min(next.length, cursor + cursorShift));
      el.selectionStart = el.selectionEnd = pos;
    } catch (_error) {
    }
    dispatchTextEvents(el);
    return true;
  }

  function editableHasTrigger(el) {
    if (!isEditable(el)) return false;
    const value = el.isContentEditable ? (el.innerText || el.textContent || '') : String(el.value || '');
    return activeSnippets().some((item) => value.includes(item.trigger));
  }

  function replaceTrigger(el) {
    if (!isEditable(el) || replacing.has(el)) return false;
    replacing.add(el);
    try {
      return el.isContentEditable ? replaceContentEditable(el) : replaceInputValue(el);
    } finally {
      window.setTimeout(() => replacing.delete(el), 0);
    }
  }

  function queueReplace(el, delay = 0) {
    if (!isEditable(el)) return;
    lastEditable = el;
    const oldTimer = pending.get(el);
    if (oldTimer) window.clearTimeout(oldTimer);
    pending.set(el, window.setTimeout(() => {
      pending.delete(el);
      replaceTrigger(el);
    }, delay));
  }

  function insertIntoEditable(el, text) {
    el.focus();
    if (el.isContentEditable) {
      document.execCommand('insertText', false, text);
      dispatchTextEvents(el);
      return;
    }
    const start = Number.isFinite(el.selectionStart) ? el.selectionStart : el.value.length;
    const end = Number.isFinite(el.selectionEnd) ? el.selectionEnd : start;
    const nextValue = el.value.slice(0, start) + text + el.value.slice(end);
    setNativeValue(el, nextValue);
    try {
      el.selectionStart = el.selectionEnd = start + text.length;
    } catch (_error) {
    }
    dispatchTextEvents(el);
  }

  function rememberEditable(event) {
    const el = editableFromEvent(event);
    if (el) lastEditable = el;
  }

  function insertText(text) {
    const el = editableRoot(lastEditable) || deepActiveElement();
    if (!isEditable(el)) {
      navigator.clipboard?.writeText(text);
      window.alert('입력창을 먼저 클릭하면 바로 넣을 수 있습니다. 지금은 문구를 복사했습니다.');
      return;
    }
    lastEditable = el;
    insertIntoEditable(el, text);
  }

  function convertCurrentInput() {
    const el = editableRoot(lastEditable) || deepActiveElement();
    if (!isEditable(el)) {
      window.alert('먼저 메루카리 메시지 입력칸을 클릭한 뒤 다시 누르세요.');
      return;
    }
    lastEditable = el;
    const changed = replaceTrigger(el);
    if (!changed) {
      window.alert('현재 입력칸에 등록된 단축어가 없습니다. 예: @인사');
    }
  }

  function ensurePanel() {
    if (!document.body || document.getElementById('mercariSnippetPanel')) return;
    const panel = document.createElement('div');
    panel.id = 'mercariSnippetPanel';
    panel.innerHTML = `
      <button type="button" id="mercariSnippetToggle" title="자동완성 문구 열기">문구 ON</button>
      <div id="mercariSnippetBody">
        <div id="mercariSnippetStatus">자동완성 실행 중 · 입력칸에 @인사 입력</div>
        <div class="mercariSnippetTopActions"><button type="button" id="mercariSnippetConvert">현재 입력칸 변환</button><button type="button" id="mercariSnippetReload">문구 새로고침</button><button type="button" id="mercariSnippetReset">기본값</button></div>
        <input id="mercariSnippetSearch" placeholder="단축어/문구 검색">
        <div id="mercariSnippetList"></div>
      </div>`;
    const style = document.createElement('style');
    style.textContent = `
      #mercariSnippetPanel{position:fixed;right:16px;top:42vh;transform:translateY(-50%);z-index:2147483647;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#202124}
      #mercariSnippetToggle{border:0;background:#1a73e8;color:#fff;border-radius:999px;padding:10px 13px;font-weight:700;box-shadow:0 8px 20px rgba(0,0,0,.18);cursor:pointer}
      #mercariSnippetBody{display:none;width:320px;max-height:70vh;margin-top:8px;background:#fff;border:1px solid #e3e6ea;border-top:4px solid #1a73e8;border-radius:8px;box-shadow:0 16px 40px rgba(0,0,0,.18);padding:12px;overflow:hidden}
      #mercariSnippetPanel.open #mercariSnippetBody{display:block}
      #mercariSnippetStatus{font-size:12px;color:#1f5132;background:#e6f4ea;border:1px solid #ceead6;border-radius:6px;padding:7px 8px;margin-bottom:8px}
      .mercariSnippetTopActions{display:flex;gap:6px;margin-bottom:10px}
      .mercariSnippetTopActions button{border:1px solid #d2e3fc;background:#fff;border-radius:6px;padding:7px 8px;cursor:pointer;font-size:12px}
      .mercariSnippetTopActions button:first-child{background:#1a73e8;border-color:#1a73e8;color:#fff;font-weight:700}
      #mercariSnippetSearch{width:100%;box-sizing:border-box;border:1px solid #e3e6ea;border-radius:6px;padding:9px;margin-bottom:10px}
      #mercariSnippetList{display:grid;gap:8px;max-height:52vh;overflow:auto}
      .mercariSnippetItem{border:1px solid #e3e6ea;border-radius:8px;padding:8px;background:#fff}
      .mercariSnippetKey{font-weight:800;color:#1a73e8;margin-bottom:4px;word-break:break-all}
      .mercariSnippetText{font-size:12px;line-height:1.45;white-space:pre-wrap;max-height:76px;overflow:auto;color:#3c4043}
      .mercariSnippetEdit{display:none;width:100%;box-sizing:border-box;min-height:120px;margin-top:8px;border:1px solid #d2e3fc;border-radius:6px;padding:8px;font:12px/1.45 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;white-space:pre-wrap}
      .mercariSnippetItem.editing .mercariSnippetEdit{display:block}
      .mercariSnippetActions{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap}
      .mercariSnippetActions button{border:1px solid #e3e6ea;background:#fff;border-radius:6px;padding:6px 8px;cursor:pointer}
      .mercariSnippetActions button:first-child{background:#1a73e8;border-color:#1a73e8;color:#fff;font-weight:700}
    `;
    document.documentElement.appendChild(style);
    document.body.appendChild(panel);
    panel.querySelector('#mercariSnippetToggle').addEventListener('click', () => {
      panel.classList.toggle('open');
      if (panel.classList.contains('open')) refreshSnippets();
      renderPanel();
    });
    panel.querySelector('#mercariSnippetSearch').addEventListener('input', renderPanel);
    panel.querySelector('#mercariSnippetConvert').addEventListener('click', convertCurrentInput);
    panel.querySelector('#mercariSnippetReload').addEventListener('click', () => refreshSnippets(true));
    panel.querySelector('#mercariSnippetReset').addEventListener('click', () => {
      if (!window.confirm('저장한 수정 문구를 지우고 기본 문구로 되돌릴까요?')) return;
      resetStoredSnippets();
      renderPanel();
    });
  }

  function renderPanel() {
    const list = document.getElementById('mercariSnippetList');
    if (!list) return;
    const q = (document.getElementById('mercariSnippetSearch')?.value || '').toLowerCase();
    const rows = activeSnippets().filter((row) => !q || `${row.trigger} ${row.text}`.toLowerCase().includes(q)).slice(0, 80);
    list.innerHTML = rows.map(() => `
      <div class="mercariSnippetItem">
        <div class="mercariSnippetKey"></div>
        <div class="mercariSnippetText"></div>
        <textarea class="mercariSnippetEdit"></textarea>
        <div class="mercariSnippetActions"><button type="button" data-action="insert">입력</button><button type="button" data-action="copy">복사</button><button type="button" data-action="edit">수정</button><button type="button" data-action="save">저장</button></div>
      </div>`).join('') || '<div class="mercariSnippetText">표시할 문구가 없습니다.</div>';
    Array.from(list.querySelectorAll('.mercariSnippetItem')).forEach((node, index) => {
      const item = rows[index];
      node.querySelector('.mercariSnippetKey').textContent = item.trigger;
      node.querySelector('.mercariSnippetText').textContent = item.text;
      const editBox = node.querySelector('.mercariSnippetEdit');
      editBox.value = item.text;
      node.querySelector('[data-action="insert"]').addEventListener('click', () => insertText(item.text));
      node.querySelector('[data-action="copy"]').addEventListener('click', () => navigator.clipboard?.writeText(item.text));
      node.querySelector('[data-action="edit"]').addEventListener('click', () => {
        node.classList.toggle('editing');
        editBox.value = item.text;
        if (node.classList.contains('editing')) editBox.focus();
      });
      node.querySelector('[data-action="save"]').addEventListener('click', () => {
        const saved = snippets.slice();
        const targetIndex = saved.findIndex((row) => row.trigger === item.trigger);
        if (targetIndex < 0) return;
        saved[targetIndex] = { ...saved[targetIndex], text: editBox.value, enabled: true };
        persistSnippets(saved);
        const status = document.getElementById('mercariSnippetStatus');
        if (status) status.textContent = item.trigger + ' 저장 완료 · 이후 자동변환에 반영됩니다';
        renderPanel();
      });
    });
  }

  function bindEvents(root) {
    if (!root || root.__mercariSnippetBound) return;
    try { Object.defineProperty(root, '__mercariSnippetBound', { value: true, configurable: false }); } catch (_error) { root.__mercariSnippetBound = true; }
    root.addEventListener('input', (event) => {
      const el = editableFromEvent(event);
      if (!el || event.isComposing) return;
      queueReplace(el, 0);
      queueReplace(el, 80);
    }, true);
    root.addEventListener('keyup', (event) => queueReplace(editableFromEvent(event), 0), true);
    root.addEventListener('compositionend', (event) => queueReplace(editableFromEvent(event), 0), true);
    root.addEventListener('paste', (event) => queueReplace(editableFromEvent(event), 30), true);
    root.addEventListener('change', (event) => queueReplace(editableFromEvent(event), 0), true);
    root.addEventListener('focusin', rememberEditable, true);
    root.addEventListener('click', rememberEditable, true);
  }

  function scanEditableRoots(root) {
    if (!root || !root.querySelectorAll) return;
    const nodes = root.querySelectorAll('textarea, input, [contenteditable="true"], [contenteditable=""], [role="textbox"]');
    nodes.forEach((node) => {
      const el = editableRoot(node);
      if (el && editableHasTrigger(el)) queueReplace(el, 0);
    });
  }

  function bindSameOriginFrames() {
    document.querySelectorAll('iframe, frame').forEach((frame) => {
      try {
        const doc = frame.contentDocument || frame.contentWindow?.document;
        if (!doc || !doc.documentElement) return;
        bindEvents(doc);
        scanEditableRoots(doc);
      } catch (_error) {
      }
    });
  }

  function watchShadowRoots() {
    const seen = new WeakSet();
    function registerShadowRoot(root) {
      if (!root || seen.has(root)) return;
      seen.add(root);
      bindEvents(root);
      scanNode(root);
    }
    function scanNode(node) {
      if (!node || ![1, 9, 11].includes(node.nodeType)) return;
      if (node.shadowRoot) registerShadowRoot(node.shadowRoot);
      if (!node.querySelectorAll) return;
      node.querySelectorAll('*').forEach((child) => {
        if (child.shadowRoot) registerShadowRoot(child.shadowRoot);
      });
    }
    scanNode(document.documentElement);
    const observer = new MutationObserver((mutations) => {
      if (document.hidden) return;
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(scanNode);
      });
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  readCache();
  bindEvents(document);
  watchShadowRoots();
  ensurePanel();
  renderPanel();
  refreshSnippets();
  window.setInterval(() => {
    if (document.hidden) return;
    ensurePanel();
    const active = deepActiveElement();
    if (isEditable(active)) queueReplace(active, 0);
  }, INPUT_SCAN_MS);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) refreshSnippets();
  });
})();

