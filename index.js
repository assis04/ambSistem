import express from "express";
import authRoutes from "./src/routes/authRoutes.js";

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});