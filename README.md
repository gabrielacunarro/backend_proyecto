# Backend Project

## Project Structure

- **data:** Folder storing JSON files for products, users, and orders.
- **assets:** Folder containing images related to products, users, and orders.
- **managers:**
  - **product.js:** File defining the `ProductManager` class for managing products.
  - **user.js:** File defining the `UserManager` class for managing users.
  - **order.js:** File defining the `OrderManager` class for managing orders.
  - **mongo.manager.js:** File defining the MongoManager class for managing MongoDB operations.

- **utils.js:** File containing shared functions and utilities throughout the project.
- **middlewares:** Folder containing middleware functions for the server.

- **server.js:** Main file that initializes the server.
- **routers:** Folder containing routing modules for different resources (products, users, orders, etc.).

## Endpoints

### Products
- `GET /products`: Get the list of products.
- `GET /products/:id`: Get a product by ID.
- `POST /products`: Create a new product.
- `PUT /products/:id`: Update an existing product.
- `DELETE /products/:id`: Delete a product.

### Users
- `GET /users`: Get the list of users.
- `GET /users/:id`: Get a user by ID.
- `POST /users`: Create a new user.
- `PUT /users/:id`: Update an existing user.
- `DELETE /users/:id`: Delete a user.
- `GET /users/readbyemail/:email:` Get a user by email.

### Orders
- `GET /orders`: Get the list of orders.
- `GET /orders/:uid`: Get an order by user ID.
- `POST /orders`: Create a new order.
- `PUT /orders/:id`: Update an existing order.
- `DELETE /orders/:id`: Delete an order.
- `GET /orders/total`: Get the total amount per user.

## MongoDB

- **db.js:** File containing MongoDB configuration and connection.

- **managers:**
  - **mongo.manager.js:** File defining the MongoManager class for managing MongoDB operations.

## Pagination and Filters

The application features a pagination and filtering system that allows users to efficiently manage large datasets. Key features include:

- **Pagination:** Results are divided into pages to facilitate navigation and enhance user experience, particularly useful for managing large amounts of information such as product lists or search results.

- **Filters:** Users can refine their searches using specific filters, enabling them to quickly find desired information. Filters can be applied across different criteria.

These features provide a smoother and more efficient user experience, allowing users to explore and easily find the information they are looking for.

## Session Management and Credential Validation

- **Session Management:** User sessions are used to maintain authentication between requests, implemented using packages like `express-session`.

- **Login Views:** Handlebars views are implemented for user login.

- **Credential Validation:** Credential validation functions such as `has8char` and `isValidPass` are provided in the `utils.js` file. These functions ensure passwords meet minimum security requirements before being stored in the database.

- **Data Compression:**
-The application uses compression techniques like Gzip and Brotli to optimize performance by reducing data size transferred between server and client. This improves application load speed and reduces bandwidth consumption.

- **Improved Error Handling:**
-Error handling in the application has been enhanced to provide more descriptive and useful error messages to users. This helps identify and resolve issues more efficiently, improving user experience.

- **Error Dictionary:**
-Error 400: Error - Occurs when a generic error happens in the application.
-Error 401: Bad auth - Occurs when user authentication fails due to incorrect credentials.
-Error 403: Forbidden - Occurs when the client attempts to access a resource for which they do not have sufficient permissions.
-Error 404: Not Found - Occurs when attempting to access a resource that does not exist on the server.
-Error 500: Fatal - Occurs when an internal server error prevents completion of the client's request.

- **Mocks:**
-Mocks have been incorporated to simulate the behavior of external components or dependencies during unit tests. This allows isolated testing of the code and ensures proper operation in different scenarios.

- **Logger:**

A logging system has been integrated into the project to record important events and errors. The logger uses the Winston library, providing flexibility and advanced configuration options. Additionally, the logging system is dynamically configured to adapt to the runtime environment.

- **Role and Permission Management:**
A new role has been established for the user schema called "premium" (role=2), which also allows managing their products.
The product schema has been modified to include an "owner_id" field, referencing the ID of the person who created the product (admin or premium).
Permissions have been adjusted so that:
A premium user can only update/delete products they own.
Admins can update/delete any product, even if it belongs to another owner.
A new route has been implemented in the api/users router, allowing changing a user's role from "user" (zero) to "premium" (two) and vice versa.
Logic has been modified to read products so that a premium user CANNOT view their products in the store.

## Added Enhancements:

## Testing with Supertest, Mocha, and Chai
Unit tests have been added using Supertest, Mocha, and Chai to verify the functionality of API endpoints.
Tests cover user authentication, creation, reading, updating, and deletion of products and users, as well as session management and credential validation.
Assertions have been implemented to ensure endpoints respond correctly with expected status codes and appropriate data.
Synchronization and asynchronous issues have been handled to ensure tests run properly.

## Stress Testing with Artillery
Stress tests have been added using Artillery to evaluate system performance under load.
Stress tests include scenarios such as login, reading products, and completing sessions.
These tests help identify potential bottlenecks and optimize system performance to handle a large volume of concurrent users.
With these enhancements, the project has gained in security, functionality, and performance, providing a more robust and satisfactory user experience.

## Stripe Payments
### POST /api/payments/checkout
Create a payment using Stripe to complete an order.

This endpoint utilizes the Stripe API to generate a checkout session and process payment.
The checkout session includes products from selected orders and redirects the user to a thank-you page (success_url) after completing the payment.

### Integration with Stripe
An integration with Stripe has been implemented to securely and efficiently process payments. The application uses the Stripe API to create checkout sessions, allowing users to quickly and easily make payments for selected products.

The Stripe integration provides the following functionalities:

- **Checkout Session Creation:** The Stripe API is used to create a checkout session that includes products selected by the user.
- **Payment Mode:** The checkout session is configured in payment mode to process real-time transactions.
- **User Redirection:** After completing the payment, users are redirected to a thank-you page (success_url), enhancing the final user experience.

The Stripe integration ensures secure payments compliant with PCI-DSS security standards, providing confidence to both users and the e-commerce platform.
