const model = require('../model/commentsModel');

async function create(post_id, name, email, body){
    try{
        return model.createComment(post_id, name, email, body);
    }catch(err){
        throw err;
    }
    
}
async function getAll(){
    try{
        return model.getComments();
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
        return model.getComment(id);
    }catch(err){
        throw err;
    }
}

async function deleteComment(id){
    try{
        return model.deleteComment(id);
    }catch(err){
        throw err;
    }
}


async function update(id, body,name){
    try{
        return model.updateComment(id, body,name);
    }catch(err){
        throw err;
    }
}

module.exports = {create, getAll, getById, deleteComment, update,getByQuery}