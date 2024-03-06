window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/orders');
        const data = await response.json();
        const orders = data.response.docs; // Obtener el array de órdenes

        const ordersBody = document.getElementById('orders-body'); // Obtener el cuerpo de la tabla

        orders.forEach(order => {
            const orderRow = document.createElement('tr'); // Crear una fila para cada orden

            // Crear celdas para cada propiedad de la orden y agregarlas a la fila
            orderRow.innerHTML = `
                <td>${order._id}</td>
                <td>${order.createdAt}</td>
                <td>${order.pid.title}</td>
                <td>${order.quantity}</td>
                <td>${order.state}</td>
            `;

            ordersBody.appendChild(orderRow); // Agregar la fila al cuerpo de la tabla
        });
    } catch (error) {
        console.error('Error al obtener las órdenes:', error);
    }
});

