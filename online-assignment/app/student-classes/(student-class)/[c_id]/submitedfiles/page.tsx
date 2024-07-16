import SubmitedFiles from '@/components/_component/SubmitedFiles'
import React from 'react'

const SubmitedFilesPage = ({ params }:{ params : RouteParams }) => {
  const { c_id } = params
  return (
    <SubmitedFiles student_id={c_id} />
  )
}

export default SubmitedFilesPage