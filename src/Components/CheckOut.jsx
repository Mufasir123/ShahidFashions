import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { totalAmount, cartProducts } = location.state || { totalAmount: 0, cartProducts: [] };

  // Handle order confirmation (example)
  const handleConfirmOrder = () => {
    alert('Order Confirmed!'); // Replace this with real order handling logic
    navigate('/'); // Redirect to the homepage or orders page
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      {cartProducts.length > 0 ? (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              {cartProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center mb-4"
                >
                  <div>
                    <p className="text-lg font-medium">{product.title}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {product.quantity || 1}
                    </p>
                  </div>
                  <p className="text-lg font-medium">
                    ${product.price * (product.quantity || 1)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mb-8">
            <p className="text-xl font-semibold">Total Amount</p>
            <p className="text-xl font-bold">${totalAmount}</p>
          </div>
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700"
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </button>
        </>
      ) : (
        <p className="text-lg font-medium">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Checkout;
