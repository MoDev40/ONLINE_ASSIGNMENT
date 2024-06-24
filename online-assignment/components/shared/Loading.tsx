"use client"

const Loading = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-rose-500 rounded-full animate-spin"></div>
        <h1 className="mt-4 text-xl">Loading....</h1>
    </div>
  )
}

export default Loading