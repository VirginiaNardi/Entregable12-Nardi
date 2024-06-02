import { Router } from "express";
import logger from '../logger.js'

const router = Router()

router.get('/', async (req, res) => {
    logger.debug('Esto es un mensaje de debug');
    logger.http('Esto es un mensaje de http');
    logger.info('Esto es un mensaje de info');
    logger.warning('Esto es un mensaje de warning');
    logger.error('Esto es un mensaje de error');
    logger.fatal('Esto es un mensaje de fatal');

    res.send('Los logs se han registrado correctamente.');
})

export default router