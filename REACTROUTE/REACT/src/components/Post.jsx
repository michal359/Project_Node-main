import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import Comments from '../components/Comments';

const Post = ({ post, handleSaveClick, handleDeletePost }) => {
    const UserData = useContext(UserContext);

    const [editedPostTitle, setEditedPostTitle] = useState(post.title);
    const [editedPostBody, setEditedPostBody] = useState(post.body);
    const [selectedComment, setSelectedComment] = useState([]);
    const [isCommentsShow, setIsCommentsShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [show, setShow] = useState(false);

    const showComments = (post) => {
        setSelectedComment(post);
        setIsCommentsShow(true)

    };
    return (
        <>
            <div className='postItem'>
                <h3>ID: {post.id}</h3>
                <h3>Title: {post.title}</h3>
                {edit ? (
                    <>
                        <input
                            type="text"
                            value={editedPostTitle}
                            onChange={(e) => setEditedPostTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            value={editedPostBody}
                            onChange={(e) => setEditedPostBody(e.target.value)}
                        />
                        <button type="button" onClick={() => { handleSaveClick({ ...post, title: editedPostTitle, body: editedPostBody }), setEdit(!edit) }}>
                            Save
                        </button>
                    </>
                ) : (
                    <>

                        <button type="button" onClick={() => handleDeletePost(post.id)}>
                            ❌
                        </button>
                        <button type="button" onClick={() => {
                            if(post.user_id!=UserData.id)
                             alert('You cannot edit someone`s post! 😈')
                              else
                              setEdit(true)
                        } }>
                            ✏️
                        </button>
                        <button type="button" onClick={() => setShow(true)}>
                            Show
                        </button>
                        {show &&
                            <div style={{ fontWeight: 'bold', marginTop: '10px', color: 'red' }}>
                                <p>User ID: {post.user_id}</p>
                                <p>ID: {post.id}</p>
                                <p>Title: {post.title}</p>
                                <p>Body:{post.body}</p>
                            </div>
                        }
                        <button type="button" onClick={() => showComments(post)}>
                            Show Comments
                        </button>
                        {isCommentsShow && <Comments postId={post.id} UserData={UserData} />}
                    </>
                )}
            </div>
        </>
    )
}

export default Post