import React, { useEffect, useState } from 'react'
import axios from 'axios';

function UserManagement() {

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [editUserId, setEditUserId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "" });

  const fetchUsers = async () => {

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get("http://localhost:3000/api/users", config);
      setUsers(data);
    } catch (error) {
      console.error("Greška pri dohvaćanju korisnika:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.post("http://localhost:3000/api/users", form, config);
      setForm({ name: "", email: "", password: "", role: "user" });
      fetchUsers(); // osvježi listu
    } catch (error) {
      alert(error.response?.data?.message || "Greška pri dodavanju korisnika.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const handleRoleChange = async (userId, newRole) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.put(`http://localhost:3000/api/users/${userId}`, { role: newRole }, config);
      fetchUsers(); // osvježi listu
    } catch (error) {
      alert(error.response?.data?.message || "Greška pri ažuriranju korisnika.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.delete(`http://localhost:3000/api/users/${userId}`, config);
        fetchUsers(); // osvježi listu
      } catch (error) {
        alert(error.response?.data?.message || "Greška pri brisanju korisnika.");
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  const startEditing = (user) => {
    setEditUserId(user._id);
    setEditForm({ name: user.name, email: user.email });
  };

  const cancelEditing = () => {
    setEditUserId(null);
    setEditForm({ name: "", email: "" });
  };

  const saveEdit = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.put(`http://localhost:3000/api/users/${editUserId}`, editForm, config);
      fetchUsers();
      cancelEditing();
    } catch (error) {
      alert(error.response?.data?.message || "Greška pri ažuriranju korisnika.");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        User Management
      </h2>
      {/* Add New User Form  */}
      <div className="p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-4">
          Add New User
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter password"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="user">user</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Add User
          </button>
        </form>
      </div>

      {/* User List Management  */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{editUserId === user._id ? (
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    className="border p-1 rounded"
                  />
                ) : (
                  user.name
                )}
                </td>
                <td className="p-4">{editUserId === user._id ? (
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    className="border p-1 rounded"
                  />
                ) : (
                  user.email
                )}
                </td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className='py2 border rounded'
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  {editUserId === user._id ? (
                    <>
                      <button onClick={saveEdit} className="bg-green-500 text-white px-2 py-1 rounded mr-2">Spremi</button>
                      <button onClick={cancelEditing} className="bg-gray-500 text-white px-2 py-1 rounded">Otkaži</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEditing(user)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Uredi</button>
                      <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 text-white px-2 py-1 rounded">Obriši</button>
                    </>
                  )}

                  {/* <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default UserManagement