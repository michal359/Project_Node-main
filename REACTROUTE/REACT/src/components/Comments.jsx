import React, { useState, useEffect, useContext } from 'react';
import { serverRequests } from '../Api';


function Comments({ postId, UserData }) {

    const [comments, setComments] = useState([]);
    const [newCommentName, setNewCommentName] = useState('');
    const [newCommentEmail, setNewCommentEmail] = useState('');
    const [newCommentBudy, setNewCommentBudy] = useState('');
    const [isCommentAdd, setIsCommentAdd] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentName, setEditedCommentName] = useState('');
    const [editedCommentBody, setEditedCommentBody] = useState('');
    const [clickEdit, setClickEdit] = useState(null);

    useEffect(() => {

        const fetchUserComments = async () => {
            try {
                serverRequests('GET', `comments?post_id=${postId}`, null).then((comment)=>{
                    setComments(comment);

                })
            }
            catch (error) {
                console.error('Error fetching comments:', error);
            }
        }
        fetchUserComments()
    }, [postId]);

    const handleAddComment = async () => {

        const newComment = {
            post_id: postId,
            name: newCommentName,
            email: UserData.email,
            body: newCommentBudy,
        }

        try {
            serverRequests('POST', 'comments', newComment).then((newComment) => {
                setComments([...comments, newComment])
                setNewCommentName('');
                setNewCommentEmail('');
                setNewCommentBudy('');
                setIsCommentAdd(false)

            })
        }
        catch (error) {
            console.error('Error adding post:', error);
        }
    };
    
    const handleDeleteComment = async (commentToDelete) => {

        if (commentToDelete.email === UserData.email) {
            try {
                serverRequests('DELETE', `comments/${commentToDelete.id}`, commentToDelete).then(() => {
                    const updatedcomments = comments.filter((comment) => comment.id !== commentToDelete.id);
                    setComments(updatedcomments);
                })
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        }
        else {
            alert('You cannot delete someone`s comments! 😈')
        }
    }


    const handleEditComment = (commentToEdit) => {
        if (commentToEdit.email === UserData.email) {
            setClickEdit(commentToEdit)
            setEditedCommentName(commentToEdit.name)
            setEditedCommentBody(commentToEdit.body)
            setEditingCommentId(commentToEdit.id)
        }
        else {
            alert('You cannot edit someone`s comments! 😈')
        }
    }

    const handleSaveEditedComment = async (commentIdToEdit) => {

        const updateComment = {
            post_id: commentIdToEdit,
            name: editedCommentName,
            email: UserData.email,
            body: editedCommentBody,
        }

        try {
             serverRequests('PUT', `comments/${commentIdToEdit}`, updateComment).then((updatedComments)=>{
                comments.map((comment) =>
                    comment.id === commentIdToEdit ? { ...comment, name: editedCommentName, body: editedCommentBody } : comment
                );
                setComments([...comments, updatedComments]);
                setEditingCommentId(null);
                setEditedCommentName('');
                setEditedCommentBody('');
                setClickEdit(null)
            })
    
        } catch (error) {
            console.error('Error updating comment content:', error);
        }
    }


    return (

        <div>
            <button type="button" onClick={() => setIsCommentAdd(!isCommentAdd)}>
                {isCommentAdd ? "close" : " Add comment"}
            </button>

            {isCommentAdd ? (
                <>
                    <input
                        type="text"
                        placeholder='Enter comment name'
                        value={newCommentName}
                        onChange={(e) => setNewCommentName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder='Enter comment body'
                        value={newCommentBudy}
                        onChange={(e) => setNewCommentBudy(e.target.value)}
                    />
                    <button type="button" onClick={() => handleAddComment()}>
                        Save
                    </button>
                </>

            ) : ("")}

            {comments.map((comment, index) => (

                <div key={index}>
                    <p>id: {comment.id}</p>
                    <p>Name: {comment.name}</p>
                    <p>email: {comment.email}</p>
                    <p>Body: {comment.body}</p>

                    <button type="button" onClick={() => handleDeleteComment(comment)}>
                        ❌
                    </button>
                    <button type="button" onClick={() => handleEditComment(comment)}>
                        ✏️
                    </button>
                    {clickEdit && clickEdit.id === comment.id &&
                        <>
                            <input
                                type="text"
                                value={editedCommentName}
                                onChange={(e) => setEditedCommentName(e.target.value)}
                            />
                            <input
                                type="text"
                                value={editedCommentBody}
                                onChange={(e) => setEditedCommentBody(e.target.value)}
                            />
                            <button type="button" onClick={() => handleSaveEditedComment(comment.id)}>
                                Save
                            </button>
                        </>}
                </div>
            ))}

        </div>
    )
}

export default Comments