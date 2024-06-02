import { Router } from "express";
import UserModel from "../models/user.model.js";

const router = Router();

router.put('/premium/:uid', async (req, res) => {
    const uid = req.params.uid;
    const { role } = req.body;

    // Verificar que el rol proporcionado sea válido (usuario o premium)
    if (role !== 'usuario' && role !== 'premium') {
        return res.status(400).json({ error: 'Rol no válido' });
    }

    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: uid },
            { role: role },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;
