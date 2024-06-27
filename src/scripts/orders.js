document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/orders');
        const data = await response.json();

        if (!data || !data.response || !data.response.docs) {
            throw new Error('No orders found');
        }

        const orders = data.response.docs;
        const ordersBody = document.getElementById('orders-body');

        orders.forEach(order => {
            const orderRow = document.createElement('tr');
            orderRow.setAttribute('data-id', order._id);

            const productTitle = order.pid ? order.pid.title : 'N/A';
            const productPhoto = order.pid && order.pid.photo ? order.pid.photo : 'https://via.placeholder.com/50';
            const productPrice = order.pid ? `$${order.pid.price.toFixed(2)}` : 'N/A';
            const quantity = order.quantity || 'N/A';
            const state = order.state || 'N/A';

            orderRow.innerHTML = `
                <td>
                    <div class="quantity-control">
                        <button class="quantity-btn" data-action="decrease" data-id="${order._id}">-</button>
                        <span>${quantity}</span>
                        <button class="quantity-btn" data-action="increase" data-id="${order._id}">+</button>
                    </div>
                </td>
                <td>${productTitle}</td>
                <td><img src="${productPhoto}" alt="Product Thumbnail" width="50"></td>
                <td>${productPrice}</td>
                <td>${state}</td>
                <td><span class="delete-btn" data-id="${order._id}">&times;</span></td>
    `;

            ordersBody.appendChild(orderRow);
        });

        ordersBody.addEventListener('click', async (event) => {
            if (event.target.classList.contains('delete-btn')) {
                const orderId = event.target.closest('tr').getAttribute('data-id');
                try {
                    const deleteResponse = await fetch(`/api/orders/${orderId}`, { method: 'DELETE' });
                    const deleteData = await deleteResponse.json();

                    if (deleteResponse.ok) {
                        event.target.closest('tr').remove();
                        Swal.fire({
                            icon: 'success',
                            title: 'Order deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else {
                        throw new Error(deleteData.message || 'Failed to delete order');
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error deleting order',
                        text: error.message,
                    });
                }
            }
        });

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'An unexpected error occurred',
            text: 'Please try again later.'
        });
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    const ordersTable = document.getElementById('orders-body');

    ordersTable.addEventListener('click', async (event) => {
        if (event.target.classList.contains('quantity-btn')) {
            const orderId = event.target.closest('tr').getAttribute('data-id');
            const action = event.target.getAttribute('data-action');

            const quantityElement = event.target.parentElement.querySelector('span');
            if (!quantityElement) return;

            let newQuantity = parseInt(quantityElement.textContent, 10);
            if (action === 'increase') {
                newQuantity++;
            } else if (action === 'decrease' && newQuantity > 1) {
                newQuantity--;
            } else {
                return; 
            }

            try {
                const response = await fetch(`/api/orders/${orderId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ quantity: newQuantity })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const updatedOrder = await response.json();
                quantityElement.textContent = updatedOrder.quantity; 
            } catch (error) {
                alert('Error updating quantity: ' + error.message);
            }
        }
    });
});

