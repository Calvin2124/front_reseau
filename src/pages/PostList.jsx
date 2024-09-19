// src/PostList.js
import React, { useState } from 'react';
import PostItem from '../components/PostItem';
import PostModal from '../components/PostModal';
import { PlusCircle } from 'lucide-react';

const PostList = () => {
const [posts, setPosts] = useState([
    {
    title: 'First Random Post',
    content: 'This is the content of the first random post.',
    likes: 5,
    comments: ['Great post!', 'Very informative.']
    },
    {
    title: 'Second Random Post',
    content: 'This is the content of the second random post.',
    likes: 2,
    comments: ['I found this useful.', 'Thanks for sharing!']
    }
]);
const [isModalOpen, setIsModalOpen] = useState(false);
const [error, setError] = useState('');

const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
};

const handlePostCreation = (post) => {
    if (!post.title || !post.content) {
    setError('Title and content are required.');
    return;
    }
    addPost(post);
    setError('');
};

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
        </div>
        <div className="p-6 border-t border-gray-200">
        <div className="p-6 space-y-6">
            {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
                {posts.map((post, index) => (
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
    />
    </div>
);
};

export default PostList;