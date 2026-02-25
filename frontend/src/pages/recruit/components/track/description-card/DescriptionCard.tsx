import { Card } from '@/components/ui'

interface TrackDescriptionCardProps {
  title: string
  description: string
  tags: string[]
}

export const TrackDescriptionCard = ({
  title,
  description,
  tags,
}: TrackDescriptionCardProps) => {
  return (
    <Card className="group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-white/5 bg-white/5 p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-indigo-500/20 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10 flex justify-between">
        <div className="text-xl font-bold text-white drop-shadow-md sm:text-2xl">
          {title}
        </div>
        <div className="flex gap-2 text-sm font-medium text-indigo-300 sm:text-base">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="rounded-full border border-indigo-500/30 bg-indigo-500/20 px-2 py-1 backdrop-blur-md"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-10 text-sm leading-relaxed text-slate-300 sm:text-base">
        {description}
      </div>
    </Card>
  )
}
