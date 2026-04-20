# Blueworks 배포 가이드

이 문서는 Blueworks를 실제 서비스형 구조로 정리할 때의 순서를 대표님 기준으로 설명합니다.

## 목표 구조

- 코드 저장: GitHub
- 프론트엔드 배포: Vercel
- 백엔드: Supabase
  - Database
  - Auth
  - Storage

## 지금까지 완료된 것

- GitHub 레포 생성 완료
- 코드 업로드 완료
- Vercel 프론트 배포 완료
- Supabase 프로젝트 생성 완료

## 지금 중요한 포인트

현재 프론트 화면은 배포되어 있지만, 실제 데이터는 아직 브라우저 `localStorage`에 저장됩니다.

즉, 지금 상태는:

- 화면 배포는 가능
- 실제 서비스 데이터 저장 구조는 아직 아님

다음 단계에서 이 부분을 Supabase로 옮겨야 합니다.

---

## 역할 분담

## 대표님이 할 일

1. Supabase 대시보드에서 SQL Editor 열기
2. [supabase/001_initial_schema.sql](../supabase/001_initial_schema.sql) 내용 실행
3. Supabase Authentication 설정 화면 확인
4. 이후 Vercel / GitHub / Supabase 연결 상태를 같이 검수

## 제가 할 일

1. 현재 `localStorage` 기반 저장 구조 분석
2. 어떤 화면부터 Supabase로 옮길지 순서 정리
3. DB 테이블에 맞춰 프론트 코드 리팩터링
4. 로그인/Auth 흐름과 멤버 승인 구조 정리
5. 문서/이미지 업로드를 Storage로 옮길 수 있게 준비

---

## 추천 전환 순서

한 번에 전부 바꾸기보다 아래 순서가 안전합니다.

### 1단계: 인증(Auth) 뼈대

- Supabase Auth 사용
- 이메일/비밀번호 로그인 구조로 변경
- `profiles` 테이블과 연결

### 2단계: 핵심 데이터

먼저 가장 중요한 데이터부터 옮깁니다.

- 멤버
- 프로젝트
- 일정
- 연간 목표

### 3단계: 보조 데이터

- 아카이브 메모
- 아카이브 코드
- 카테고리
- 사이트 설정

### 4단계: 파일 저장

- 계약서/첨부문서
- 썸네일/파비콘

---

## Supabase에서 대표님이 다음으로 할 일

### 1. SQL Editor 열기

Supabase 프로젝트 안에서:

- `SQL Editor`
- `New query`

### 2. 초기 스키마 실행

[supabase/001_initial_schema.sql](../supabase/001_initial_schema.sql) 파일 내용을 복사해서 실행

이 스키마는 Blueworks 데이터를 담기 위한 기본 테이블 초안입니다.

### 3. 프로젝트 동기화용 컬럼 추가

[supabase/002_project_sync_columns.sql](../supabase/002_project_sync_columns.sql) 파일도 이어서 실행해주세요.

이 쿼리는 현재 프로젝트 상세 화면에서 실제로 쓰는 필드 중,

- 작업 유형
- 홈페이지 주소
- 다국어 목록
- 계약 문서 메타데이터

를 DB 컬럼으로 보강하는 단계입니다.

### 4. Auth / profiles 자동 생성 준비

[supabase/003_auth_profiles_bootstrap.sql](../supabase/003_auth_profiles_bootstrap.sql) 파일도 이어서 실행해주세요.

이 쿼리는 다음 역할을 합니다.

- Supabase Auth 회원가입 시 `profiles` 테이블 자동 생성
- 첫 번째 가입자를 자동 owner / 승인 완료 상태로 생성
- 이후 가입자는 기본적으로 승인 대기 상태로 생성
- owner가 멤버 정보를 관리할 수 있도록 `profiles` 정책 보강

### 5. profiles 상태 컬럼 추가

[supabase/004_profile_status_column.sql](../supabase/004_profile_status_column.sql) 도 실행해주세요.

이 컬럼은 가입 거절된 멤버를 pending 목록에서 분리하고,
로그인 차단 상태를 더 명확하게 관리하기 위해 사용합니다.

---

## Vercel 관련 메모

지금 프론트는 이미 Vercel에 올라갔습니다.

다만 현재 프로젝트는 정적 HTML/CSS/JS 기반이라, 일반적인 React/Vite 프로젝트처럼 Vercel 환경변수를 바로 앱 코드에 주입하는 방식은 아닙니다.

따라서 Supabase 연결 단계에서는:

- 직접 클라이언트 초기화 코드 추가
- 또는 이후 Vite/Next 구조로 리팩터링

중 하나를 선택해야 합니다.

초보자 기준으로는 **먼저 현재 구조를 유지한 채 연결**하고, 나중에 필요하면 프레임워크 구조로 옮기는 것이 더 쉬운 편입니다.

---

## 대표님이 다음 턴에 저한테 보내주시면 좋은 것

대표님이 SQL 실행까지 마치신 뒤 아래처럼만 알려주세요.

`Supabase 스키마 실행했어. 다음 단계 진행해줘.`

그러면 제가 다음 단계로:

1. 어떤 테이블부터 실제 앱에 연결할지
2. 어떤 함수부터 `localStorage` 대신 Supabase를 쓰게 바꿀지
3. 로그인 구조를 어떻게 옮길지

이 순서로 바로 이어가겠습니다.
