import { z } from "zod";

export const UserObject = z.object({
    name : z.string() ,
    email: z.string().includes("@"),
    Password: z.string().min(2)
});
