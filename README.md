# UI System Monorepo

디자인 토큰 기반의 공유 UI 시스템을 제공하는 모노레포입니다.  
여러 프로젝트에서 **일관된 테마·컴포넌트**를 사용할 수 있도록 토큰 생성, 컴포넌트 라이브러리, 앱 프로젝트를 하나의 워크스페이스에서 관리합니다.

---

## 📋 프로젝트 개요

| 목표          | 설명                                                                                                |
| ------------- | --------------------------------------------------------------------------------------------------- |
| **단일 소스** | 디자인 토큰(색상, 간격, 타이포 등)을 JSON으로 정의하고, CSS 변수로 변환해 앱·스토리북에서 공통 사용 |
| **멀티 테마** | 시스템별(basic, custom) × 모드별(light/dark) 조합으로 테마 전환 지원                                |
| **재사용**    | `@ui-system/core` 패키지를 프로젝트(project-a, project-b 등)에서 의존성으로 사용                    |
| **공통 규칙** | ESLint·Prettier 설정을 `@ui-system/eslint-config`로 공유해 코드 스타일 통일                         |

---

## 📦 패키지 역할

| 패키지                       | 역할                                                                    |
| ---------------------------- | ----------------------------------------------------------------------- |
| **@ui-system/core**          | 토큰 JSON, 생성된 CSS, ThemeProvider·Button 등 공유 컴포넌트, Storybook |
| **@ui-system/eslint-config** | ESLint + Prettier 공통 설정 (모든 패키지 참조)                          |

---

## 🚀 빠른 시작

```bash
# 의존성 설치
npm install

# 토큰 → CSS 생성 (basic)
npm run build:token:basic

# core 빌드
npm run build:core

# 스토리북 (컴포넌트 개발/확인)
npm run storybook

# 앱 실행
npm run dev:a    # project-a
npm run dev:b    # project-b
```

앱에서 테마 사용 예:

```tsx
import { ThemeProvider, Button } from '@ui-system/core';
import '@ui-system/core/styles/basic.css'; // 또는 custom.css

function App() {
  return (
    <ThemeProvider theme="basic-light">
      <Button>Click me</Button>
    </ThemeProvider>
  );
}
```

---

## 📝 커밋

Conventional Commits 형식으로 메시지를 작성하려면 다음을 사용하세요.

```bash
npm run commit
```

대화형(Commitizen)으로 타입·scope·설명을 고르면 됩니다.  
커밋 시 **Husky**가 자동으로 lint를 돌리고, 메시지 형식은 **commitlint**로 검증합니다.

---

## 스크립트 요약

| 스크립트                    | 설명                                                     |
| --------------------------- | -------------------------------------------------------- |
| `npm run commit`            | Conventional Commits 대화형 커밋 (lint·메시지 검증 포함) |
| `npm run storybook`         | @ui-system/core Storybook 실행 (포트 6009)               |
| `npm run build:core`        | @ui-system/core 빌드                                     |
| `npm run build:token:basic` | basic 토큰 → CSS 생성                                    |
| `npm run dev:a` / `dev:b`   | project-a / project-b 개발 서버                          |
