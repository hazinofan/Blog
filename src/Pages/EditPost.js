import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css'
import Editor from '../Editor';

function EditPost() {

    const {id} = useParams() 
    const [title,setTitle] = useState('')
    const [summary,setSummary] = useState('')
    const [content,setContent] = useState('')
    const [files,setFiles] = useState('')
    const [redirect,setRedirect] = useState('')

    useEffect(() => {
        fetch(`http://https://blogpage-63cf4afbb619.herokuapp.com/post/${id}`) // Corrected URL construction
          .then(response => {
            if (response.ok) {
              response.json().then(postInfo => {
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);
              });
            } else {
              console.error('Error fetching post:', response.statusText);
            }
          })
          .catch(error => console.error('Error fetching post:', error));
      }, [id]); // Added id to dep

      async function UpdatePost(e) {
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        if (files?.[0]) {
          data.set('file', files[0]);
        }
        data.append('file', files?.[0]);
        
        await fetch(`http://localhost:4000/post/${id}`, {
          method: 'PUT',
          body: data,
          credentials: 'include'
        }).then(response => {
          if (response.ok) {
            setRedirect(true);
          } else {
            console.error('Failed to update post:', response.statusText);
          }
        }).catch(error => console.error('Error updating post:', error));
      }
      

    if(redirect){
        return <Navigate to={'/post/' + id} />
      }
  return (
    <form onSubmit={UpdatePost}>
        <input type='title' 
        placeholder={'Title'} 
        value={title} 
        required
        onChange={e => setTitle(e.target.value)}
        />
        <input 
        type='summary' 
        placeholder={'Summary'} 
        value={summary}
        required
        onChange={e => setSummary(e.target.value)}
        />
        <input type='file' onChange={e => setFiles(e.target.files)}/>
        <Editor onChange={setContent} value={content} />

        <button className='btn' style={{marginTop:'5px'}}> Update Post </button>
    </form>
  )
}

export default EditPost
