import React, { useEffect, useState } from 'react';
import service from '../appwrite/service.js';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className='rounded-xl'
          />
        </div>
      </div>
      <h2 className='text-xl font-bold'>{title}</h2>
    </Link>
  );
}

export default PostCard;
