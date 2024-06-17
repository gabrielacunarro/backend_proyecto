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
                <td>${quantity}</td>
                <td>${productTitle}</td>
                <td><img src="${productPhoto}" alt="Product Thumbnail" width="50"></td>
                <td>${productPrice}</td>
                <td>${state}</td>
                <td><span class="delete-btn">&times;</span></td>
            `;

            ordersBody.appendChild(orderRow);
        });

        // Add click event to all table rows
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
                    console.error('Error deleting order:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error deleting order',
                        text: error.message,
                    });
                }
            }
        });

    } catch (error) {
        console.error('Error fetching orders:', error);
        Swal.fire({
            icon: 'error',
            title: 'An unexpected error occurred',
            text: 'Please try again later.'
        });
    }
});
