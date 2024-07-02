import Assignment from '@/components/_component/main/room/Assignment'

type Params = {
  id: string[];
  c_id:string;
}
function StudentClassAssignment({ params }:{ params : Params }) {
  return (
    <Assignment assignment_id={params.id[0]} />
  )
}

export default StudentClassAssignment