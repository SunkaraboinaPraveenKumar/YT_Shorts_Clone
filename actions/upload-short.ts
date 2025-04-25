"use server"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const uploadShortSchema=z.object({
    title:z.string(),
    description:z.string(),
    video:z.string(),
})

type UploadShortsState={
    errors:{
        title?:string[];
        description?:string[],
        video?:string[],
        formError?:string[]
    }
}

export const uploadShortAction=async(prevState:UploadShortsState,formData:FormData): Promise<UploadShortsState>=>{
    const result = uploadShortSchema.safeParse({
        title:formData.get("title") as string,
        description:formData.get("description") as string,
        video:formData.get("video") as string
    })

    if(!result.success){
        return {
            errors:result.error.flatten().fieldErrors
        }
    }

    // Clerk authentication check.
    const {userId}=await auth();
    if(!userId){
        return {
            errors:{
                formError:["Please Login First to Create Shorts.."]
            }
        }
    }

    const user = await prisma.user.findUnique({
        where:{clerkUserId:userId}
    });

    try{
        if(!user?.id){
            return{
                errors:{
                    formError:["User not found!!"]
                }
            }
        }

        await prisma.shorts.create({
            data:{
                title: result.data.title,
                description: result.data.description,
                url: result.data.video,
                userId:user.id
            }
        })
    }
    catch(e: unknown){
        if(e instanceof Error){
            return {
                errors:{
                    formError:[e.message]
                }
            }
        }
        else{
            return{
                errors:{
                    formError:["Some Internal Server Error. Try Again"]
                }
            }
        }
    }

    revalidatePath("/");
    redirect("/");
}