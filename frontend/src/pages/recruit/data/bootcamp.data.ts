export interface CurriculumItem {
  readonly period: string
  readonly subject: string
  readonly outcome: string
}

export interface Bootcamp {
  readonly slug: string
  readonly name: string
  readonly level: '기초' | '심화'
  readonly headline: string
  readonly sampleLabel: string
  readonly sample: string
  readonly curriculum: readonly CurriculumItem[]
}

export const bootcamps: readonly Bootcamp[] = [
  {
    slug: 'python',
    name: 'Python',
    level: '기초',
    headline: '처음이어도, 직접 움직이는 코드를 만듭니다.',
    sampleLabel: 'PYTHON',
    sample: `def grow(together=True):
    if together:
        return "farther, faster"

print(grow())`,
    curriculum: [
      {
        period: '01—02',
        subject: '변수, 조건문, 반복문',
        outcome: '코드와 친해지기',
      },
      {
        period: '03—04',
        subject: '함수와 자료구조',
        outcome: '생각을 코드로 나누기',
      },
      {
        period: '05—06',
        subject: '파일과 데이터 다루기',
        outcome: '데이터 읽고 정리하기',
      },
      {
        period: '07—08',
        subject: 'API와 간단한 자동화',
        outcome: '반복 작업 줄이기',
      },
      {
        period: '09—10',
        subject: '미니 프로젝트 설계',
        outcome: '아이디어 구체화하기',
      },
      {
        period: '11—12',
        subject: '프로젝트 완성 및 데모',
        outcome: '결과를 공유하기',
      },
      {
        period: '01—02',
        subject: '변수, 조건문, 반복문',
        outcome: '코드와 친해지기',
      },
      {
        period: '03—04',
        subject: '함수와 자료구조',
        outcome: '생각을 코드로 나누기',
      },
      {
        period: '05—06',
        subject: '파일과 데이터 다루기',
        outcome: '데이터 읽고 정리하기',
      },
      {
        period: '07—08',
        subject: 'API와 간단한 자동화',
        outcome: '반복 작업 줄이기',
      },
      {
        period: '09—10',
        subject: '미니 프로젝트 설계',
        outcome: '아이디어 구체화하기',
      },
      {
        period: '11—12',
        subject: '프로젝트 완성 및 데모',
        outcome: '결과를 공유하기',
      },
    ],
  },
  {
    slug: 'c',
    name: 'C',
    level: '기초',
    headline: '컴퓨터가 코드를 이해하는 방식을 배웁니다.',
    sampleLabel: 'C',
    sample: `#include <stdio.h>

int main(void) {
    printf("hello, haedal\\n");
    return 0;
}`,
    curriculum: [
      {
        period: '01—02',
        subject: '컴파일과 기본 문법',
        outcome: '첫 프로그램 실행하기',
      },
      {
        period: '03—04',
        subject: '조건문과 반복문',
        outcome: '실행 흐름 제어하기',
      },
      {
        period: '05—06',
        subject: '배열과 문자열',
        outcome: '연속된 데이터 다루기',
      },
      { period: '07—08', subject: '함수와 포인터', outcome: '메모리 이해하기' },
      {
        period: '09—10',
        subject: '구조체와 동적 메모리',
        outcome: '데이터 구조 설계하기',
      },
      {
        period: '11—12',
        subject: '콘솔 프로젝트 완성',
        outcome: '프로그램 시연하기',
      },
    ],
  },
  {
    slug: 'web',
    name: 'Web Frontend',
    level: '기초',
    headline: '아이디어를 누구나 만질 수 있는 화면으로 만듭니다.',
    sampleLabel: 'JAVASCRIPT',
    sample: `function Hello() {
  return (
    <main>
      <h1>Build what matters.</h1>
    </main>
  );
}`,
    curriculum: [
      {
        period: '01—02',
        subject: 'HTML과 시맨틱 웹',
        outcome: '화면의 뼈대 만들기',
      },
      {
        period: '03—04',
        subject: 'CSS 레이아웃과 반응형',
        outcome: '어디서나 잘 보이게 하기',
      },
      {
        period: '05—06',
        subject: 'JavaScript 핵심 문법',
        outcome: '화면에 동작 더하기',
      },
      {
        period: '07—08',
        subject: 'React 컴포넌트와 상태',
        outcome: 'UI를 구조화하기',
      },
      {
        period: '09—10',
        subject: 'API 연결과 팀 개발',
        outcome: '데이터와 화면 연결하기',
      },
      {
        period: '11—12',
        subject: '웹 서비스 배포 및 데모',
        outcome: '서비스 공개하기',
      },
    ],
  },
  {
    slug: 'spring',
    name: 'Spring',
    level: '심화',
    headline: '서비스의 보이지 않는 중심을 설계합니다.',
    sampleLabel: 'JAVA',
    sample: `@GetMapping("/members/{id}")
public Member find(@PathVariable Long id) {
    return memberService.findById(id);
}`,
    curriculum: [
      {
        period: '01—02',
        subject: 'Java 객체지향 복습',
        outcome: '역할과 책임 나누기',
      },
      {
        period: '03—04',
        subject: 'Spring Boot와 HTTP',
        outcome: '요청과 응답 이해하기',
      },
      {
        period: '05—06',
        subject: 'REST API 설계',
        outcome: '일관된 API 만들기',
      },
      {
        period: '07—08',
        subject: 'JPA와 데이터베이스',
        outcome: '데이터 저장하기',
      },
      {
        period: '09—10',
        subject: '인증과 예외 처리',
        outcome: '안전한 서비스 만들기',
      },
      {
        period: '11—12',
        subject: '백엔드 서비스 배포',
        outcome: '서버 운영 경험하기',
      },
    ],
  },
  {
    slug: 'ai',
    name: 'AI',
    level: '심화',
    headline: '데이터 속 패턴을 찾아 쓸모 있는 모델로 연결합니다.',
    sampleLabel: 'PYTHON',
    sample: `model.fit(train_x, train_y)
score = model.evaluate(test_x, test_y)

print(f"accuracy: {score:.2%}")`,
    curriculum: [
      {
        period: '01—02',
        subject: 'NumPy와 데이터 다루기',
        outcome: '데이터 읽고 살피기',
      },
      {
        period: '03—04',
        subject: '시각화와 전처리',
        outcome: '데이터를 설명하기',
      },
      {
        period: '05—06',
        subject: '머신러닝의 기본 원리',
        outcome: '학습 과정 이해하기',
      },
      {
        period: '07—08',
        subject: '모델 학습과 평가',
        outcome: '성능 비교하기',
      },
      {
        period: '09—10',
        subject: '프로젝트 실험과 개선',
        outcome: '가설 검증하기',
      },
      {
        period: '11—12',
        subject: '결과 공유 및 데모',
        outcome: '인사이트 전달하기',
      },
    ],
  },
  {
    slug: 'flutter',
    name: 'flutter',
    level: '심화',
    headline: '서비스의 보이지 않는 중심을 설계합니다.',
    sampleLabel: 'JAVA',
    sample: `@GetMapping("/members/{id}")
public Member find(@PathVariable Long id) {
    return memberService.findById(id);
}`,
    curriculum: [
      {
        period: '01—02',
        subject: 'Java 객체지향 복습',
        outcome: '역할과 책임 나누기',
      },
      {
        period: '03—04',
        subject: 'Spring Boot와 HTTP',
        outcome: '요청과 응답 이해하기',
      },
      {
        period: '05—06',
        subject: 'REST API 설계',
        outcome: '일관된 API 만들기',
      },
      {
        period: '07—08',
        subject: 'JPA와 데이터베이스',
        outcome: '데이터 저장하기',
      },
      {
        period: '09—10',
        subject: '인증과 예외 처리',
        outcome: '안전한 서비스 만들기',
      },
      {
        period: '11—12',
        subject: '백엔드 서비스 배포',
        outcome: '서버 운영 경험하기',
      },
    ],
  },
  {
    slug: 'algorithm',
    name: 'algorithm',
    level: '심화',
    headline: '서비스의 보이지 않는 중심을 설계합니다.',
    sampleLabel: 'JAVA',
    sample: `@GetMapping("/members/{id}")
public Member find(@PathVariable Long id) {
    return memberService.findById(id);
}`,
    curriculum: [
      {
        period: '01—02',
        subject: 'Java 객체지향 복습',
        outcome: '역할과 책임 나누기',
      },
      {
        period: '03—04',
        subject: 'Spring Boot와 HTTP',
        outcome: '요청과 응답 이해하기',
      },
      {
        period: '05—06',
        subject: 'REST API 설계',
        outcome: '일관된 API 만들기',
      },
      {
        period: '07—08',
        subject: 'JPA와 데이터베이스',
        outcome: '데이터 저장하기',
      },
      {
        period: '09—10',
        subject: '인증과 예외 처리',
        outcome: '안전한 서비스 만들기',
      },
      {
        period: '11—12',
        subject: '백엔드 서비스 배포',
        outcome: '서버 운영 경험하기',
      },
    ],
  },
]
