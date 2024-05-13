const model = require('../model/albumsModel');

async function create(user_id,title){
    try{
        return model.createAlbum(user_id,title);
    }catch(err){
        throw err;
    }
    
}
async function getAll(){
    try{
        return model.getAlbums();
    }catch(err){
        throw err;
    }
}

async function getById(id){
    try{
        return model.getAlbum(id);
    }catch(err){
        throw err;
    }
}

async function deleteAlbum(id){
    try{
        return model.deleteAlbum(id);
    }catch(err){
        throw err;
    }
}

async function update(id, title){
    try{
        return model.updateAlbum(id, title);
    }catch(err){
        throw err;
    }
}

module.exports = {create, getAll, getById, deleteAlbum, update}