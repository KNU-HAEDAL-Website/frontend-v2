export interface CurriculumItem {
  readonly period: string
  readonly subject: string
  readonly outcome: string
}

export type BootcampDay = '월' | '화' | '수' | '목' | '금'

export interface Bootcamp {
  readonly slug: string
  readonly name: string
  readonly level: '기초' | '심화'
  readonly day: readonly BootcampDay[]
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
    day: ['화', '목'],
    headline: 'Life is short, you need Python',
    sampleLabel: 'PYTHON',
    sample: `def grow(together=True):
    if together:
        return "farther, faster"
    print(grow())`,
    curriculum: [
      {
        period: '1차시',
        subject: '개요, 입출력, 변수와 연산자, 자료형',
        outcome: '교육운영진: 이동근',
      },
      {
        period: '2차시',
        subject: '조건문, 반복문 / 실습',
        outcome: '교육운영진: 이동근',
      },
      {
        period: '3차시',
        subject: '함수, 리스트',
        outcome: '교육운영진: 이동근',
      },
      {
        period: '4차시',
        subject: '딕셔너리, 튜플, 집합',
        outcome: '교육운영진: 이동근',
      },
      {
        period: '5차시',
        subject: '예외처리',
        outcome: '교육운영진: 곽상원',
      },
      {
        period: '6차시',
        subject: 'OOP와 클래스 - 1',
        outcome: '교육운영진: 곽상원',
      },
      {
        period: '7차시',
        subject: 'OOP와 클래스 - 2',
        outcome: '교육운영진: 곽상원',
      },
      {
        period: '8차시',
        subject: '입출력, 형변환, 데이터타입, 제어문 복습',
        outcome: '교육운영진: 곽상원',
      },
    ],
  },
  {
    slug: 'c',
    name: 'C',
    level: '기초',
    day: ['월', '수'],
    headline: '프로그래밍 언어의 근본. C Language',
    sampleLabel: 'C',
    sample: `#include <stdio.h>

int main(void) {
    printf("hello, haedal\\n");
    return 0;
}`,
    curriculum: [
      {
        period: '1차시',
        subject: '개요, 연산자, 자료형, 입출력',
        outcome: '교육운영진: 권종성',
      },
      {
        period: '2차시',
        subject: '반복문, 조건문, 함수',
        outcome: '교육운영진: 권종성',
      },
      {
        period: '3차시',
        subject: '배열, 포인터',
        outcome: '교육운영진: 권종성',
      },
      {
        period: '4차시',
        subject: '다차원 배열, 이중포인터',
        outcome: '교육운영진: 강현서',
      },
      {
        period: '5차시',
        subject: '포인터 복습, 구조체',
        outcome: '교육운영진: 강현서',
      },
      {
        period: '6차시',
        subject: '파일 입출력, 동적할당',
        outcome: '교육운영진: 강현서',
      },
      {
        period: '7차시',
        subject: 'TODO 리스트',
        outcome: '교육운영진: 권종성',
      },
      {
        period: '8차시',
        subject: '은행 계좌 시스템',
        outcome: '교육운영진: 강현서',
      },
    ],
  },
  {
    slug: 'web',
    name: 'Web Frontend',
    level: '기초',
    day: ['화', '목'],
    headline: 'html/css/javascript',
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
        period: '1차시',
        subject: 'HTML, CSS, JS 개요, HTML 기본 구조',
        outcome: '교육운영진: 정한희',
      },
      {
        period: '2차시',
        subject: 'Figma 실습',
        outcome: '교육운영진: 정한희',
      },
      {
        period: '2차시 추가 또는 숙제',
        subject: '자기소개 페이지 만들기',
        outcome: '',
      },
      {
        period: '3차시',
        subject: 'HTML',
        outcome: '교육운영진: 양세훈',
      },
      {
        period: '4차시',
        subject: 'CSS',
        outcome: '교육운영진: 양세훈',
      },
      {
        period: '5차시',
        subject: 'JS 기본 1',
        outcome: '교육운영진: 정한희',
      },
      {
        period: '6차시',
        subject: 'JS 기본 2',
        outcome: '교육운영진: 정한희',
      },
      {
        period: '7차시',
        subject: '비동기',
        outcome: '교육운영진: 양세훈',
      },
      {
        period: '7차시 추가 또는 숙제',
        subject: 'fetch 함수로 API 호출하기',
        outcome: '',
      },
      {
        period: '8차시',
        subject: '자기소개 페이지 배포(Git 활용)',
        outcome: '교육운영진: 양세훈',
      },
    ],
  },
  {
    slug: 'spring',
    name: 'Spring Boot',
    level: '심화',
    day: ['월', '수'],
    headline: 'Write Once, Run Anywhere (Java)',
    sampleLabel: 'JAVA',
    sample: `@GetMapping("/members/{id}")
public Member find(@PathVariable Long id) {
    return memberService.findById(id);
}`,
    curriculum: [
      {
        period: '1차시',
        subject: '환경 설정, 스프링 프로젝트 생성',
        outcome: '교육운영진: 이영빈',
      },
      {
        period: '2차시',
        subject: 'ERD, API, 자바 문법, Web 개념',
        outcome: '교육운영진: 이영빈',
      },
      {
        period: '3차시',
        subject: '폴더 구조, User(Auth 제외) CRUD, DTO 개념, 예외 처리 핸들러',
        outcome: '교육운영진: 이영빈',
      },
      {
        period: '4차시',
        subject: '컨테이너, Bean 개념, DI',
        outcome: '교육운영진: 이영빈',
      },
      {
        period: '5차시',
        subject: '로그인(세션, HttpServlet)',
        outcome: '교육운영진: 이영빈',
      },
      {
        period: '6차시',
        subject: '이미지, 포스트',
        outcome: '교육운영진: 이영빈',
      },
      {
        period: '7차시',
        subject: 'Like, Follow',
        outcome: '교육운영진: 이영빈',
      },
      {
        period: '8차시',
        subject: '해커톤 프로젝트 기획 및 백엔드 개발자의 역할',
        outcome: '교육운영진: 이영빈',
      },
    ],
  },
  {
    slug: 'vibe-coding',
    name: 'Vibe Coding',
    level: '기초',
    day: ['월', '수'],
    headline: 'The hottest new programming language is English.',
    sampleLabel: 'PROMPT',
    sample: `const prompt = \`
목표: 동아리 모집 페이지 만들기

요구사항:
- React와 TypeScript 사용
- 모바일 반응형 UI
- 지원 버튼 추가
\`;`,
    curriculum: [
      {
        period: '1차시',
        subject: '바이브 코딩반 OT, 개발 환경 점검',
        outcome: '교육운영진: 허진수',
      },
      {
        period: '2차시',
        subject: 'Markdown 언어에 대한 이해와 실습',
        outcome: '교육운영진: 허진수',
      },
      {
        period: '3차시',
        subject: '프롬프트와 컨텍스트, 하네스·루프 엔지니어링의 이해',
        outcome: '교육운영진: 허진수',
      },
      {
        period: '4차시',
        subject: 'LLM 개요, 프롬프트 보안, LLM Agent의 이해',
        outcome: '교육운영진: 허진수',
      },
      {
        period: '5차시',
        subject: 'RAG 기초 및 실습, LangChain 기초 및 실습',
        outcome: '교육운영진: 허진수',
      },
      {
        period: '6차시',
        subject: 'Skill과 MCP에 대한 이해와 실습',
        outcome: '교육운영진: 허진수',
      },
      {
        period: '7차시',
        subject:
          '클라우드 플랫폼(GCP, AWS), 프론트엔드·백엔드 배포 방법, Antigravity 사용법 등',
        outcome: '교육운영진: 허진수',
      },
      {
        period: '8차시',
        subject: '미니 프로젝트',
        outcome: '교육운영진: 허진수',
      },
    ],
  },
  {
    slug: 'flutter',
    name: 'Flutter',
    level: '심화',
    day: ['화', '목'],
    headline: 'In Flutter, everything is a widget',
    sampleLabel: 'DART',
    sample: `import 'package:flutter/material.dart';

void main() => runApp(
  const MaterialApp(
    home: Scaffold(
      body: Center(child: Text('Hello, Haedal!')),
    ),
  ),
);`,
    curriculum: [
      {
        period: '1차시',
        subject: '플러터란?',
        outcome: '교육운영진: 배서진',
      },
      {
        period: '2차시',
        subject: 'Dart 소개',
        outcome: '교육운영진: 배서진',
      },
      {
        period: '3차시',
        subject: '위젯과 구조 이해',
        outcome: '교육운영진: 배서진',
      },
      {
        period: '4차시',
        subject: 'StatefulWidget 심화와 Interactive Widgets',
        outcome: '교육운영진: 배서진',
      },
      {
        period: '5차시',
        subject: 'Firebase란?',
        outcome: '교육운영진: 홍지유',
      },
      {
        period: '6차시',
        subject: 'Flutter 앱에 AI 연동하기',
        outcome: '교육운영진: 홍지유',
      },
      {
        period: '7차시',
        subject: '종합 프로젝트',
        outcome: '교육운영진: 홍지유',
      },
      {
        period: '8차시',
        subject: '소스트리를 활용한 Git 협업',
        outcome: '교육운영진: 홍지유',
      },
    ],
  },
  {
    slug: 'algorithm',
    name: 'Algorithm',
    level: '심화',
    day: ['화', '목'],
    headline: '문제를 효율적으로 해결하는 사고력',
    sampleLabel: 'C++',
    sample: `#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> graph = {{1, 2}, {0, 3}, {0}, {1}};
vector<bool> visited(4);

void dfs(int node) {
    visited[node] = true;
    cout << node << ' ';

    for (int next : graph[node]) {
        if (!visited[next]) dfs(next);
    }
}

int main() {
    dfs(0);
}`,
    curriculum: [
      {
        period: '1차시',
        subject: '시간 복잡도, 공간 복잡도',
        outcome: '교육운영진: 이태헌',
      },
      {
        period: '2차시',
        subject: '배열 조작',
        outcome: '교육운영진: 이태헌',
      },
      {
        period: '3차시',
        subject: '큐, 스택, 덱',
        outcome: '교육운영진: 이태헌',
      },
      {
        period: '4차시',
        subject: 'BFS, DFS',
        outcome: '교육운영진: 이태헌',
      },
      {
        period: '5차시',
        subject: '재귀, 백트래킹',
        outcome: '교육운영진: 이태헌',
      },
      {
        period: '6차시',
        subject: 'DP',
        outcome: '교육운영진: 이태헌',
      },
      {
        period: '7차시',
        subject: '해시',
        outcome: '교육운영진: 이태헌',
      },
      {
        period: '8차시',
        subject: '힙',
        outcome: '교육운영진: 이태헌',
      },
    ],
  },
]
