# Mercari Snippets 복구 안내

## 결론

- 유지: `Mercari Dashboard Snippets Local Restore`
- 비활성화/삭제 권장: `자동 변환 스크립트(메루카리) - 리터럴 적용`

## 이유

첫 번째 스크립트는 최신 통합형입니다. Mercari, Mercari Shops, Interplanet 입력창을 제한적으로 대상으로 삼고, textarea/input뿐 아니라 contenteditable 입력창도 처리합니다. 오른쪽의 `문구 ON` 패널에서 문구 검색, 입력, 복사, 수정 저장이 가능합니다.

두 번째 스크립트는 구형 단순형입니다. `*://*/*` 전체 사이트에서 동작하고 input/textarea만 처리합니다. 첫 번째 스크립트와 같이 켜면 같은 단축어가 중복 처리되거나, 업무 외 사이트 입력창에서도 문구가 치환될 수 있습니다.

## 설치 순서

1. Tampermonkey에서 기존 `Mercari Dashboard Snippets`를 끄거나 삭제합니다.
2. Tampermonkey에서 `자동 변환 스크립트(메루카리) - 리터럴 적용`을 끄거나 삭제합니다.
3. `mercari-dashboard-snippets-local.user.js`를 새 스크립트로 등록합니다.
4. Mercari 또는 Interplanet 입력창에서 `@인사`, `@배송문의` 같은 단축어를 입력해 자동 변환을 확인합니다.
5. 오른쪽 `문구 ON` 버튼을 열어 문구 검색, 입력, 복사, 수정을 확인합니다.

## 문구 수정 방법

방법 A: `dashboard lite`에서 수정

1. Chrome 확장 프로그램 설정에서 Tampermonkey의 `파일 URL에 대한 액세스 허용`을 켭니다.
2. `mercari-dashboard-lite.html`을 엽니다.
3. 검색창에서 수정할 단축어를 찾습니다.
4. 오른쪽 큰 입력칸에서 내용을 수정합니다.
5. `이 브라우저에 수정 저장`을 누릅니다.

화면 하단 상태에 `Tampermonkey 자동변환 문구와 연결되었습니다.`가 보이면 자동변환에도 반영됩니다.

방법 B: 업무 페이지의 `문구 ON`에서 수정

1. Mercari 또는 Interplanet 페이지에서 오른쪽 `문구 ON` 버튼을 엽니다.
2. 검색창에서 수정할 단축어를 찾습니다.
3. 해당 문구의 `수정` 버튼을 누릅니다.
4. 열린 입력칸에서 내용을 수정합니다.
5. `저장`을 누릅니다.

저장한 문구는 `Mercari Dashboard Snippets Local Restore`의 Tampermonkey 저장소에 보관됩니다. 이후 이 스크립트가 켜진 Mercari, Mercari Shops, Interplanet 페이지에서 자동변환에 우선 반영됩니다.

## 같이 쓰는 파일

- `mercari-dashboard-opener-lite.user.js`: 주문목록에서 상품/거래 탭과 라이트 대시보드를 여는 스크립트
- `mercari-dashboard-lite.html`: 스니펫 검색, 수정, 복사용 단독 화면
- `mercari-dashboard-snippets-local.user.js`: 입력창 자동치환과 문구 패널용 스크립트

## 주의

`dashboard lite`가 `대시보드 단독 저장 모드입니다`라고 표시하면 Tampermonkey가 파일 페이지에서 실행되지 않은 상태입니다. 이 경우 Chrome 확장 프로그램 설정에서 Tampermonkey의 파일 URL 접근을 허용한 뒤 `mercari-dashboard-lite.html`을 새로고침해야 자동변환 저장소와 연결됩니다.
