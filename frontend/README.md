# 개발 가이드

## Claude Code, Codex 사용 시 참고

Codex와 Claude Code는 반드시 `frontend/`에서 시작해 프론트엔드 전용 지침을 읽습니다. 공통 작업 규칙은 [AGENTS.md](./AGENTS.md)를 참고하세요.

개인별 Claude Code 규칙이 필요하면 `frontend/CLAUDE.local.md`를 만들어 사용할 수 있습니다. 이 파일은 Git에서 제외되므로 개인 지침을 커밋하지 않습니다.

## 아키텍처 문서

프로젝트의 계층 구조, 라우팅·권한, 데이터·상태 흐름은 [아키텍처 가이드](./docs/architecture/index.html)에서 확인합니다. 해당 HTML 파일은 브라우저로 열어 확인할 수 있습니다. 프로젝트의 구조가 바뀌면 Codex에서는 `$architecture-diagram`, Claude Code에서는 `/architecture-diagram`으로 문서를 코드 기준으로 갱신합니다.
