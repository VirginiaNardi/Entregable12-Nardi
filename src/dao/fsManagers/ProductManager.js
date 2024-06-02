import fs from 'fs'
import logger from '../../logger.js'

class ProductManager {
    #products
    #error
    #path
    constructor() {
        this.#products = [];
        this.#error = undefined;
        this.#path = './src/productos.json';
    }

    #generateId = () => (this.#products.length === 0) ? 1 : this.#products[this.#products.length - 1].id + 1

    #validateEvent = (title, description, price, thumbnail, code, stock) => {
        if (!title || !description || !price || !thumbnail || !code || !stock){
            this.#error = `ATENCION ( ${title} : Faltan datos )`
        } else {
            const found = this.#products.find(product => product.code === code)
            if(found) this.#error = `ATENCION ( ${title} : El producto ya existe )`
            else this.#error = undefined
        }
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        this.#validateEvent(title, description, price, thumbnail, code, stock)
        if (this.#error === undefined){
            this.#products.push({id: this.#generateId(), title, description, price, thumbnail, code, stock})
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#products, null, '\t'))
        }
        else {
            logger.error(this.#error)
        } 
    }

    getProducts = async () => {
        const existe = fs.existsSync(this.#path)
        if (!existe) {
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#products, null, '\t'))
            logger.info("El archivo de productos no existia, se acaba de crear")
        }
        const contenido = await fs.promises.readFile(this.#path, 'utf-8'); 
        return JSON.parse(contenido);
    }

    getProductById = async (id) => {
        const products = await this.getProducts();
        const product = await products.find(p => p.id === id);
        logger.debug("------------------------ Busqueda por Id -----------------------------")
        logger.debug('ID ingresado: ' + id);
        if (!product) return 'Not Found';
        logger.debug('Producto encontrado: ');
        return product;
    }

    updateProduct = async (id, updatedFields) => {
        logger.debug("------------------------ Actualizacion de producto -----------------------------")
        const products = await this.getProducts();
        const productIndex = products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            logger.debug(`Producto con id ${id} no encontrado`);
            return;
        }
        const updatedProduct = { ...products[productIndex], ...updatedFields };
        products[productIndex] = updatedProduct;
        await fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'));
        logger.info(`Producto con id ${id} actualizado`);
    }

    deleteProduct = async (id) => {
        logger.debug("------------------------ Eliminación de producto -----------------------------")
        const products = await this.getProducts();
        const productIndex = products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            logger.info(`Producto con id ${id} no encontrado`);
            return false;
        }
        products.splice(productIndex, 1);
        await fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'));
        logger.info(`Producto con id ${id} eliminado`);
        return true;
    }

}

const productManager = new ProductManager()

export default productManager;