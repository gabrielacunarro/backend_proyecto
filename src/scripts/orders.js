document.addEventListener('DOMContentLoaded', async () => {
    let orders = [];

    try {
        const response = await fetch('/api/orders');
        const { response: { docs: ordersData } } = await response.json();

        if (!ordersData || ordersData.length === 0) {
            throw new Error('No orders found');
        }

        orders = ordersData;

        const ordersBody = document.getElementById('orders-body');

        const renderOrderRow = (order) => {
            const { _id, pid, quantity, state } = order;
            const productTitle = pid ? pid.title : 'N/A';
            const productPhoto = pid && pid.photo ? pid.photo : 'https://via.placeholder.com/50';
            const productPrice = pid ? pid.price.toFixed(2) : '0.00';
            order.price = pid ? pid.price : 0;

            return `
                <tr data-id="${_id}">
                    <td>
                        <div class="quantity-control">
                            <button class="quantity-btn" data-action="decrease">-</button>
                            <span>${quantity}</span>
                            <button class="quantity-btn" data-action="increase">+</button>
                        </div>
                    </td>
                    <td>${productTitle}</td>
                    <td><img src="${productPhoto}" alt="Product Thumbnail" width="50"></td>
                    <td>$${productPrice}</td>
                    <td>${state}</td>
                    <td><span class="delete-btn">&times;</span></td>
                </tr>
            `;
        };

        const loadOrders = () => {
            ordersBody.innerHTML = orders.map(renderOrderRow).join('');
        };

        loadOrders();

        document.addEventListener('click', async (event) => {
            const target = event.target;

            if (target.classList.contains('quantity-btn')) {
                const orderId = target.closest('tr').getAttribute('data-id');
                const action = target.getAttribute('data-action');
                const quantityElement = target.parentElement.querySelector('span');

                let newQuantity = parseInt(quantityElement.textContent, 10);

                if (isNaN(newQuantity)) {
                    console.error('Current quantity is not a number');
                    return;
                }

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
                        body: JSON.stringify({ quantity: newQuantity, state: 'cart' })
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const updatedOrder = await response.json();

                    if (updatedOrder && updatedOrder.response && updatedOrder.response.quantity) {
                        quantityElement.textContent = updatedOrder.response.quantity;
                    } else {
                        console.error('Updated order does not contain quantity');
                    }
                } catch (error) {
                    console.error('Error updating quantity:', error.message);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error updating quantity',
                        text: error.message,
                    });
                }
            } else if (target.classList.contains('delete-btn')) {
                const orderId = target.closest('tr').getAttribute('data-id');

                try {
                    const deleteResponse = await fetch(`/api/orders/${orderId}`, {
                        method: 'DELETE'
                    });

                    if (!deleteResponse.ok) {
                        throw new Error('Network response was not ok');
                    }

                    target.closest('tr').remove();
                    Swal.fire({
                        icon: 'success',
                        title: 'Order deleted',
                        text: 'Order was successfully deleted.',
                    });
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

        document.querySelector("#checkout").onclick = async () => {
            try {
                const response = await fetch("/api/payments/checkout", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ orders })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                if (data.stripeUrl) {
                    window.location.replace(data.stripeUrl);
                } else {
                    console.error('Error: No se recibió la URL de Stripe en la respuesta.');
                }
            } catch (error) {
                console.error('Error en el proceso de checkout:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error en el proceso de checkout',
                    text: error.message,
                });
            }
        };

    } catch (error) {
        console.error('Error loading orders:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error loading orders',
            text: error.message,
        });
    }
});
