import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    city: '',
    phone: '',
    company: ''
  });

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);  
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.address.city.toLowerCase().includes(search.toLowerCase())
);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value 
    });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const id = users.length + 1;
    const addedUser = { id, ...newUser, address: { city: newUser.city }, company: { name: newUser.company } };
    setUsers([...users, addedUser]);
    setNewUser({ name: '', username: '', email: '', city: '', phone: '', company: '' });
  };

  return (
    <div className='container'>
      
      <h2>Lista de Usuarios</h2>

      <input className='search'
        type="text"
        placeholder="Buscar por nombre, email o ciudad"
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
      />
      <div className='new-user'>
      <form onSubmit={handleAddUser}>
        <h3>Nuevo usuario? Registrate ahora</h3>
        <input name="name" placeholder="Nombre" value={newUser.name} onChange={handleChange} required />
        <input name="username" placeholder="Username" value={newUser.username} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={newUser.email} onChange={handleChange} required />
        <input name="city" placeholder="Ciudad" value={newUser.city} onChange={handleChange} required />
        <input name="phone" placeholder="Teléfono" value={newUser.phone} onChange={handleChange} required />
        <input name="company" placeholder="Empresa" value={newUser.company} onChange={handleChange} required />
        
        <button type='submit'> Agregar Usuario</button>
      
      </form>
      </div>

    <div className='user-container'>
      {filteredUsers.map(user => (
        <div key={user.id} className='user-card'>
          <h3>{user.name}</h3>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Ciudad:</strong> {user.address.city}</p>
          <p><strong>Teléfono:</strong> {user.phone}</p>
          <p><strong>Empresa:</strong> {user.company.name}</p>
          <hr />
        </div>
      ))}
    </div>
     
    </div>
  );
};

export default UserList;
