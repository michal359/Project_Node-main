const pool = require('../DB_JS');

async function getTodos() {
    try {
        const sql = 'SELECT * FROM todos';

        const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (err) {
        console.log(err);
        throw err;
    }

}
async function getByQuery(query) {
  try {
      const sql = 'SELECT * FROM todos where ?';

      const [rows, fields] = await pool.query(sql,[query]);

      return rows;
  } catch (err) {
      console.log(err);
      throw err;
  }

}
async function getTodo(id) {
    try {
        const sql = 'SELECT * FROM todos where id=?';
        const result = await pool.query(sql, [id]);
        return result[0][0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}
async function createTodo(user_id, title, completed) {
    try {
      const sql = "INSERT INTO todos (`user_id`, `title`, `completed`) VALUES(?, ?, ?)";
      const result = await pool.query(sql,[user_id, title, completed]);
      return result[0];
    } catch (err) {
      console.log(err);
      throw err;
    }

  }
  async function deleteTodo(id) {
    try {
      const sql = `DELETE FROM todos WHERE id = ?`;
      const result = await pool.query(sql, [id]);
    } catch (err) {
      console.error('Error deleting todo:', err);
      throw err;
    }
  }
  async function updateTodo(id, title, completed)  {
    try {
      const sql = `UPDATE todos SET title = ?, completed = ? WHERE id = ?`;
      const result = await pool.query(sql, [title, completed, id]);
      return result;
    } catch (err) {
      console.error('Error updating todo:', err);
      throw err;
    }
  }



module.exports = { getTodos, getTodo, createTodo, deleteTodo, updateTodo,getByQuery }