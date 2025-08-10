import { cookies } from "next/headers";
import prismaClient from "./services/prisma";

export async function getUserFromCookies() {
    try {
        const userCookies = await cookies();
        const id = userCookies.get("token")?.value || "";
        if (!id) {
            return null;
        }

        const user = await prismaClient.user.findUnique({
            where: {
                id
            },
        });

        if (!user) {
            return null;
        }
        return user;
    } catch (err) {

    }

}



