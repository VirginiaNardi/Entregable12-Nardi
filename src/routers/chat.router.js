import { Router } from "express"
import config from '../config/config.js'

const router = Router();

router.get('/', (req, res) => {
    const userAdminControl = req.session.user.email != config.adminEmail ? true : false;
    res.render('chat', { email: userAdminControl });
})

export default router;