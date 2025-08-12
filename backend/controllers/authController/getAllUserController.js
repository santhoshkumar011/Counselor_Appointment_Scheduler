import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const GetAllUsers = async(req, res)=>{

    try{
        const users = await prisma.user.findMany();
        if(!users){
            console.log("No users found");
            return res.status(404).send({message:"No users found"});
        }
        console.log("Users fetched successfully",users);
        return res.status(200).send(users)
    }
    catch(err){
        console.log("Error in fetching the users");
        return res.status(500).send({error:"Error in fetching the users"});
    }
    
}