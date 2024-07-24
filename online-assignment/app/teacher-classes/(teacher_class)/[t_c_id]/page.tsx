import ClassPageCard from "@/components/_component/main/class/ClassPageCard"

function ClassPage({ params }:{ params:RouteParams }) {
  const { t_c_id } = params
  return (
    <ClassPageCard room_id={t_c_id}/>
  )
}

export default ClassPage