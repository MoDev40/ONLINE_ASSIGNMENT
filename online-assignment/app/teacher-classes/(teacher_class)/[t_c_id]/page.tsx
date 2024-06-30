import RoomPageCard from "@/components/_component/main/room/RoomPageCard"
function RoomPage({ params }:{ params:RouteParams }) {
  const { t_c_id } = params
  return (
    <RoomPageCard room_id={t_c_id}/>
  )
}

export default RoomPage