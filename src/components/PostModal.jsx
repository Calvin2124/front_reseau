import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XCircle } from 'lucide-react';

const PostModal = ({ isOpen, onClose, onPostCreate }) => {
const [content, setContent] = useState('');
const [error, setError] = useState('');
const [isLoading, setIsLoading] = useState(false);
const tokenUser = localStorage.getItem('token');

const handlePostCreate = async (e) => {
    e.preventDefault();
    if (!content) {
    setError('Content is required.');
    return;
    }
    setIsLoading(true);
    setError('');
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));
    try {
    // Remplacez l'URL par l'endpoint de votre API
    const response = await fetch('http://localhost:3000/api/messages/create', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'bearer' : tokenUser
        },
        body: JSON.stringify({ content, likes: 0, comments: [], idUser: sessionUser.idUser }),
    });

    if (!response.ok) {
        throw new Error('Failed to create post');
    }

    const newPost = await response.json();
    onPostCreate(newPost);
    setContent('');
    onClose();
    } catch (err) {
    setError('An error occurred while creating the post. Please try again.');
    console.error('Error creating post:', err);
    } finally {
    setIsLoading(false);
    }
};

return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen p-4 bg-black/30">
        <Dialog.Panel className="bg-white rounded-lg max-w-sm w-full p-6 shadow-lg relative">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Create Post</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-600">
            <XCircle className="w-6 h-6" />
            </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handlePostCreate}>
            <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            placeholder="Content"
            className="w-full p-2 border border-gray-300 rounded-md mb-4 resize-none"
            />
            <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-green-300"
            disabled={isLoading}
            >
            {isLoading ? 'Creating...' : 'Create Post'}
            </button>
        </form>
        </Dialog.Panel>
    </div>
    </Dialog>
);
};

export default PostModal;