import React, { useState } from 'react';

const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState(null); // État pour gérer les erreurs

const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Réinitialiser l'erreur avant de soumettre
    try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        // Si le serveur renvoie un statut d'erreur, afficher un message
        throw new Error('Identifiants incorrects ou utilisateur inconnu');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    sessionStorage.setItem('user', JSON.stringify(data));
    window.location.href = '/posts';
    } catch (error) {
    console.error('Erreur lors de la connexion', error);
    setError('Impossible de se connecter. Vérifiez vos identifiants.');
    }
};

return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-3xl font-bold mb-4">Login</h1>
    <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow-md">
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
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Login
        </button>
    </form>
    {error && (
        <p className="mt-4 text-red-500">{error}</p> // Affichage du message d'erreur
    )}
    </div>
);
};

export default Login;