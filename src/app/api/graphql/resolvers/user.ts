import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";

export async function signUpUser(x: any, args: { name: string; email: string; password: string }, context: any) {
    const { name, email, password } = args;
    try {
        await prismaClient.user.create({
            data: args
        });
        return true;
    } catch (err) {
        console.error("Error creating user:", err);
        return false;
    }
}
export async function loginUser(x: any, args: { email: string; password: string }, context: any) {
    const { email, password } = args;
    const cookieStore = await cookies();
    try {
        const user = await prismaClient.user.findUnique({
            where: { 
                email : args.email
        }
        });
        if(user?.password == args.password){
            cookieStore.set("token" , user.id)
            return true;
        } else {
            cookieStore.set("token" , "")
            return false;
        } 
    } catch (err) {
        console.error("Error logging in user:", err);
        return false;
    }
}

export async function currentUserBlogs(x: any, args: any, context: any) {
    try{
        const user = await getUserFromCookies();
        if (!user) return null;
    
        const blogs = await prismaClient.blog.findMany({
            where: { user_id: user.id }
        });
        return blogs;
    } catch (err) {
        console.error("Error fetching current user's blogs:", err);
        return null;
    }
}