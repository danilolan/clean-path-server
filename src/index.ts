import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import customerRouter from "./routes/customer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use("/api/v1", customerRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
