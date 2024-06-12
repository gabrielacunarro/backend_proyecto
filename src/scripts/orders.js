window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/orders');
        const data = await response.json();
        
        if (!data || !data.response || !data.response.docs) {
            throw new Error('No se encontraron órdenes');
        }
        
        const orders = data.response.docs; 

        const ordersBody = document.getElementById('orders-body'); 

        orders.forEach(order => {
            const orderRow = document.createElement('tr'); 

            const productTitle = order.pid ? order.pid.title : 'N/A';

            const quantity = order.quantity || 'N/A';

            const state = order.state || 'N/A';

            // Crear celdas para cada propiedad de la orden y agregarlas a la fila
            orderRow.innerHTML = `
                <td>${order._id}</td>
                <td>${order.createdAt}</td>
                <td>${productTitle}</td>
                <td>${quantity}</td>
                <td>${state}</td>
            `;

            ordersBody.appendChild(orderRow); 
        });
    } catch (error) {
        throw error('Error al obtener las órdenes:', error);
    }
});


