const pool = require('../DB_JS');

async function getPhotos() {
    try {
        const sql = 'SELECT * FROM photos';

        const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (err) {
        console.log(err);
        throw err;
    }

}

async function getByQuery(query) {
  try {
      const sql = 'SELECT * FROM photos where album_id=?';
      const [rows, fields] = await pool.query(sql,[query.album_id]);

      return rows;
  } catch (err) {
      console.log(err);
      throw err;
  }

}

async function getPhoto(id) {
    try {
        const sql = 'SELECT * FROM photos where id=?';

        const result = await pool.query(sql, [id]);

        return result[0][0];

    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function createPhoto(album_id, title, url, thumbnailUrl) {
    try {
      const sql = "INSERT INTO photos (`album_id`, `title`,`url`, `thumbnailUrl`) VALUES(?, ?, ?, ?)";
  
      const result = await pool.query(sql,[album_id, title, url, thumbnailUrl]);
  
      return result[0];
  
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async function deletePhoto(id) {
    try {
      const sql = `DELETE FROM photos WHERE id = ?`;
      const result = await pool.query(sql, [id]);
    } catch (err) {
      console.error('Error deleting photo:', err);
      throw err;
    }
  }
  async function updatePhoto(id, title, url, thumbnailUrl)  {
    try {
      const sql = `UPDATE photos SET title = ?, url = ?, thumbnailUrl = ? WHERE id = ?`;
      const result = await pool.query(sql, [title, url, thumbnailUrl, id]);
      return await getPhoto(id);    
    } catch (err) {
      console.error('Error updating photo:', err);
      throw err;
    }
  }



module.exports = { getPhotos, getPhoto, createPhoto, deletePhoto, updatePhoto,getByQuery }