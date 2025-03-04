import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Card,
} from '@/components/ui'

export const BootcampAccordionCard = () => {
  return (
    <div className="flex w-full flex-col items-center gap-5 px-5 py-10 sm:flex-row sm:items-stretch sm:justify-center md:gap-10">
      <Card className="w-80 bg-[#8A9F84] px-4 py-10 text-white sm:w-96">
        <div className="text-2xl font-semibold lg:text-3xl">기초반</div>
        <div className="py-6">
          코딩을 처음 접하거나 문법부터 응용까지 기초를 단단히 다지고 싶은
          준회원 분들이 선택할 수 있습니다.
        </div>
        <Accordion type="single" collapsible className="w-full text-black">
          <AccordionItem
            value="item-1"
            className="my-2 rounded-xl border-none bg-white px-2"
          >
            <AccordionTrigger className="py-3 font-semibold">
              C 언어
            </AccordionTrigger>
            <AccordionContent>
              C언어의 기초 문법부터 포인터, 동적 할당, 자료구조 맛보기 기초부터
              응용까지
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="my-2 rounded-xl border-none bg-white px-2"
          >
            <AccordionTrigger className="py-3 font-semibold">
              파이썬
            </AccordionTrigger>
            <AccordionContent>
              파이썬의 기초 문법부터 클래스, 여러 가지 모듈 활용 실습, tkinter
              활용 GUI 프로그램까지
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="my-2 rounded-xl border-none bg-white px-2"
          >
            <AccordionTrigger className="py-3 font-semibold">
              웹 기초
            </AccordionTrigger>
            <AccordionContent>
              웹 개발에 필수인 HTML, CSS, JavaScript 기초를 공부하고 대세 UI/UX
              개발 툴인 Figma 실습까지
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
      <Card className="w-80 bg-[#84869F] px-4 py-10 text-white sm:w-96">
        <div className="text-2xl font-semibold lg:text-3xl">심화반</div>
        <div className="py-6">
          프로젝트에 활용할 수 있도록 프레임워크를 다뤄보고 싶은 준회원분들이
          선택할 수 있습니다.
        </div>
        <Accordion type="single" collapsible className="w-full text-black">
          <AccordionItem
            value="item-1"
            className="my-2 rounded-xl border-none bg-white px-2"
          >
            <AccordionTrigger className="py-3 font-semibold">
              Spring
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <div>요건: java로 입부 테스트 통과</div>
              <div>
                API를 이용하여 애플리케이션의 필수 기능 구현 후 배포까지
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="my-2 rounded-xl border-none bg-white px-2"
          >
            <AccordionTrigger className="py-3 font-semibold">
              React
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <div>요건: js로 입부 테스트 통과</div>
              <div>{`HTML, CSS, JS와 함께 <해달그램> 제작 후 배포까지`}</div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="my-2 rounded-xl border-none bg-white px-2"
          >
            <AccordionTrigger className="py-3 font-semibold">
              ANS
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <div>요건: java로 입부 테스트 통과</div>
              <div>{`<해달 그램>을 제작하면서 리스트뷰 구현, 파이어베이스 연동까지`}</div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  )
}
