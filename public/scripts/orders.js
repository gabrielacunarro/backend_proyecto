window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/orders');
        const data = await response.json();
        
        if (!data || !data.response || !data.response.docs) {
            throw new Error('No se encontraron órdenes');
        }
        
        const orders = data.response.docs; // Obtener el array de órdenes

        const ordersBody = document.getElementById('orders-body'); // Obtener el cuerpo de la tabla

        orders.forEach(order => {
            const orderRow = document.createElement('tr'); // Crear una fila para cada orden

            // Obtener el título del producto
            const productTitle = order.pid ? order.pid.title : 'N/A';

            // Obtener la cantidad agregada al carrito
            const quantity = order.quantity || 'N/A';

            // Obtener el estado de la orden
            const state = order.state || 'N/A';

            // Crear celdas para cada propiedad de la orden y agregarlas a la fila
            orderRow.innerHTML = `
                <td>${order._id}</td>
                <td>${order.createdAt}</td>
                <td>${productTitle}</td>
                <td>${quantity}</td>
                <td>${state}</td>
            `;

            ordersBody.appendChild(orderRow); // Agregar la fila al cuerpo de la tabla
        });
    } catch (error) {
        console.error('Error al obtener las órdenes:', error);
        // Aquí podrías mostrar un mensaje de error en tu interfaz de usuario
    }
});


