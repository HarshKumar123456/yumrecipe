import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";

const app = express();

// Middlewares -----------------------

// For Cross Origin Resource Sharing
app.use(cors());

// To access req.body
app.use(express.json());

// To see which route is accessed
app.use((req, res, next) => {
    console.log(`In server Accessing route: ${req.method} ${req.path} at ${new Date()}`);
    next();
  });

// Routes -----------------------

// To access authorisation related routes
app.use("/api/v1/auth",authRoutes);

// To access recipe related routes
app.use("/api/v1/recipe",recipeRoutes);

// Connecting to MongoDB -----------------------
connectDB();

// Setting up PORT to listen -----------------------
const PORT = process.env.PORT || 8000;

// REST api -----------------------
app.get("/" , (req,res) => {
    res.status(200).json({message: "Welcome To The SERVER...."})
});

app.listen(PORT,()=>{
    console.log(`Server is up and running on the port ${PORT}`);
});