import { Router } from "express"
import { isAuthenticated, isAdminOrPremium, hasAdminCredentials } from "../public/js/authMiddleware.js";
import { 
  readViewsProductsController, 
  readViewsRealTimeProductsController, 
  readViewsProductController,
  readViewsCartController 
} from "../controllers/views.controller.js";

const router = Router();

router.get('/', isAuthenticated, readViewsProductsController); // Devuelve todos los productos
  
router.get('/realtimeproducts', isAuthenticated, isAdminOrPremium, readViewsRealTimeProductsController); // Devuelve todos los productos en tiempo real

router.get('/:cid', isAuthenticated, readViewsProductController) // Devuelve un producto según su id

router.get('/carts/:cid', isAuthenticated, readViewsCartController) // Devuelve un carrito según su id
  
export default router;