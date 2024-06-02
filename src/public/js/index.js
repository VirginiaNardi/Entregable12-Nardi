let socket = io() // instancia de socket.io en el cliente
const table = document.getElementById('realProductsTable') // referencia a la tabla de productos

document.getElementById('createBtn').addEventListener('click', () => {
  const createBtn = document.getElementById('createBtn');
  const userEmail = createBtn.getAttribute('data-email');
  const userRole = createBtn.getAttribute('data-role');
  console.log(userEmail)
  let body = ['']
  if (userRole === 'admin') {
    body = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      price: document.getElementById('price').value,
      code: document.getElementById('code').value,
      stock: document.getElementById('stock').value,
      category: document.getElementById('category').value,
    }
  } else {
    body = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      price: document.getElementById('price').value,
      code: document.getElementById('code').value,
      stock: document.getElementById('stock').value,
      category: document.getElementById('category').value,
      owner: userEmail,
    }
  } // crea un objeto con los datos del formulario

  // const body = {
  //   title: document.getElementById('title').value,
  //   description: document.getElementById('description').value,
  //   price: document.getElementById('price').value,
  //   code: document.getElementById('code').value,
  //   stock: document.getElementById('stock').value,
  //   category: document.getElementById('category').value,
  //   owner: userEmail,
  //   } 
  fetch('/api/products', {
    method: 'POST', // método HTTP
    body: JSON.stringify(body), // cuerpo de la request
    headers: {
      'Content-Type': 'application/json'
    }, // cabecera de la request
  }) // fetch para crear un producto
    .then(result => result.json()) // parsea el resultado a JSON
    .then(result => {
      if (result.status === 'error') throw new Error(result.error)
    }) // si el resultado es un error, lanza una excepción
    .then(() => fetch('/api/products?limit=10000')) // si no hubo error, hace un fetch para obtener la lista de productos
    .then(result => result.json()) // parsea el resultado a JSON
    .then(result => {
      if (result.status === 'error') throw new Error(result.error)
      else socket.emit('productList', result.payload) // si no hubo error, emite el evento productList con la lista de productos
      alert('Producto creado con éxito!')
      document.getElementById('title').value = '' // limpia los campos del formulario
      document.getElementById('description').value = ''
      document.getElementById('price').value = ''
      document.getElementById('code').value = ''
      document.getElementById('stock').value = ''
      document.getElementById('category').value = ''
    }) // si el resultado es un error, lanza una excepción, si no, emite el evento productList con la lista de productos
    .catch(error => {
      alert(`Ocurrio un error : ${error}`)
      console.log(error)
    }
    ) // si hubo un error, muestra un alert con el error
})

deleteProduct = (id) => {
  console.log(id);
  fetch(`/api/products/${id}`, {
    method: 'DELETE',
  })
    .then((result) => {
      if (result.ok) {
        alert('Producto eliminado con éxito!');
      } else {
        throw new Error('Error al eliminar el producto');
      }
    })
    .then(() => fetch('/api/products?limit=10000'))
    .then((result) => result.json())
    .then((result) => {
      if (result.status === 'error') throw new Error(result.error);
      else socket.emit('productList', result.payload);
    })
    .catch((error) => alert(`Ocurrió un error: ${error}`));
};

socket.on('updatedProducts', data => {
  console.log(data)
  const tbody = table.getElementsByTagName('tbody')[0];
  tbody.innerHTML = ''; // Eliminar los elementos antiguos de la tabla

  for (const product of data) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td>${product.title}</td>
    <td>${product.description}</td>
    <td>${product.price}</td>
    <td>${product.code}</td>
    <td>${product.stock}</td>
    <td>${product.category}</td>
    <td><button onclick="deleteProduct('${product._id}')">Eliminar</button></td>`;
    tbody.appendChild(tr);
  }
});
