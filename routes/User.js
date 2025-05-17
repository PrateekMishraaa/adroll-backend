import express from "express";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import User from "../models/UserSchema.js";

const router = express.Router();
const SecretKey = process.env.JWTKEY;

// Signup Route
router.post("/signup", async (req, res) => {
    const { FirstName, LastName, Email, WebsiteName, Password } = req.body;

    if (!FirstName || !LastName || !Email || !WebsiteName || !Password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const isUserExists = await User.findOne({ Email });
        if (isUserExists) {
            return res.status(409).json({ message: "User already exists with this email" });
        }

        const newUser = new User({ FirstName, LastName, Email, WebsiteName, Password });
        await newUser.save();

        console.log("User created", newUser);
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
        return res.status(400).json({ message: "Invalid fields" });
    }

    try {
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = JWT.sign({ id: user._id }, "thisisyoursecretkey", { expiresIn: "7d" });

        // Exclude password from response
        const { Password: _, ...userData } = user.toObject();

        res.status(200).json({ message: "Login successful", token, user: userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/allusers",async(req,res)=>{
    try{
            const allUsers = await User.find()
            console.log(allUsers)
            res.status(200).json({message:"All Users are here",allUsers})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
})

export default router;
