interface QuizPageProps {
  params: Promise<{ trackId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const QuizPage = async ({ params, searchParams }: QuizPageProps) => {
  const { trackId } = await params
  const { level } = await searchParams

  return (
    <div>
      <h1>Quiz Page</h1>
      <p>Track ID: {trackId}</p>
      <p>Level: {level}</p>
    </div>
  )
}

export default QuizPage
