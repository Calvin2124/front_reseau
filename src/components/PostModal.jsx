// src/components/PostModal.js
import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XCircle } from 'lucide-react';

const PostModal = ({ isOpen, onClose, onPostCreate }) => {
const [title, setTitle] = useState('');
const [content, setContent] = useState('');
const [error, setError] = useState('');

const handlePostCreate = (e) => {
    e.preventDefault();
    if (!title || !content) {
    setError('Title and content are required.');
    return;
    }
    onPostCreate({ title, content, likes: 0, comments: [] });
    setTitle('');
    setContent('');
    setError('');
    onClose();
};

return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen p-4 bg-black/30">
        <Dialog.Panel className="bg-white rounded-lg max-w-sm w-full p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Create Post</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-600">
            <XCircle className="w-6 h-6" />
            </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handlePostCreate}>
            <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            placeholder="Content"
            className="w-full p-2 border border-gray-300 rounded-md mb-4 resize-none"
            />
            <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
            Create Post
            </button>
        </form>
        </Dialog.Panel>
    </div>
    </Dialog>
);
};

export default PostModal;