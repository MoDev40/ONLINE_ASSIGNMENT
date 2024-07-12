import Assignment from "@/components/_component/main/room/Assignment"

const page = ({ params }:{ params:RouteParams}) => {
  return (
    <Assignment assignment_id={params.id} />
)
}

export default page