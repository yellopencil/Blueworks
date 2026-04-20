# Blueworks

Blueworks는 프로젝트, 일정, 멤버, 매출, 견적/계약서, 아카이브를 한 번에 관리하는 업무용 웹앱입니다.

현재 저장소의 프론트엔드는 정적 HTML/CSS/JS 기반이며, GitHub와 Vercel에 올리기 좋은 상태로 정리되어 있습니다.

## 현재 상태

- 코드 저장: GitHub
- 프론트엔드 배포: Vercel
- 백엔드: Supabase 연결 준비 단계
- 현재 앱 데이터 저장: 브라우저 `localStorage`

즉, 화면은 이미 배포할 수 있지만, 실제 서비스처럼 쓰려면 로그인/DB/파일 저장을 Supabase로 옮겨야 합니다.

## 다음 단계

1. Supabase 테이블 생성
2. 인증(Auth) 구조 정리
3. 기존 `localStorage` 저장 로직을 Supabase CRUD로 전환
4. Vercel 배포본과 Supabase 연결
5. 관리자 권한 및 멤버 승인 흐름 정리

## 폴더 안내

- [index.html](./index.html): 메인 앱 진입점
- [app.js](./app.js): 메인 앱 로직
- [styles.css](./styles.css): 메인 스타일
- [quote-generator.html](./quote-generator.html): 견적/계약서 관련 화면
- [quote-generator.js](./quote-generator.js): 견적/계약서 로직
- [quote-generator.css](./quote-generator.css): 견적/계약서 스타일
- [docs/deployment-guide.md](./docs/deployment-guide.md): GitHub / Vercel / Supabase 순서 가이드
- [supabase/001_initial_schema.sql](./supabase/001_initial_schema.sql): 초기 DB 스키마 초안

## 대표님이 보시면 좋은 파일

- 배포 순서 안내: [docs/deployment-guide.md](./docs/deployment-guide.md)
- Supabase 테이블 초안: [supabase/001_initial_schema.sql](./supabase/001_initial_schema.sql)

## 참고

- `publishable key`는 프론트엔드에서 사용 가능한 키입니다.
- `service_role key`는 절대 프론트엔드에 넣으면 안 됩니다.
- 현재 저장소에는 Supabase 민감키를 커밋하지 않았습니다.
