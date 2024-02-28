import React from 'react'
import {formatISO9075} from 'date-fns'
import { Link } from 'react-router-dom'

function Post(props) {
  const { id, title, summary, cover, createdAt, author } = props;
  return (
    <div>
      <div className='post'>
        <div className='image'>
          <Link to={`/post/${id}`}> 
            <img src={`http://localhost:4000/${cover}`} alt='image'  />
          </Link>
        </div>
        <div className='text'>
          <Link to={`/post/${id}`}> 
            <h2>{title}</h2>
          </Link>
          <p className='info'>
            <span className='author'>{author.username}</span>
            <time>{formatISO9075(new Date(createdAt), 'MMM d yyyy HH:mm')}</time>
          </p>
          <p className='Summary'>{summary}</p>
        </div> 
      </div>
    </div>
  );
}


export default Post