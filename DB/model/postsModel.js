const pool = require('../DB_JS');

async function getPosts() {
    try {
        const sql = 'SELECT * FROM posts';

        const [rows, fields] = await pool.query(sql);
        console.log(rows);

        return rows;
    } catch (err) {
        console.log(err);
    }

}
async function getByQuery(query) {
  try {
      const sql = 'SELECT * FROM posts where ?';

      const [rows, fields] = await pool.query(sql,[query]);
      console.log(rows);

      return rows;
  } catch (err) {
      console.log(err);
  }

}
async function getPost(id) {
    try {
        const sql = 'SELECT * FROM posts where id=?';

        const result = await pool.query(sql, [id]);

        return result[0][0];

    } catch (err) {
        console.log(err);
    }
}
async function createPost(user_id, title, body) {
    try {
      const sql = "INSERT INTO posts (`user_id`, `title`, `body`) VALUES(?, ?, ?)";
      ;
  
      const result = await pool.query(sql,[user_id, title, body]);
  
      return result[0];
  
    } catch (err) {
      console.log(err);
    }
  }
  async function deletePost(id) {
    try {
      const sql = `DELETE FROM comments WHERE post_id= ?`;
      const result = await pool.query(sql, [id]);
      const sql1 = `DELETE FROM posts WHERE id = ?`;
      const result1 = await pool.query(sql1, [id]);
    } catch (err) {
      console.error('Error deleting post:', err);
      throw err;
    }
  }
  async function updatePost(id, title, body)  {
    try {
      const sql = `UPDATE posts SET title = ?, body = ? WHERE id = ?`;
      const result = await pool.query(sql, [title, body, id]);
      return result;
    } catch (err) {
      console.error('Error updating post:', err);
      throw err;
    }
  }



module.exports = { getPosts, getPost, createPost, deletePost, updatePost ,getByQuery}