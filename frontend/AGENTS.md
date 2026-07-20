# AGENTS.md

AI 도구는 반드시 `frontend/`를 현재 작업 디렉터리로 하여 시작합니다. 저장소 루트의 Express 정적 서버와 그 밖의 루트 파일은 이 지침의 범위 밖입니다.

## 프로젝트 구조

- React 18, Vite, TypeScript, Tailwind CSS로 구성된 클라이언트 애플리케이션입니다.
- `src/pages`: 페이지 단위 UI를 둡니다.
- `src/components`: 재사용 UI를 두며, `common`은 범용 UI, `feature`는 도메인 UI입니다.
- `src/routes`: 라우팅과 접근 제어를 관리합니다.
- `src/service`: API 호출, HTTP 설정, Zod 스키마, 서버 모델을 관리합니다.
- `src/store`: Zustand 기반 클라이언트 상태를 관리합니다.
- `@/` 별칭을 사용해 `src/` 아래 모듈을 가져옵니다.

기존 책임 분리를 유지하고, 관련 없는 파일을 함께 정리하거나 구조를 넓게 변경하지 않습니다. 새 코드는 기존 파일의 표현 방식과 디렉터리 규칙을 따릅니다.

## 환경과 작업 명령

PR CI는 Node.js 20과 pnpm 10을 사용합니다. 로컬에서도 이 버전을 기준으로 작업하며, 모든 명령은 `frontend/`에서 실행합니다.

처음 프로젝트를 설정하거나 `pnpm-lock.yaml`이 변경된 뒤에만 의존성을 설치합니다.

```bash
pnpm install --frozen-lockfile
```

커밋 전에는 CI와 같은 검증을 실행합니다.

```bash
pnpm lint
pnpm build
```

## 협업과 Git 흐름

기능 작업은 GitHub 이슈에 목적과 TODO를 작성한 뒤 시작합니다.
새 브랜치가 필요할 때는 작업 트리가 깨끗하고 사용자가 브랜치 작업을 요청한 경우에만 `main`을 upstream의 최신 상태로 동기화한 뒤 아래 형식으로 만듭니다.

```bash
git switch main
git pull upstream main
git switch -c feature/<이슈번호>-<키워드>
```

- `main`에는 직접 커밋하거나 push하지 않습니다. 작업 커밋과 push는 feature 브랜치에서만 수행합니다.
- 커밋 메시지는 `type: 한국어 설명` 형식으로 작성하고, 설명에는 변경 내용의 목적과 의도를 간결하게 담습니다. Husky의 `commit-msg` 훅은 `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert` type과 한글 설명을 자동으로 검증합니다.
- Husky의 `pre-commit` 훅은 lint-staged를 실행해 스테이징된 JavaScript·TypeScript 파일을 포맷, 린트, 타입 검사합니다.
- 커밋은 이슈의 TODO와 대응하게 만들고, 모든 TODO를 완료한 뒤 PR을 엽니다.
- PR은 origin의 feature 브랜치에서 upstream의 `main`을 대상으로 만듭니다. 제목은 `<type>: <설명>` 형식이며, `type`은 `feature`, `fix`, `chore` 중 하나를 사용합니다.
- PR 본문에는 상세 내용과 이슈 번호를 작성하고, 본인을 assignee로 지정하며 프로젝트 관리자를 reviewer로 지정합니다.
- 병합 후에는 `main`에서 `git pull upstream main`으로 최신 상태를 반영합니다.

AI는 이 흐름에 맞춰 이슈·브랜치·커밋·PR 내용을 준비할 수 있지만, commit, push, PR 생성처럼 외부 상태를 바꾸는 작업은 사용자의 명시적인 요청 없이는 수행하지 않습니다. 현재 브랜치나 기존 변경 사항이 위 흐름과 다르면 임의로 checkout, pull, rebase, reset하지 않고 상태와 필요한 명령만 보고합니다.

## 구현 규칙

- TypeScript의 엄격한 타입 검사를 우회하지 않습니다. `any`, 타입 단언, ESLint 비활성화는 필요한 근거가 있을 때만 최소 범위로 사용합니다.
- API 데이터 조회와 캐시는 기존 React Query 계층을 따르고, 입력 검증은 기존 Zod 스키마 패턴을 따릅니다.
- 포맷과 import 정렬은 프로젝트 Prettier 설정을 따릅니다. 자동 수정 명령은 요청된 변경 범위에만 적용합니다.
- 사용자에게 보이는 문구와 오류 메시지는 기존 한국어 UI 표현을 우선합니다.
- 요청과 무관한 리팩터링, 의존성 대규모 변경, 잠금 파일 재생성은 하지 않습니다.

## API 계약과 생성 파일

앱이 사용하는 `src/service/model/` 및 `src/lib/http-client.ts`에는 Swagger TypeScript API로 생성된 파일이 있습니다. 이 파일을 직접 수정하지 않습니다. API 계약 변경이 필요하면 백엔드 OpenAPI 문서와 생성 절차를 먼저 확인하고, 생성 결과와 호출부 변경 범위를 함께 검토합니다.

현재 `swagger-typescript-api` 스크립트는 Git에서 무시되는 `src/models/`에 출력하지만, 앱 import는 `src/service/model/`을 사용합니다. 이 불일치 때문에 생성 명령 실행, 생성 경로 변경, 생성 결과 반영은 명시적인 승인과 결과 검토 없이는 수행하지 않습니다. `src/models/`도 생성 파일로 취급해 직접 수정하지 않습니다. 생성 코드 경로를 통일하는 작업은 별도 작업으로 분리합니다.

`src/service/config/`의 API 기본 URL, 인증 인터셉터, 쿠키·토큰 처리도 서비스 계약과 보안에 영향을 줍니다. 변경 전에는 명시적인 사람의 승인을 받습니다.

## 안전한 작업 방식

- 기존의 사용자 변경 사항을 덮어쓰거나 되돌리지 않습니다.
- `.env` 파일, 토큰, 쿠키, 개인 정보, 자격 증명을 커밋하거나 출력하지 않습니다.
- 배포 설정, 인증 흐름, API 기본 URL, API 계약, 대규모 의존성 변경은 명시적 승인없이는 변경하지 않습니다.
- 명확한 요청 범위에서는 코드와 문서를 직접 수정할 수 있습니다. 작업을 마칠 때는 변경 내용, 실행한 검증, 남은 위험 또는 미실행 검증을 간단히 보고합니다.
- 버그를 보고하거나 수정 제안을 정리할 때는 재현 배경(Given), 수행 동작(When), 실제 결과(Then), 기대 결과를 함께 명시합니다.
