import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { serverRequests } from '../Api';

function Albums() {

  const UserData = useContext(UserContext);
  const [userAlbums, setUserAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [newAlbumTitle, setNewAlbumTitle] = useState('');

  useEffect(() => {
    if (UserData.id) {
      const fetchUserAlbums = async () => {
        try {
          serverRequests('GET', `albums?user_id=${UserData.id}`, null).then((albumsData) => {
            setUserAlbums(albumsData);
            setFilteredAlbums(albumsData);
          })
        } catch (error) {
          console.error('Error fetching user albums:', error);
        }
      };
      fetchUserAlbums();
    }
  }, [UserData.id]);

  const searchHandle = (e) => {
    const updatedSearchTerm = e.target.value;
    setSearchTerm(updatedSearchTerm);

    if (updatedSearchTerm === '') {
      setFilteredAlbums(userAlbums);
    } else {
      const filtered = userAlbums.filter((album) =>
        album.id.toString().includes(updatedSearchTerm) || album.title.includes(updatedSearchTerm)
      );
      setFilteredAlbums(filtered);
    }
  };


  const handleCreateAlbum = async () => {
    
    const newAlbum = {
      user_id: UserData.id,
      title: newAlbumTitle
    }

    try {
      serverRequests('POST', 'albums', newAlbum).then((response) => {
        setUserAlbums((prevAlbums) => [...prevAlbums, response]);
        alert(`New album with ID: ${response.id} has been created!`)
        setNewAlbumTitle('');
      })
    } catch (error) {
      console.error('Error creating album:', error);
    }
  };

  return (
    <div className="albums-container">
      <h1 className='album-header'>{UserData.username}'s albums 📷</h1>
      <br />
      <div className='searchSection'>
        <input
          type="text"
          placeholder="Search by ID or Title"
          value={searchTerm}
          onChange={searchHandle}
        />
      </div>
      <br />
      <div className="searchSection">
        <input
          type="text"
          placeholder="Enter new album title"
          value={newAlbumTitle}
          onChange={(e) => setNewAlbumTitle(e.target.value)}
        />
        <button className="create-album-button" onClick={handleCreateAlbum}>Create</button>
      </div>
      <br />
      <br />
      {filteredAlbums.length === 0 ? (
        <p>No matching albums found.</p>
      ) : (
        <>
          {filteredAlbums.map((album) => (
            <div key={album.id} className='album-items'>
              <Link to={`/home/users/${UserData.id}/albums/${album.id}/photos`}>
                <p className="album-id">ID: {album.id}</p>
                <p className="album-title">Title: {album.title}</p>
                <br />
              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Albums;
