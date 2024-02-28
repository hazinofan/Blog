import React, { useEffect, useState } from 'react'
import { ReactDOM } from 'react-dom'
import Post from '../Post'

function Index() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/post')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(posts => setPosts(posts))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);
  
  return (
    <div>
        <>
            {posts.length > 0 && posts.map(post => (
              <Post
              id={post._id} // Assuming _id is a unique identifier for each post
              title={post.title}
              summary={post.summary}
              cover={post.cover}
              content={post.content}
              createdAt={post.createdAt}
              author={post.author}
            />
            ))}
        </>
    </div>
  )
}

export default Index