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
            const productPhoto = order.pid && order.pid.photo ? order.pid.photo : 'https://via.placeholder.com/50'; 
            const productPrice = order.pid ? `$${order.pid.price.toFixed(2)}` : 'N/A';
            const quantity = order.quantity || 'N/A';
            const state = order.state || 'N/A';

            orderRow.innerHTML = `
                <td>${productTitle}</td>
                <td><img src="${productPhoto}" alt="Product Thumbnail" width="50"></td>
                <td>${productPrice}</td>
                <td>${quantity}</td>
                <td>${state}</td>
            `;

            ordersBody.appendChild(orderRow); 
        });
    } catch (error) {
        throw error('Error al obtener las órdenes:', error);
    }
});


