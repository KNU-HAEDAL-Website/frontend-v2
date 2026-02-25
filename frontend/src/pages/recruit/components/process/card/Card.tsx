import { Card } from '@/components/ui'

interface ProcessCardProps {
  title: string
  detail: string
}

export const ProcessCard = ({ title, detail }: ProcessCardProps) => {
  return (
    <Card className="group relative flex min-w-52 flex-col justify-center gap-2 overflow-hidden rounded-2xl border border-orange-200/20 bg-orange-950/40 px-5 py-8 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-orange-300/40 hover:bg-orange-900/50 hover:shadow-[0_0_30px_rgba(251,146,60,0.2)]">
      <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-yellow-400/20 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10 text-lg font-bold text-orange-50 drop-shadow-md sm:text-xl">
        {title}
      </div>
      <div className="relative z-10 text-sm font-medium text-orange-200/80 sm:text-base">
        {detail}
      </div>
    </Card>
  )
}
