export const generateProductErrorInfo = product => {
    return `
    Uno o más parámetros están incompletos o no son válidos
    Lista de propiedades obligatorias:
        -title: Must be a String. ( ${product.title} )
        -description: Must be a String. ( ${product.description} )
        -code: Must be a String. ( ${product.code} )
        -price: Must be a Number. ( ${product.price} )
        -stock: Must be a Number. ( ${product.stock} )
        -category: Must be a String. ( ${product.category} )
    `
}