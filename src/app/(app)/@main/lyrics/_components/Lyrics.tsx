const Lyrics = ({ lyrics }: { lyrics: string }) => {
  return (
    <div className="h-full overflow-y-scroll px-10 py-20 scrollbar-hide">
      <p className="whitespace-pre-line text-xl font-bold text-gray-100 filter">
        {lyrics}
      </p>
      <span className="block pt-10 text-xs text-gray-200">
        Lyrics provided by LRCLIB
      </span>
    </div>
  )
}

export default Lyrics
