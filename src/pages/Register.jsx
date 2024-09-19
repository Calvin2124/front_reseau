import React, { useState } from 'react';

const Register = () => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [message, setMessage] = useState('');
const [isError, setIsError] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    });
    const data = await response.json();
    if (response.ok) {
        setMessage('Inscription réussie !');
        setIsError(false);
        window.location.href = '/login';
    } else {
        setMessage(data.message || 'Une erreur est survenue lors de l\'inscription');
        setIsError(true);
    }
    } catch (error) {
    setMessage('Une erreur est survenue lors de la connexion au serveur');
    setIsError(true);
    }
};

return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-3xl font-bold mb-4">Register</h1>
    {message && (
        <div className={`mb-4 p-2 rounded ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
        {message}
        </div>
    )}
    <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow-md">
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
        </label>
        <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
        />
        </div>
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
        </label>
        <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
        />
        </div>
        <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
        </label>
        <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
        />
        </div>
        <button
        type="submit"
        className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
        Register
        </button>
    </form>
    </div>
);
};

export default Register;