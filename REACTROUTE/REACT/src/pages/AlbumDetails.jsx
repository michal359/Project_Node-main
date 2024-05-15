import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { AlbumsContext } from '../App';
import { serverRequests } from '../Api';

function AlbumDetails() {

    const UserData = useContext(UserContext);
    const AlbumsData = useContext(AlbumsContext);

    const [photosData, setPhotosData] = useState([]);
    const [totalPhotosCount, setTotalPhotosCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [photosPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [newPhotoUrl, setNewPhotoUrl] = useState('');
    const [newPhotoTitle, setNewPhotoTitle] = useState('');
    const [editedTitles, setEditedTitles] = useState({});
    const [showEditFields, setShowEditFields] = useState({});
    const navigate = useNavigate();
    const { albumId } = useParams();

    useEffect(() => {
        const fetchAlbumPhotos = async () => {
            try {
              
                    const response = await fetch(`http://localhost:3000/photos?album_id=${albumId}&_page=${currentPage}&_limit=${photosPerPage}`)
                    if (response.ok) {
                    const totalCountHeader = (response).headers.get('x-total-count');
                    setTotalPhotosCount(totalCountHeader ? parseInt(totalCountHeader, 10) : 0);
                    setTotalPages(Math.ceil(totalPhotosCount / photosPerPage));
                    const currentAlbumPhotos = await response.json();
                    setPhotosData(currentAlbumPhotos);
                    setLoading(false);
                    } else {
                        console.error('Failed:', fetchResponse.statusText);
                    }
                
                    
                

            } catch (error) {
                console.error('Error fetching album photos:', error);
                setLoading(false);
            }
        };

        fetchAlbumPhotos();
    }, [albumId, currentPage, photosPerPage]);

    const loadMorePhotos = () => {
        if(currentPage<totalPages)
            {
                setCurrentPage((prevPage) => prevPage + 1);
                setLoading(true);
            }
        
    };

    const loadPrevPhotos = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
            setLoading(true);
        }
    }

    const deletePhoto = async (photoId) => {
        try {
            const findPhoto=photosData.find((photo) => photo.id === photoId) ;
            serverRequests('DELETE', `photos/${photoId}`, findPhoto)
            .then(()=>{
                setPhotosData((prevPhotos) => prevPhotos.filter((photo) => photo.id !== photoId));
            })
            
            
        } catch (error) {
            console.error('Error deleting photo:', error);
        }
    };

    const addPhotoToAlbum = async () => {

        const photoToAdd = {
            album_id: albumId,
            title: newPhotoTitle,
            url: newPhotoUrl,
            thumbnailUrl: newPhotoUrl,
        }

        try {
            serverRequests('POST', `photos`, photoToAdd).then((newPhoto) => {
               
                    setPhotosData((prevPhotos) => [...prevPhotos, newPhoto]);
                
                setNewPhotoUrl('');
                setNewPhotoTitle('');
                setTotalPages(Math.ceil((totalPhotosCount + 1) / photosPerPage));
            })
        } catch (error) {
            console.error('Error adding photo to album:', error);
        }
    };

    const toggleEditField = (photoId) => {
        setShowEditFields((prevShowEditFields) => ({
            ...prevShowEditFields,
            [photoId]: !prevShowEditFields[photoId],
        }));
    };

    const handleTitleChange = (photoId, newTitle) => {
        setEditedTitles((prevEditedTitles) => ({
            ...prevEditedTitles,
            [photoId]: newTitle,
        }));
    };

    const saveEditedTitle = async (photoId) => {
        const findPhoto=photosData.find((photo) => photo.id === photoId) ;

        const updatePhoto = {
            id:photoId,
            title: editedTitles[photoId] || '',
            url:findPhoto.url,
            thumbnailUrl:findPhoto.thumbnailUrl
        }

        try {
            serverRequests('PUT', `photos/${photoId}`, updatePhoto).then((response) => {
               console.log("p",response)
                setPhotosData((prevPhotos) =>
                     prevPhotos.map((photo) =>
                         photo.id === photoId ? { ...photo, response } : photo
                   )
                );
                
                toggleEditField(photoId);
            })
        } catch (error) {
            console.error('Error editing photo title:', error);
        }
    };

    return (
        <>
            <div className='photos-header'>
                <button onClick={() => navigate(`/home/users/${UserData.id}/albums`)}>Return to All Albums</button>
                <h3>You have {totalPages} pages of photos in this album</h3>
                <div className='addPhoto'>
                    <label>
                        <input
                            type="text"
                            placeholder="Enter New Photo URL"
                            value={newPhotoUrl}
                            onChange={(e) => setNewPhotoUrl(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter New Photo Title"
                            value={newPhotoTitle}
                            onChange={(e) => setNewPhotoTitle(e.target.value)}
                        />
                        <button onClick={() => addPhotoToAlbum()}>
                            Add Photo
                        </button>
                    </label>
                </div>
            </div>
            <br /><br />


            {loading ? (
                <p>Loading photos...</p>
            ) : (
                <>
                    {photosData.length === 0 ? (
                        <p>No photos found for this album.</p>
                    ) : (
                        <div>
                            <div className='photos'>
                                {photosData.map((photo,key) => (
                                    <div key={key}>
                                        <img src={photo.thumbnailUrl} alt={photo.title} />

                                        {showEditFields[photo.id] ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editedTitles[photo.id] || photo.title}
                                                    onChange={(e) => handleTitleChange(photo.id, e.target.value)}
                                                />
                                                <button onClick={() => saveEditedTitle(photo.id)}>Save</button>
                                            </>
                                        ) : (
                                            <>
                                                <p>{photo.title}</p>
                                                <button className='photoDeleteBtn' onClick={() => deletePhoto(photo.id)}>❌</button>
                                                <button className='photoEditBtn' onClick={() => toggleEditField(photo.id)}>✏️</button>

                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className='pagesBtn'>
                                <button onClick={loadPrevPhotos} disabled={currentPage === 1}>
                                    Previous Page
                                </button>
                                <p>
                                    Page {currentPage} of {totalPages}
                                </p>
                                <button onClick={loadMorePhotos} disabled={currentPage === totalPages}>
                                    Next Page
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default AlbumDetails;
