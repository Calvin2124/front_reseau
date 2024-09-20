import React, { useEffect, useState } from 'react';
import PostItem from '../components/PostItem';
import PostModal from '../components/PostModal';
import { PlusCircle, ArrowRight } from 'lucide-react';

const PostList = () => {
const [token, setToken] = useState(null); // Utilise null pour l'état initial de chargement
const [posts, setPosts] = useState([]);
const [error, setError] = useState('');
const [isModalOpen, setIsModalOpen] = useState(false);

useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
    // Redirection si pas de token
    window.location.href = '/login';
    } else {
    // Si le token existe, on le met dans l'état
    setToken(token);
    fetchPosts(token)
    }
}, []);

const fetchPosts = async (token) => {
    try {
    const response = await fetch('http://localhost:3000/api/messages', {
        method: 'GET',
        headers: {
        'bearer': token
        }
    })
    if (!response.ok) {
        throw new Error('Failed to fetch posts')
    }
    const data = await response.json()
    setPosts(data.messages)
    } catch (error) {
    setError('Failed to load posts. Please try again.')
    console.error('Error fetching posts:', error)
    }
}

const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
};

const handlePostCreation = (post) => {
    if (!post.content) {
    setError('Content is required.');
    return;
    }
    addPost(post);
    setError(''); // Réinitialiser l'erreur si tout est bon
};

const disconnect = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    window.location.href = '/login';
};

// Gestion de l'affichage selon l'état du token ou si le token dans la session est différent de celui dans localStorage
if (token === null) {
    return <div className="loader"></div>;
}

return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
    <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-800">Posts</h1>
        <button
            className="flex items-center text-blue-500 hover:text-blue-600"
            onClick={() => setIsModalOpen(true)}
        >
            <PlusCircle className="w-6 h-6 mr-2" />
            <span className="text-lg">Create Post</span>
        </button>
        <button
            className="flex items-center px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
            onClick={disconnect}
        >
            <span>Disconnect</span>
            <ArrowRight className="ml-2 h-5 w-5" />
        </button>
        </div>
        <div className="p-6 border-t border-gray-200">
        <div className="p-6 space-y-6">
            {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
                {posts.slice().reverse().map((post, index) => (
                <PostItem key={index} post={post} />
                ))}
            </div>
            ) : (
            <p className="text-gray-600">No posts available. Create one!</p>
            )}
        </div>
</div>
    </div>
    <PostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreate={handlePostCreation}
        error={error} // Passer l'erreur à la modale
        fetchPosts={fetchPosts}
        token={token}
    />
    </div>
);
};

export default PostList;