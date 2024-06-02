import { Router } from "express";
import  { getbill } from '../controllers/mail.controller.js'

const router = Router();

router.post('/send', getbill)

export default router;