import 'dotenv/config';
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import authRoutes from "./src/routes/authRoutes.js";

if (!process.env.JWT_SECRET) {
  console.error("FATAL: JWT_SECRET não definido. Defina no .env");
  process.exit(1);
}

const app = express();

app.use("/auth", authRoutes);

app.use(helmet());

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000"
}));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});
app.use(limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Muitas tentativas, tente novamente mais tarde" },
});


app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port", process.env.PORT || 3000);
});