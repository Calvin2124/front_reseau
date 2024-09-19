// src/CreatePost.js
import React, { useState } from 'react';

const CreatePost = ({ onPostCreate }) => {
const [title, setTitle] = useState('');
const [content, setContent] = useState('');

const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, content, likes: 0, comments: [] };
    onPostCreate(newPost);
    setTitle('');
    setContent('');
};

return (
    <form onSubmit={handleSubmit} className="bg-white p-6 mb-6 rounded shadow-md">
    <h2 className="text-xl font-bold mb-4">Create a New Post</h2>
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
        Title
        </label>
        <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded"
        required
        />
    </div>
    <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
        Content
        </label>
        <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="4"
        className="w-full px-3 py-2 border border-gray-300 rounded"
        required
        />
    </div>
    <button
        type="submit"
        className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
        Create Post
    </button>
    </form>
);
};

export default CreatePost;