// src/PostItem.js
import React, { useState } from 'react';

const PostItem = ({ post }) => {
const [likes, setLikes] = useState(post.likes || 0);
const [comments, setComments] = useState([]);
const [comment, setComment] = useState('');
const handleLike = () => {
    setLikes(likes + 1);
};

const handleCommentChange = (e) => {
    setComment(e.target.value);
};

const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
    setComments([...comments, comment]);
    setComment('');
    }
};

return (
    <div className="bg-white p-6 mb-4 rounded shadow-md">
    <h2 className="text-xl font-bold mb-2">{post.User.username}</h2>
    <p className="text-gray-700 mb-4">{post.content}</p>
    <div className="flex items-center mb-4">
        <button
        onClick={handleLike}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
        Like ({likes})
        </button>
    </div>
    <div className="mb-4">
        <form onSubmit={handleCommentSubmit} className="flex flex-col">
        <textarea
            value={comment}
            onChange={handleCommentChange}
            rows="3"
            placeholder="Add a comment..."
            className="p-2 border border-gray-300 rounded mb-2"
        />
        <button
            type="submit"
            className="self-start px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
            Comment
        </button>
        </form>
        <ul className="mt-2">
        {comments.map((comment, index) => (
            <li key={index} className="p-2 border-b border-gray-200">{comment}</li>
        ))}
        </ul>
    </div>
    </div>
);
};

export default PostItem;