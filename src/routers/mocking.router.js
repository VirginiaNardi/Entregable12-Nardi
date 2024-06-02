import { Router } from "express";
import { generateProduct } from '../utils.js';

const router = Router()

const products = []

router.get('/', async (req, res) => {
    for (let i = 0; i < 100; i++){
        products.push(generateProduct())
    }
    res.send({status: 'success', payload: products})
})

export default router