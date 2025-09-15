import express from "express";
import Poliza from "../models/Poliza.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Poliza:
 *       type: object
 *       required:
 *         - numeroPoliza
 *         - tipoSeguro
 *         - titular
 *         - monto
 *       properties:
 *         id:
 *           type: string
 *           description: ID generado por MongoDB
 *         numeroPoliza:
 *           type: string
 *           description: Número único de la póliza
 *         tipoSeguro:
 *           type: string
 *           enum: [Auto, Vida, Hogar, Salud]
 *           description: Tipo de seguro
 *         titular:
 *           type: string
 *           description: Nombre del titular de la póliza
 *         monto:
 *           type: number
 *           description: Monto asegurado
 *       example:
 *         numeroPoliza: P123
 *         tipoSeguro: Auto
 *         titular: Juan Pérez
 *         monto: 12000
 */

/**
 * @swagger
 * tags:
 *   name: Polizas
 *   description: API para gestionar pólizas de seguros
 */

/**
 * @swagger
 * /api/polizas:
 *   post:
 *     summary: Crear una nueva póliza
 *     tags: [Polizas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Poliza'
 *     responses:
 *       201:
 *         description: Póliza creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poliza'
 *       400:
 *         description: Error en la petición
 */
router.post("/", async (req, res) => {
  try {
    const poliza = new Poliza(req.body);
    await poliza.save();
    res.status(201).json(poliza);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/polizas:
 *   get:
 *     summary: Listar todas las pólizas
 *     tags: [Polizas]
 *     responses:
 *       200:
 *         description: Lista de pólizas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Poliza'
 */
router.get("/", async (req, res) => {
  try {
    const polizas = await Poliza.find();
    res.json(polizas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/polizas/{id}:
 *   get:
 *     summary: Obtener una póliza por ID
 *     tags: [Polizas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la póliza
 *     responses:
 *       200:
 *         description: Póliza encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poliza'
 *       404:
 *         description: Póliza no encontrada
 */
router.get("/:id", async (req, res) => {
  try {
    const poliza = await Poliza.findById(req.params.id);
    if (!poliza) return res.status(404).json({ error: "No encontrada" });
    res.json(poliza);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/polizas/{id}:
 *   put:
 *     summary: Actualizar una póliza por ID
 *     tags: [Polizas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la póliza
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Poliza'
 *     responses:
 *       200:
 *         description: Póliza actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poliza'
 *       404:
 *         description: Póliza no encontrada
 */
router.put("/:id", async (req, res) => {
  try {
    const poliza = await Poliza.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!poliza) return res.status(404).json({ error: "No encontrada" });
    res.json(poliza);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/polizas/{id}:
 *   delete:
 *     summary: Eliminar una póliza por ID
 *     tags: [Polizas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la póliza
 *     responses:
 *       200:
 *         description: Póliza eliminada correctamente
 *       404:
 *         description: Póliza no encontrada
 */
router.delete("/:id", async (req, res) => {
  try {
    const poliza = await Poliza.findByIdAndDelete(req.params.id);
    if (!poliza) return res.status(404).json({ error: "No encontrada" });
    res.json({ mensaje: "Póliza eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
