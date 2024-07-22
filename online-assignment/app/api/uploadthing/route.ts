import { createRouteHandler } from "uploadthing/next";
 
import { ourFileRouter } from "./core";
import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
 
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
 
  // Apply an (optional) custom config:
  // config: { ... },
});

export async function DELETE(req:NextRequest){
  try {

    const utApi = new UTApi()
    const { fileKeys } : { fileKeys : string | string[] } = await req.json()
    await utApi.deleteFiles(fileKeys)
    return NextResponse.json("ok",{status:200})

  } catch (error) {
    return NextResponse.json({message:"unexpected error"},{status:500})
  }
}