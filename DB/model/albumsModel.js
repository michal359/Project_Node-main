const pool = require('../DB_JS');

async function getAlbums() {
    try {
        const sql = 'SELECT * FROM albums';

        const [rows, fields] = await pool.query(sql);
        console.log(rows);

        return rows;
    } catch (err) {
        console.log(err);
    }

}

async function getAlbum(id) {
    try {
        const sql = 'SELECT * FROM albums where id=?';

        const result = await pool.query(sql, [id]);

        return result[0][0];

    } catch (err) {
        console.log(err);
    }
}

async function createAlbum(user_id,title) {
    try {
      const sql = "INSERT INTO albums (`user_id`, `title`) VALUES(?, ?)";
      ;
  
      const result = await pool.query(sql,[user_id,title]);
  
      return result[0];
  
    } catch (err) {
      console.log(err);
    }
  }
  async function deleteAlbum(id) {
    try {
      const sql = `DELETE FROM albums WHERE id = ?`;
      const result = await pool.query(sql, [id]);
    } catch (err) {
      console.error('Error deleting album:', err);
      throw err;
    }
  }
  async function updateAlbum(id, title)  {
    try {
      const sql = `UPDATE albums SET title = ? WHERE id = ?`;
      const result = await pool.query(sql, [title, id]);
      return result;
    } catch (err) {
      console.error('Error updating album:', err);
      throw err;
    }
  }



module.exports = { getAlbums, getAlbum, createAlbum, deleteAlbum, updateAlbum }