import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoute.js";
import cors from "cors";

dotenv.config();
databaseConnection();

const app = express();
const PORT = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ehllo",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
