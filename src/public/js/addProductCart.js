const addToCartButtons = document.querySelectorAll('.addToCartBtn');

addToCartButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const productId = button.getAttribute('data-product-id'); // ID del producto
        const cartId = button.getAttribute('cID'); // ID del carrito

        try {
            const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
                method: 'POST'
            });

            if (response.ok) {
                // Manejar la respuesta aquí si es necesario, por ejemplo, mostrar un mensaje de éxito
                console.log('Producto agregado al carrito');
                alert('Producto agregado al carrito');
            } else {
                console.error('Error al agregar producto al carrito:', response.statusText);
                alert('Error al agregar producto al carrito');
            }
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            alert('Error al agregar producto al carrito');
        }
    });
});