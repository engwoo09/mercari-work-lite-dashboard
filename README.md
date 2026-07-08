# Mercari Work Lite Dashboard

팀 배포용 최소 복구판입니다. 전체 Mercari dashboard가 아니라 현재 업무에 필요한 기능만 포함합니다.

## 포함 기능

- Interplanet 주문목록에서 체크한 Mercari 상품/거래 탭 열기
- URL 파라미터 기반 ID 확인 및 탭 열기
- 자동메시지 검색, 확인, 수정, 복사
- Tampermonkey 자동변환 스크립트
- 공용 문구 파일 `data/snippets.json`

## 팀원 설치 링크

GitHub Pages가 활성화된 뒤 아래 링크로 설치합니다.

- Dashboard: https://engwoo09.github.io/mercari-work-lite-dashboard/
- Opener userscript: https://engwoo09.github.io/mercari-work-lite-dashboard/interplanet-dashboard.user.js
- Snippets userscript: https://engwoo09.github.io/mercari-work-lite-dashboard/snippets.user.js
- Bookmarklet installer: https://engwoo09.github.io/mercari-work-lite-dashboard/bookmarklet.html

## 운영 메모

- `interplanet-dashboard.user.js`는 Interplanet 주문목록에 `거래` / `상품` 버튼을 띄웁니다.
- `snippets.user.js`는 Mercari, Mercari Shops, Interplanet 입력창에서 `@인사` 같은 단축어를 자동변환합니다.
- 공용 기본 문구는 `data/snippets.json`에서 관리합니다.
- 각 사용자가 대시보드에서 수정 저장한 문구는 해당 브라우저/Tampermonkey 저장소에 우선 저장됩니다.

## 제외한 것

- 미입고 관리 자동화
- Slack 알림이 설정
- Windows 로컬 대시보드 API
- 예약 실행/스케줄러
