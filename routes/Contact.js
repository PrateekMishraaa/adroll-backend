import express from "express"
import Contact from "../models/ContactSchema.js"
const router = express.Router()


router.post("/contact",async(req,res)=>{
    const {BussinessEmail,JobTitle,Website,Country} = req.body;

    if(!BussinessEmail || !JobTitle || !Website || !Country){
        return res.status(300).json({message:"All fields are required"})
    }
    try{
            const Form = await Contact.create({
                BussinessEmail,
                JobTitle,
                Website,
                Country
            })
            console.log("Form has been submitted",Form)
            res.status(200).json({message:"Form Submitted successfully",Form})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error",error})
    }
})


router.get("/allrequest",async(req,res)=>{
    try{
            const data = await Contact.find()
            console.log("All quries",data)
            res.status(200).json({message:"All requests",data})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error",error})
    }
})



export default router