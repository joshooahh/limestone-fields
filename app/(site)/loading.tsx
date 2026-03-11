export default function Loading() {
  return (
    <div className="bg-limestone-cream min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="h-px w-16 bg-[#253136]/30 animate-[grow_1.4s_ease-in-out_infinite]" />
        <p className="font-subhead text-[11px] uppercase tracking-[0.3em] text-[#253136]/50">
          Loading
        </p>
      </div>
    </div>
  )
}
