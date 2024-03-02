document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Hacer una solicitud al servidor para obtener las órdenes del usuario logueado
        const response = await fetch('/api/orders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        // Verificar si la solicitud fue exitosa (código de estado 200)
        if (response.ok) {
            // Convertir la respuesta a JSON
            const orders = await response.json();

            // Llamar a la función para mostrar las órdenes en la página
            displayOrders(orders);
        } else {
            // Si la solicitud no fue exitosa, lanzar un error
            throw new Error('Error al obtener las órdenes del servidor');
        }
    } catch (error) {
        console.error('Error al cargar las órdenes:', error);
        // Manejar el error apropiadamente, por ejemplo, mostrando un mensaje al usuario
    }
});

// Función para mostrar las órdenes en la página HTML
function displayOrders(orders) {
    // Seleccionar el elemento tbody de la tabla de órdenes
    const tbody = document.querySelector('.order-table tbody');

    tbody.innerHTML = '';

    // Iterar sobre cada orden recibida del servidor
    orders.forEach((order) => {
        // Crear una nueva fila en la tabla
        const row = document.createElement('tr');

        // Crear celdas para mostrar el número de orden y la fecha
        const orderNumberCell = document.createElement('td');
        orderNumberCell.textContent = order.orderNumber;
        const dateCell = document.createElement('td');
        dateCell.textContent = order.date;

        // Crear una celda para mostrar los productos de la orden
        const productsCell = document.createElement('td');
        // Iterar sobre cada producto de la orden y crear un párrafo para mostrarlo
        order.products.forEach(product => {
            const productParagraph = document.createElement('p');
            productParagraph.textContent = `${product.name} - ${product.price}`;
            productsCell.appendChild(productParagraph);
        });

        // Agregar las celdas a la fila
        row.appendChild(orderNumberCell);
        row.appendChild(dateCell);
        row.appendChild(productsCell);

        // Agregar la fila al tbody de la tabla
        tbody.appendChild(row);
    });
}
