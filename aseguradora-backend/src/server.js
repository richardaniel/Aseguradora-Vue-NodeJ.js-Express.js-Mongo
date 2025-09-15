import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import polizasRoutes from "./routes/polizas.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173"  
}));

app.use(express.json());


app.use("/api/polizas", polizasRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB Atlas");
    app.listen(process.env.PORT || 4000, () =>
      console.log(`Servidor corriendo en puerto ${process.env.PORT || 4000}`)
    );
  })
  .catch(err => console.error(err));

