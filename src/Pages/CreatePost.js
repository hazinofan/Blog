import { hasSelectionSupport } from '@testing-library/user-event/dist/utils';
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom';
import Editor from '../Editor';

// const modules = {
//   toolbar: [
//     [{ 'header': [1, 2, false] }],
//     ['bold', 'italic', 'underline','strike', 'blockquote'],
//     [{ 'size': ['small', false, 'large', 'huge'] }],
//     [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
//     ['link', 'image'],
//     ['clean']
//   ],
// };

// const  formats = [
//   'header',
//   'bold', 'italic', 'underline', 'strike', 'blockquote',
//   'list', 'bullet', 'indent',
//   'link', 'image'
// ]

function CreatePost() {
  const [title,setTitle] = useState('')
  const [summary,setSummary] = useState('')
  const [content,setContent] = useState('')
  const [files,setFiles] = useState('')
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(e) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.append('file', files[0]); // Use append instead of set
    e.preventDefault();
    console.log(files);
    await fetch('http://https://blogpage-63cf4afbb619.herokuapp.com/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    })
    .then(()=> {
      setRedirect(true)
    })
    .catch(e => console.log(e));
   
  }

  if(redirect){
    return <Navigate to={'/'} />
  }


  return (
    <form onSubmit={createNewPost}>
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
        <Editor value={content} onChange={setContent} />

        <button className='btn' style={{marginTop:'5px'}}> Create Post </button>
    </form>
  )
}

export default CreatePost
