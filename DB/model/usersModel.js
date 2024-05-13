const pool = require('../DB_JS');

async function getUsers() {
    try {
        const sql = 'SELECT * FROM users NATURAL JOIN addresses';
        const result = await pool.query(sql);
        return result[0][0];
    } catch (err) {
        console.log(err);
    }

}

async function getByQuery(query) {
    try {
        const sql = 'SELECT * FROM users where ?';
  
        const [rows, fields] = await pool.query(sql,[query]);
        console.log(rows);
  
        return rows;
    } catch (err) {
        console.log(err);
    }
  
  }

async function getUser(id) {
    try {
        console.log(id)
        const sql = 'SELECT * FROM users  where id=?';
        const result = await pool.query(sql, [id]);
        console.log(result)
        return result[0];
    } catch (err) {
        console.log(err);
    }
}



async function getByUsername(username) {
    try {
        const sql = 'SELECT * FROM users natural join addresses where username=? ';
        const result = await pool.query(sql, [username]);
        return result[0][0];
    } catch (err) {
        console.log(err);
    }
}

async function getPassword(userId) {
    try {
        const sql = 'SELECT * FROM passwords where id=? ';
        const result = await pool.query(sql, [userId]);
        return result[0][0];
    } catch (err) {
        console.log(err);
    }
}

async function createUser(username, password) {
    try {
        const sql = "INSERT INTO users (`username`) VALUES(?)";
        const result = await pool.query(sql, [username]);
        console.log("resu",result[0][0],result[0])
        const userId = result[0].insertId;

        const sql1 = "INSERT INTO addresses (`id`) VALUES(?)";
        await pool.query(sql1, [userId]);

        const sql2 = "INSERT INTO passwords (`id`, `password`) VALUES(?, ?)";
        await pool.query(sql2, [userId, password]);

        return userId; 

    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function deleteUser(id) {
    try {
       
        const sql1 = `DELETE FROM passwords WHERE id = ?`;
        await pool.query(sql1, [id]);

        const sql2 = `DELETE FROM addresses WHERE id = ?`;
        await pool.query(sql2, [id]);

        const sql = `DELETE FROM users WHERE id = ?`;
        await pool.query(sql, [id]);


    } catch (err) {
        console.error('Error deleting user:', err);
        throw err;
    }
}

async function updateUser(id, name, email, street, city, phone) {
    try {
        const sql = `UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?`;
        await pool.query(sql, [name, email, phone, id]);

        const sql1 = `UPDATE addresses SET street = ?, city = ? WHERE id = ?`;
        await pool.query(sql1, [street, city, id]);

        const sql2 = 'SELECT * FROM users natural join addresses where id=? ';
        const result = await pool.query(sql2, [id]);
        console.log("r",result)
        return result[0];

    } catch (err) {
        console.error('Error updating user:', err);
        throw err;
    }
}



module.exports = { getUsers, getUser, createUser, deleteUser, updateUser, getByUsername ,getPassword,getByQuery}