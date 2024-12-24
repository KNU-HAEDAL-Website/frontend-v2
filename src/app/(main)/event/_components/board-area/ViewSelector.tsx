type View = '갤러리' | '리스트'

type ViewSelectorProps = {
  view: View
  setView: (view: View) => void
}

const viewOptions: View[] = ['갤러리', '리스트']

export const ViewSelector = ({ view, setView }: ViewSelectorProps) => {
  return (
    <div className="flex w-full justify-end gap-3 py-4">
      {viewOptions.map((item) => (
        <span
          key={item}
          className={`pointer-events-auto cursor-pointer text-sm ${
            view === item ? 'text-primary' : 'text-gray-400'
          }`}
          onClick={() => setView(item)}
        >
          {item}
        </span>
      ))}
    </div>
  )
}
