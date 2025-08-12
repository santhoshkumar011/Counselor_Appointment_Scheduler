import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

export const createStation = async(req , res)=>{
    const {name, address, latitude, longitude, totalSlots} = req.body;

    try{

    const existingStation = await prisma.parkingStation.findUnique({
        where: { name }
        });

    if(existingStation) {
      return res.status(400).json({ error: "Station name already exists" });
    }

        const station = await prisma.parkingStation.create({
            data:{
                name,
                address,
                latitude,
                longitude,
                totalSlots
            }
        })
        
        const slot = Array.from({length: totalSlots}).map((_, i)=>({
            parkingStationId:station.id,
            is_available:true,
            slotLable:`A${i+1}`
        }))
        
        const parkingSlots = await prisma.parkingSlot.createMany({
            data:slot
        })

        console.log("Station created successfully",slot)
        res.status(200).send({message:"Station created successfully"})

    }
    catch(err){
        console.log("Error in creating the parking table",err);
        res.status(500).send({error:"Error in creating the parking table"})
    }
}