const model = require('../model/postsModel');

async function create(user_id, title, body){
    try{
        return model.createPost(user_id, title, body);
    }catch(err){
        throw err;
    }
    
}
async function getAll(){
    try{
        return model.getPosts();
    }catch(err){
        throw err;
    }
}
async function getByQuery(query){
    try{
        return model.getByQuery(query);
    }catch(err){
        throw err;
    }
}
async function getById(id){
    try{
        return model.getPost(id);
    }catch(err){
        throw err;
    }
}

async function deletePost(id){
    try{
        return model.deletePost(id);
    }catch(err){
        throw err;
    }
}

async function update(id, title, body){
    try{
        return model.updatePost(id, title, body);
    }catch(err){
        throw err;
    }
}

module.exports = {create, getAll, getById, deletePost, update,getByQuery}