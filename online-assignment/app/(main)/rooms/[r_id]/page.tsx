import RoomPageCard from "@/components/_component/main/room/RoomPageCard"
function RoomPage({ params }:{ params:RouteParams }) {
  const { r_id } = params
  return (
    <RoomPageCard room_id={r_id}/>
  )
}

export default RoomPage