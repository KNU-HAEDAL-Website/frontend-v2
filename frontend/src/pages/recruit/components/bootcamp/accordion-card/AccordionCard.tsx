import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Card,
} from '@/components/ui'

export const BootcampAccordionCard = () => {
  return (
    <div className="relative flex w-full flex-col items-center gap-5 px-5 py-10 sm:flex-row sm:items-start sm:justify-center md:gap-10">
      <Card className="relative flex min-h-[460px] w-full max-w-[320px] flex-col overflow-hidden border border-white/10 bg-black/40 px-4 py-8 text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] sm:max-w-sm">
        <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative z-10 text-2xl font-bold text-blue-300 drop-shadow-md lg:text-3xl">
          기초반
        </div>
        <div className="relative z-10 flex-1 py-6 text-slate-300">
          코딩을 처음 접하거나 문법부터 응용까지 기초를 단단히 다지고 싶은
          준회원 분들이 선택할 수 있습니다.
        </div>
        <Accordion
          type="single"
          collapsible
          className="relative z-10 w-full text-white"
        >
          <AccordionItem
            value="item-1"
            className="my-3 rounded-xl border border-white/5 bg-white/5 px-4 backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            <AccordionTrigger className="py-3 font-semibold text-blue-200">
              C 언어
            </AccordionTrigger>
            <AccordionContent className="text-slate-300">
              C언어의 기초 문법부터 포인터, 동적 할당, 자료구조 맛보기 기초부터
              응용까지
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="my-3 rounded-xl border border-white/5 bg-white/5 px-4 backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            <AccordionTrigger className="py-3 font-semibold text-blue-200">
              파이썬
            </AccordionTrigger>
            <AccordionContent className="text-slate-300">
              파이썬의 기초 문법부터 클래스, 여러 가지 모듈 활용 실습, tkinter
              활용 GUI 프로그램까지
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="my-3 rounded-xl border border-white/5 bg-white/5 px-4 backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            <AccordionTrigger className="py-3 font-semibold text-blue-200">
              웹 기초
            </AccordionTrigger>
            <AccordionContent className="text-slate-300">
              웹 개발에 필수인 HTML, CSS, JavaScript 기초를 공부하고 대세 UI/UX
              개발 툴인 Figma 실습까지
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      <Card className="relative flex min-h-[460px] w-full max-w-[320px] flex-col overflow-hidden border border-white/10 bg-black/40 px-4 py-8 text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] sm:max-w-sm">
        <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="relative z-10 text-2xl font-bold text-purple-300 drop-shadow-md lg:text-3xl">
          심화반
        </div>
        <div className="relative z-10 flex-1 py-6 text-slate-300">
          프레임워크, 라이브러리와 같은 기술을 배우며 서비스 개발에 직접 활용해
          보고 싶은 준회원분들이 선택할 수 있습니다.
        </div>
        <Accordion
          type="single"
          collapsible
          className="relative z-10 w-full text-white"
        >
          <AccordionItem
            value="item-1"
            className="my-3 rounded-xl border border-white/5 bg-white/5 px-4 backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            <AccordionTrigger className="py-3 font-semibold text-purple-200">
              Spring
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-slate-300">
              <div>
                API를 이용하여 애플리케이션의 필수 기능 구현 후 배포까지
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="my-3 rounded-xl border border-white/5 bg-white/5 px-4 backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            <AccordionTrigger className="py-3 font-semibold text-purple-200">
              Flutter
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-slate-300">
              <div>
                종합 프로젝트로 어플을 제작하면서 파이어베이스와 API연동까지
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="my-3 rounded-xl border border-white/5 bg-white/5 px-4 backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            <AccordionTrigger className="py-3 font-semibold text-purple-200">
              머신러닝
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-slate-300">
              <div>
                프로젝트에 활용할 수 있도록 프레임워크와 인공지능 지식을
                습득하고 싶은 회원분들을 대상으로 하는 반
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  )
}
