// server.js or index.js
import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// ✅ Route to get all users
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    if (!users || users.length === 0) {
      console.log("No users found");
      return res.status(404).json({ message: "No users found" });
    }

    console.log("Users fetched successfully", users);
    return res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ error: "Error in fetching the users" });
  }
});

app.post("/create", async (req, res) => {
  const { username, email, password, mobile, vehicle_number } = req.body;

  if (!username || !email || !password || !mobile || !vehicle_number) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
        mobile,
        vehicle_number,
      },
    });

    return res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ error: "Failed to create user" });
  }
});


// Server start
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});