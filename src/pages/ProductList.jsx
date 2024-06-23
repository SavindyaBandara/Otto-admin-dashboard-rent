import React, { useState, useEffect } from "react";
import { getAllOrders } from '../api'; // Import the getAllOrders function from your API file
import "../styles/product-list.css"; // Ensure correct path to your CSS file

const ProductList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        // console.log("API Response:", response.data); // Log the response for debugging
        if (response.status === 200) {
          setOrders(response.data);
          setError(null);
        } else {
          setError(response?.data?.message || 'Error fetching data');
        }
      } catch (error) {
        setError('Error fetching data');
        console.error("Error fetching data:", error); // Enhanced error logging
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-list">
      <h1 className="product-list-title">Order List</h1>
      {console.log(orders[0])}
      {orders.map((order, index) => (
        <div key={index} className="order">
          <div>
            <strong>Email:</strong> {order.customer.email}
          </div>
          <div>
            <strong>Full Name:</strong> {order.customer.firstName} {order.customer.lastName}
          </div>
          <div>
            <strong>Address:</strong> {order.customer.address}
          </div>
          <div>
            <strong>Order ID:</strong> {order.orderId}
          </div>
          <div>
            <strong>Eng number:</strong> {order.vehicles.engineNo}
          </div>
          <div>
            <strong>Vehicle:</strong> {order.vehicles.vehicleType}
          </div>
          <div>
            <strong>Payment:</strong> {order.paymentStatus}
          </div>
          <div>
            <strong>Vehicle Status:</strong> {order.vehicles.vehicleState
            }
          </div>
          <div>
            <strong>Eng number:</strong> {order.vehicles.engineNo}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
