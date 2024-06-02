import ProductModel from '../models/product.model.js';
import cartModel from "../models/cart.model.js";
import { ProductService } from '../services/index.js';
import config from '../config/config.js'
import logger from '../logger.js'


export const readViewsProductsController = async (req, res) => {
  try {
    //const products = await ProductModel.find().lean().exec();
    let pageNum = parseInt(req.query.page) || 1;
    let itemsPorPage = parseInt(req.query.limit) || 10;
    const products = await ProductModel.paginate({}, { page: pageNum, limit: itemsPorPage, lean: true });

    products.prevLink = products.hasPrevPage ? `/products?limit=${itemsPorPage}&page=${products.prevPage}` : '';
    products.nextLink = products.hasNextPage ? `/products?limit=${itemsPorPage}&page=${products.nextPage}` : '';

    // console.log(products);

    // Obtener los datos del usuario desde la sesión
    const userInfo = {
      first_name: req.session.user.first_name,
      last_name: req.session.user.last_name,
      email: req.session.user.email,
      age: req.session.user.age,
      role: req.session.user.role,
    };

    // Renderizar la vista de productos y pasar los datos del usuario
    res.render('home', { ...products, userInfo });
  } catch (error) {
    logger.error('Error al leer los productos:', error);
    res.status(500).json({ error: 'Error al leer los productos' });
  }
}

export const readViewsRealTimeProductsController = async (req, res) => {
  try {
    //const products = await ProductModel.find().lean().exec();
    const products = await ProductService.getAll()
    const userInfo = {
      email: req.session.user.email,
      role: req.session.user.role,
    };
    res.render('realTimeProducts', { products, userInfo });
  } catch (error) {
    logger.error('Error al leer los productos en tiempo real:', error);
    res.status(500).json({ error: 'Error al leer los productos en tiempo real' });
  }
}

export const readViewsProductController = async (req, res) => {
  try {
    const id = req.params.cid
    //const result = await ProductModel.findById(id).lean().exec();
    const result = await ProductService.getById(id)
    const cartInfo = {
      cart: req.session.user.cart,
    };

    const userAdminControl = req.session.user.email != config.adminEmail ? true : false;

    if (result === null) {
      return res.status(404).json({ status: 'error', error: 'Product not found' });
    }
    res.render('productDetail', { product: result, cartID: cartInfo.cart, userAdminControl: userAdminControl });
  } catch (error) {
    res.status(500).json({ error: 'Error al leer los productos' });
  }
}

export const readViewsCartController = async (req, res) => {
  try {
    const id = req.params.cid
    const result = await cartModel.findById(id).lean().exec();
    if (result === null) {
      return res.status(404).json({ status: 'error', error: 'Cart not found' });
    }
    const mailUser = req.session.user.email;
    res.render('carts', { cid: result._id, products: result.products, mailUser: mailUser });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
}

