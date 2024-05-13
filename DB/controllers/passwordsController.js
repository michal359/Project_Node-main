const model = require('../model/passwordsModel');

async function create(name, price, description){
    try{
        return model.createToy(name, price, description);
    }catch(err){
        throw err;
    }
    
}
async function getAll(){
    try{
        return model.getPasswords();
    }catch(err){
        throw err;
    }
}

async function getById(id){
    try{
        return model.getPassword(id);
    }catch(err){
        throw err;
    }
}

// async function deletePassword(id){
//     try{
//         return model.deletePassword(id);
//     }catch(err){
//         throw err;
//     }
// }

module.exports = {create, getAll, getById}