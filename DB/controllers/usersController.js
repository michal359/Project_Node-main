const express = require("express");
const model = require('../model/usersModel');
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const router = express.Router();
const cors = require('cors');
router.use(cors());
async function create(username, password) {
    try {
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        console.log(hashedPassword);
        return model.createUser(username, hashedPassword);
    } catch (err) {
        throw err;
    }

}

async function login(username, password) {
    try {
        const user = await model.getByUsername(username);
        if (!user) {
            throw new Error('User not exist');
        } else {
            const passwordUser = await model.getPassword(user.id);
            // if (password == passwordUser.password) {
            //     return user;
            // }
            // else {
            //     throw new Error('Passwords are not matching');
            // }
            console.log("pas",passwordUser)
            const response=bcrypt.compare(password,passwordUser.password)
                if(response)
                {
                    console.log("u",user)
                    return user;
                }else{
                    throw new Error('Passwords are not matching');
                }
           

        }
    } catch (err) {
        throw err;
    }

}

async function getAll() {
    try {
        return model.getUsers();
    } catch (err) {
        throw err;
    }
}

async function getByQuery(query) {
    try {
        return model.getByQuery(query);
    } catch (err) {
        throw err;
    }
}

async function getById(id) {
    try {
        return model.getUser(id);
    } catch (err) {
        throw err;
    }
}

async function deleteUser(id) {
    try {
        return model.deleteUser(id);
    } catch (err) {
        throw err;
    }
}


async function update(id, name, email, street, city, phone) {
    try {
        return model.updateUser(id, name, email, street, city, phone);
    } catch (err) {
        throw err;
    }
}
module.exports = { create, getAll, getById, deleteUser, update, login, getByQuery }