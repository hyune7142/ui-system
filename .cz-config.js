/**
 * Conventional Commits 스펙 기반 설정
 * @see https://www.conventionalcommits.org/ko/v1.0.0/
 *
 * 구조: <타입>[적용 범위(선택)]: <설명>
 *       [본문(선택)]
 *       [꼬리말(선택)]
 *
 * 적용 범위(scope) = 변경이 일어난 패키지/영역
 */
module.exports = {
  types: [
    { value: '🎉 init', name: '🎉 init:     프로젝트/기능 초기 설정' },
    { value: '✨ feat', name: '✨ feat:     새로운 기능 (MINOR)' },
    { value: '🚑️ fix', name: '🚑️ fix:      버그 수정 (PATCH)' },
    { value: '📚 docs', name: '📚 docs:     문서 수정' },
    { value: '💄 design', name: '💄 design:   UI/스타일 변경' },
    { value: '🔨 refactor', name: '🔨 refactor: 리팩터링' },
    { value: '✅ test', name: '✅ test:     테스트 추가/수정' },
    { value: '📦️ chore', name: '📦️ chore:    빌드/설정/기타' },
    { value: '🚀 deploy', name: '🚀 deploy:   배포 관련' },
    { value: '🚚 rename', name: '🚚 rename:   이름/경로 변경' },
    { value: '🔥 remove', name: '🔥 remove:   코드/파일 제거' },
  ],
  scopes: [
    { name: 'root', description: '루트 설정 (package.json, husky 등)' },
    { name: 'eslint-config', description: '@ui-system/eslint-config' },
    { name: 'core', description: '@ui-system/core' },
    { name: 'project-a', description: 'project-a 앱' },
    { name: 'project-b', description: 'project-b 앱' },
  ],
  scopeOverrides: {
    '📦️ chore': [
      { name: 'deps', description: '의존성 추가/변경' },
      { name: 'config', description: '설정 변경' },
      { name: 'other', description: '기타' },
      { name: 'core', description: '@ui-system/core' },
      { name: 'project-a', description: 'project-a 앱' },
      { name: 'project-b', description: 'project-b 앱' },
    ],
  },
  allowCustomScopes: false,
  allowEmptyScopes: true,
  allowBreakingChanges: ['✨ feat', '🚑️ fix'],
  subjectSeparator: ': ',
  subjectLimit: 72,
  breaklineChar: '|',
  messages: {
    type: '타입을 선택하세요:',
    scope: '적용 범위(패키지/영역)를 선택하세요 (엔터 시 생략 → 전체/공통):',
    subject: '설명을 입력하세요 (필수, 72자 이내, 마침표 사용하지 않음):\n',
    body: '본문을 입력하세요 (선택, "|"로 줄바꿈):\n',
    breaking: 'BREAKING CHANGE 설명을 입력하세요 (선택):\n',
    footer: '티켓정보 (선택, 예: #123):\n',
    confirmCommit: '이 메시지로 커밋할까요?',
  },
  footerPrefix: 'Refs:',
};
