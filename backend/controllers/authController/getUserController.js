import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient();

export const GetUser = async(req, res)=>{
    const {username, password} =req.query

    console.log("received:", {username, password})

    try{
        const user = await prisma.user.findFirst({
            where:{
                username:username,
            }
        })
        if(!user){
            console.log("user not found");
            return res.status(404).send({message:"User not found"});
        }
        const match = await bcrypt.compare(password, user.password)
        if(match){
            return res.status(200).send({message:"User found"});
        }
        if(!match){
            return res.status(200).send({message:"Incorrect Password"})
        }
    }
    catch(err){
        console.log("Error in fetching the user",err);
        return res.status(500).send({error:"errot in fetching the user"});
    }
}