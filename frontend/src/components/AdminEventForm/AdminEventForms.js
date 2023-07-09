import React, { useState, useEffect } from 'react';
// import * as api from '../../api';
import './AdminEventForm.css';
import events from '../../data/EventData/EventData';

function AdminEventForm({ currentId, setcurrentId }) {
  // const token = profile?.token;

  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   }
  // };

  //   const user = profile?.result;

  const [post, setPost] = useState(
    {
      title: '',
      description: '',
      event_time: '',
      event_date: '',
      event_location: '',
      state: '', country: '',
      amountAdult: '',
      amountChild: '',
      eventImage: ''
    });

  const editPost = currentId ? events.find((post) => post._id === currentId) : null

  useEffect(() => {
    if (editPost) setPost(editPost);
  }, [editPost]);

  //   const postdata = async () => {
  //     if (currentId) {
  //       const { data } = await api.editPost(currentId, { ...post, name: user.name }, config);
  //       if (data) {
  //         dispatch(updatePost(data));
  //       }
  //     } else {
  //       const { data } = await api.createPost({ ...post, name: user.name }, config);
  //       if (data) {
  //         dispatch(setPosts([...PostData, data]));
  //       }
  //     }
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    // postdata();
    clearSubmit();
  };

  const clearSubmit = () => {
    setPost({
      title: '',
      description: '',
      event_time: '',
      event_date: '',
      event_location: '',
      state: '', country: '',
      amountAdult: '',
      amountChild: '',
      eventImage: ''
    });
    setcurrentId(null);
  }

  //   if (!user) {
  //     return (
  //       <div className='form-message'>
  //         <h2>Please login to create your own memories</h2>
  //       </div>
  //     );
  //   }

  return (
    <div className='form-container'>
      <div className='form-header'>
        <h2>{currentId ? 'Edit' : 'Create'} an Event</h2>
      </div>
      <div className='form-content'>
        <div className='form-input'>
          <span>Title:</span>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>
        <div className='form-input'>
          <span>Description:</span>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
          ></textarea>
        </div>
        <div className='form-input'>
          <span>Event Date:</span>
          <input
            type="text"
            value={post.event_date}
            onChange={(e) => setPost({ ...post, event_date: e.target.value })}
          />
        </div>
        <div className='form-input'>
          <span>Event Time:</span>
          <input
            type="text"
            value={post.event_time}
            onChange={(e) => setPost({ ...post, event_time: e.target.value })}
          />
        </div>
        <div className='form-input'>
          <span>Event Location:</span>
          <input
            type="text"
            value={post.event_location}
            onChange={(e) => setPost({ ...post, event_location: e.target.value })}
          />
        </div>
        <div className='form-input'>
          <span>State:</span>
          <input
            type="text"
            value={post.state}
            onChange={(e) => setPost({ ...post, state: e.target.value })}
          />
        </div>
        <div className='form-input'>
          <span>Country:</span>
          <input
            type="text"
            value={post.country}
            onChange={(e) => setPost({ ...post, country: e.target.value })}
          />
        </div>
        <div className='form-input'>
          <span>Amount for Child:</span>
          <input
            type="text"
            value={post.amountChild}
            onChange={(e) => setPost({ ...post, amountChild: e.target.value })}
          />
        </div>
        <div className='form-input'>
          <span>Amount for adult:</span>
          <input
            type="text"
            value={post.amountAdult}
            onChange={(e) => setPost({ ...post, amountAdult: e.target.value })}
          />
        </div>
        <div className='form-input'>
          <span>Poster:</span>
          <input
            type="file"
            onChange={(e) => setPost({ ...post, eventImage: e.target.files[0] })}
          />
        </div>
        <div className='form-buttons'>
          <button onClick={clearSubmit}>Clear</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
export default AdminEventForm;