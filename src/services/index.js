import ProductDAO from "../dao/product.mongo.dao.js";
import ProductRepository from "../repositories/product.repository.js";

export const ProductService = new ProductRepository(new ProductDAO());
