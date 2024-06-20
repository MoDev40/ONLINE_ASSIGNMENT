import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import express from 'express'

const app = express()

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
async function main() {
  try {

    const classRooms = await prisma.classroom.findMany()
    const classRoomWithAssignments = await prisma.classroom.findMany({
      include:{
        assignments:true
      }
    })

    const assignments = await prisma.assignment.findMany()

    const assignmentWithSubmissions = await prisma.assignment.findMany({
      include:{
        submissions:true
      }
    })

    const userClassRoom = await prisma.userClassroom.findMany({
      include:{
        classroom:{
          include:{ 
            assignments:{
              include:{
                submissions:true
              }
            }
          }
        },
      }
    })

    app.get('/', (req, res) => {
      res.status(200).json({classRooms,classRoomWithAssignments,assignments,assignmentWithSubmissions,userClassRoom})
    })

  } catch (error) {
    console.log(error)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })