import React from 'react'

function StudentClassAssignments({ params }:{ params : RouteParams }) {
  return (
    <div>StudentClassAssignments {JSON.stringify(params.id[0])}</div>
  )
}

export default StudentClassAssignments