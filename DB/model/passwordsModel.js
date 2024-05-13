const pool = require('../DB_JS');

async function getPasswords() {
    try {
        const sql = 'SELECT * FROM passwords';

        const [rows, fields] = await pool.query(sql);
        console.log(rows);

        return rows;
    } catch (err) {
        console.log(err);
    }

}

async function getPassword(id) {
    try {
        const sql = 'SELECT * FROM passwords where id=?';

        const result = await pool.query(sql, [id]);

        return result[0][0];

    } catch (err) {
        console.log(err);
    }
}


async function createPassword(user_id, password) {
    try {
      const sql = "INSERT INTO passwords (`user_id`, `password`) VALUES(?, ?)";
  
      const result = await pool.query(sql,[user_id, password]);
  
      return result[0];
  
    } catch (err) {
      console.log(err);
    }
  }
  async function deletePassword(id) {
    try {
      const sql = `DELETE FROM passwords WHERE id = ?`;
      const result = await pool.query(sql, [id]);
    } catch (err) {
      console.error('Error deleting password:', err);
      throw err;
    }
  }
  async function updatePassword(id, password)  {
    try {
      const sql = `UPDATE passwords SET password = ? WHERE id = ?`;
      const result = await pool.query(sql, [password, id]);
      return result;
    } catch (err) {
      console.error('Error updating password:', err);
      throw err;
    }
  }



module.exports = { getPasswords, getPassword, createPassword, deletePassword, updatePassword }