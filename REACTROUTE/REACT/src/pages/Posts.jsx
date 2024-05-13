import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import Post from '../components/Post';
import { serverRequests } from '../Api';

const Posts = () => {

  const UserData = useContext(UserContext);
  const [userPosts, setUserPosts] = useState([]);
  const [userPostsSearch, setUserPostsSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');

  useEffect(() => {
    if (UserData.id) {
      const fetchUserPosts = async () => {
        try {
          console.log('id:',UserData.id)
          serverRequests('GET', `posts`, null).then((postData) => {
            setUserPosts(postData)
            setUserPostsSearch(postData)
          })
        } catch (error) {
          console.error('Error fetching user posts:', error);
        }
      };
      fetchUserPosts();
    }

  }, [UserData.id]);

  const handleDeletePost = async (postId) => {
    const findPost=userPosts.find((post) => post.id === postId) ;
    if(findPost.user_id==UserData.id)
      {
    const postToDelete = {
      id:postId,
      user_id: UserData.id,
      title: findPost.title,
      body: findPost.body,
    }
    try {
      serverRequests('DELETE', `posts/${postId}`, postToDelete).then(() => {
        const updatedposts = userPosts.filter((post) => post.id !== postId);
        setUserPosts(updatedposts);
        setUserPostsSearch(updatedposts)
      })
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }
  else{
    alert('You cannot delete someone`s post! 😈')

  }
  }

  const searchHandle = (e) => {
    const updatedSearchTerm = e.target.value;
    setSearchTerm(updatedSearchTerm);
    if (updatedSearchTerm === '') {
      setUserPostsSearch(userPosts);
    } else {
      const filtered = userPosts.filter((post) =>
        post.id.toString().includes(updatedSearchTerm) || post.title.includes(updatedSearchTerm)
      );
      setUserPostsSearch(filtered);
    }
  };

  const handleAddPost = async () => {
    const postToAdd = {
      user_id: UserData.id,
      title: newPostTitle,
      body: newPostBody,
    }

    try {
      serverRequests('POST', `posts`, postToAdd).then((newPost) => {
          setUserPosts([...userPosts,newPost])
          setUserPostsSearch([...userPostsSearch,newPost])
          setNewPostTitle('');
          setNewPostBody('');
        })
      }
    catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const handleSaveClick = async (post) => {
    
    const postToUpdate = { ...post, title: post.title, body: post.body };
    
    try {
      serverRequests('PUT', `posts/${post.id}`,postToUpdate).then((updatedPosts) => {
        updatedPosts = userPosts.map((postInArr) =>
          postInArr.id === post.id ? { ...post, title: post.title, body: post.body } : postInArr
        );
        setUserPosts(updatedPosts);
        setUserPostsSearch(updatedPosts);
      })
    } catch (error) {
      console.error('Error updating todo content:', error);
    }
 
  };

  return (
    <div>
      <h1 className='post-header'>{UserData.username}`s Posts 📬</h1>
      <div>
        <div className='searchSection'>
          <div className='addPosts'>
            <input
              type="text"
              id="Entertitle"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              placeholder="Enter new post title"
            />
            <input
              type="text"
              id="Enterbody"
              value={newPostBody}
              onChange={(e) => setNewPostBody(e.target.value)}
              placeholder="Enter new post body"
            />
            <button type="button" onClick={handleAddPost}>
              Add Post
            </button>
            <br /><br />
          </div>
          <div className='searchPost'>
            <input
              type="text"
              placeholder="Search by ID or Title"
              value={searchTerm}
              onChange={searchHandle}
            />
          </div>
        </div>
        <br /><br />
      </div>


      {userPostsSearch.map((post, key) => (
        <div key={key} className='post-item'>
          <Post key={key} post={post} handleSaveClick={handleSaveClick} handleDeletePost={handleDeletePost} />
        </div>
      ))}

    </div>
  );
};

export default Posts;