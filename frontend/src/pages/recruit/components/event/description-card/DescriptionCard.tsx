import { Card } from '@/components/ui'

interface DescriptionCardProps {
  title: string
  description: string
  accentColor?: string
}

export const DescriptionCard = ({
  title,
  description,
  accentColor = '#fff',
}: DescriptionCardProps) => {
  return (
    <Card className="group relative h-full min-h-[180px] w-full overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
      <div
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-40 blur-3xl transition-opacity duration-300 group-hover:opacity-70"
        style={{ backgroundColor: accentColor }}
      />
      <div className="relative z-10 flex h-full flex-col justify-between gap-4 p-4 sm:aspect-[0.96] sm:gap-0 md:p-6">
        <div className="h-full text-sm font-medium text-slate-300 sm:text-base md:text-base">
          {description}
        </div>
        <div className="whitespace-pre-line text-lg font-bold text-white drop-shadow-md sm:text-xl md:text-2xl">
          {title}
        </div>
      </div>
    </Card>
  )
}
