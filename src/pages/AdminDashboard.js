import React, { useEffect, useState } from "react";
//import axios from "axios";
import "../styles/AdminDashboard.css";
import api from "../api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]); 
  const [userHistory, setUserHistory] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const adminId = localStorage.getItem("userId"); // must be an admin

  useEffect(() => {
    api.get(`/admin/users/${adminId}`)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));

 
    api.get(`/admin/orders/${adminId}`)
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));


      api.get(`/admin/messages/${adminId}`)// fetch messages 
    .then(res => setMessages(res.data))
    .catch(err => console.error(err));


  }, [adminId]);

  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/admin/orders/${adminId}/${orderId}`, { status });
      alert("Order status updated!");
      setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    } catch (err) {
      console.error(err);
    }
  };
  const deleteOrder = async (orderId) => {
  try {
    await api.delete(`/admin/orders/${adminId}/${orderId}`);
    alert("Order deleted!");
    setOrders(orders.filter(o => o.id !== orderId));
  } catch (err) {
    console.error("Error deleting order:", err);
  }
};

const deleteMessage = async (messageId) => {
  try {
    await api.delete(`/admin/messages/${adminId}/${messageId}`);
    alert("Message deleted!");
    setMessages(messages.filter(m => m.id !== messageId));
  } catch (err) {
    console.error("Error deleting message:", err);
  }
};
//fetch history
const viewUserHistory = async (userId) => {
  try {
    const res = await api.get(`/admin/user-orders/${adminId}/${userId}`);
    setUserHistory(res.data);
    setSelectedUser(userId);
  } catch (err) {
    console.error("Error fetching user history:", err);
  }
};


  return (
    <div  className="admin-container">
     <div className="admin-card">
       <h1 className="admin-title">Admin Dashboard</h1>

        <div className="admin-section">
        <h2>Users</h2>
         <table className="admin-table">
   
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Created At</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{u.created_at}</td>
               <td>
        <button className="admin-btn" onClick={() => viewUserHistory(u.id)}>View History</button>
      </td>
            </tr>
          ))}
        </tbody>
      </table>
</div>
{selectedUser && (
  <div className="admin-section">
    <h2>Order History for User {selectedUser}</h2>
    {userHistory.length > 0 ? (
      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {userHistory.map(h => (
            <tr key={h.id}>
              <td>{h.id}</td>
              <td>{h.items}</td>
              <td>${h.total_amount}</td>
              <td>{h.status}</td>
              <td>{h.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No orders found for this user.</p>
    )}
  </div>
)}

  <div className="admin-section">
      <h2>Orders</h2>
       <table className="admin-table">
  
        <thead>
          <tr><th>ID</th><th>User</th><th>Total</th><th>Status</th><th>Created At</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td><td>{o.user_name}</td><td>${o.total_amount}</td><td>{o.status}</td><td>{o.created_at}</td>
              <td>
                <select onChange={(e) => updateOrderStatus(o.id, e.target.value)} value={o.status}>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="shipped">Shipped</option>
                </select>
                <button className="admin-btn delete-btn" onClick={() => deleteOrder(o.id)}>Delete</button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  {/* Contact Messages Section */}
        <div className="admin-section">
          <h2>Contact Messages</h2>
          <table className="admin-table">
            <thead>
              <tr><th>ID</th><th>User</th><th>Email</th><th>Message</th><th>Created At</th></tr>
            </thead>
            <tbody>
              {messages.map(m => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>{m.user_name}</td>
                  <td>{m.email}</td>
                  <td>{m.message}</td><td>
                    {m.created_at}</td>
                      <td>
                   <button className="admin-btn delete-btn" onClick={() => deleteMessage(m.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  </div>
  );
}

export default AdminDashboard;
