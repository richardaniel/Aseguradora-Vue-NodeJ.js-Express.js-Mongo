import mongoose from "mongoose";

const polizaSchema = new mongoose.Schema({
  numeroPoliza: {
    type: String,
    required: true,
    unique: true
  },
  tipoSeguro: {
    type: String,
    enum: ["Auto", "Vida", "Hogar", "Salud"],
    required: true
  },
  titular: {
    type: String,
    required: true
  },
  monto: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Poliza", polizaSchema);

