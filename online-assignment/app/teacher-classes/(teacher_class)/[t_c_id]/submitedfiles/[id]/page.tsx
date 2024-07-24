import SubmitedFiles from '@/components/_component/submitted-file/SubmitedFiles'

const SubmitedFilesPage = ({ params }:{ params : RouteParams }) => {
  const { id } = params
  return (
    <SubmitedFiles student_id={id} />
  )
}

export default SubmitedFilesPage