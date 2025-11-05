import React, { useEffect, useState } from "react";
import httpClient,{ BASE_URL } from "../../Utils/httpClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await httpClient.get("/orders/getAllOrders");

        if (res.data.success) {
          setOrders(res.data.orders || []);
        } else {
          toast.info(res.data.message || "No orders found");
        }
      } catch (error) {
        console.error("Error fetching all orders:", error);
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="page-content p-4">
      <div className="container-xxl">
        <h3 className="text-lg font-semibold mb-4">All Orders</h3>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <p>No orders found</p>
          </div>
        ) : (
          <div className="table-responsive shadow rounded bg-white">
            <table className="table align-middle mb-0 table-hover table-centered">
              <thead className="bg-light-subtle">
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id || index}>
                    <td>#{order._id?.slice(-6).toUpperCase()}</td>
                    <td>
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td>{order.userDetails?.name || "Unknown"}</td>
                    <td>{order.items?.length || 0}</td>
                    <td>₹{order.totalAmount?.toFixed(2)}</td>
                    <td>
                      <span
                        className={`badge px-2 py-1 fs-13 ${
                          order.status === "Delivered"
                            ? "bg-success text-light"
                            : order.status === "Cancelled"
                            ? "bg-danger text-light"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => openOrderDetails(order)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ✅ Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 preview-order">
          <div className="bg-white w-11/12 max-w-2xl rounded-lg shadow-lg p-5 relative">
            <button
              onClick={closeModal}
              className="close-btn"
            >
              &times;
            </button>

            <h4 className="text-lg font-semibold mb-3">
              Order #{selectedOrder._id.slice(-6).toUpperCase()}
            </h4>

            <div className="border-b pb-3 mb-3">
              <p><strong>Customer:</strong> {selectedOrder.userDetails?.name}</p>
              <p><strong>Email:</strong> {selectedOrder.userDetails?.email}</p>
              <p><strong>Phone:</strong> {selectedOrder.userDetails?.phone}</p>
              <p><strong>Address:</strong> {selectedOrder.userDetails?.address}</p>
              <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
            </div>

            <h5 className="font-semibold mb-2">Products:</h5>
            <div className="overflow-x-auto">
              <table className="table table-sm table-bordered">
                <thead className="bg-light-subtle">
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Image</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.productName}</td>
                      <td>  {item.image ? (
            <img
              src={item.image.startsWith("http") ? item.image : `${BASE_URL}${item.image}`}
              alt={item.productName}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
          ) : (
            <span className="text-muted">No image</span>
          )}
        </td>
                      <td>{item.quantity}</td>
                      <td>₹{item.price}</td>
                      <td>₹{(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-right mt-4">
              <h5 className="font-semibold">
                Total: ₹{selectedOrder.totalAmount.toFixed(2)}
              </h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
