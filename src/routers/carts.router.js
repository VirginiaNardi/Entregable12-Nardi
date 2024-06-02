import { Router } from "express";
import { 
  readCartsController, 
  readCartController, 
  createCartController, 
  addProductCartController, 
  updateProductsCartController,
  updateProductCartController,
  deleteProductCartController,
  deleteProductsCartController,
  purchaseCartController 
} from "../controllers/cart.controller.js";

const router = Router();

// const filePathProducts = './src/productos.json';
// const filePathCarts = './src/carrito.json';

router.get('/', readCartsController); // Devuelve todos los carritos
  
router.get('/:cid', readCartController); // Devuelve un carrito según su id

router.get('/:cid/purchase', purchaseCartController); // Ruta para finalizar la compra de los productos agregados al carrito
  
router.post('/', createCartController); // Crea un carrito
  
router.post('/:cid/product/:pid', addProductCartController); // Agrega un producto al carrito

// PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
router.put('/:cid', updateProductsCartController); // Actualiza el carrito con un arreglo de productos

// PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put('/:cid/products/:pid', updateProductCartController); // Actualiza la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body

router.delete('/:cid', deleteProductsCartController); // Vacía el carrito

  // DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
router.delete('/:cid/products/:pid', deleteProductCartController); // Elimina del carrito el producto seleccionado

export default router;