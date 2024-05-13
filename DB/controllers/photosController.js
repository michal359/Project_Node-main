const model = require('../model/photosModel');

async function create(album_id, title, url, thumbnailUrl){
    try{
        return model.createPhoto(album_id, title, url, thumbnailUrl);
    }catch(err){
        throw err;
    }
    
}
async function getAll(){
    try{
        return model.getPhotos();
    }catch(err){
        throw err;
    }
}

async function getById(id){
    try{
        return model.getPhoto(id);
    }catch(err){
        throw err;
    }
}

async function deletePhoto(id){
    try{
        return model.deletePhoto(id);
    }catch(err){
        throw err;
    }
}

async function update(id, title, url, thumbnailUrl){
    try{
        return model.updatePhoto(id, title, url, thumbnailUrl);
    }catch(err){
        throw err;
    }
}

module.exports = {create, getAll, getById, deletePhoto, update}