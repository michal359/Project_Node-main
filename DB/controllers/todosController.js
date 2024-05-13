const model = require('../model/todosModel');

async function create(user_id, title, completed){
    try{
        return model.createTodo(user_id, title, completed);
    }catch(err){
        throw err;
    }
    
}
async function getAll(){
    try{
        return model.getTodos();
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
        return model.getTodo(id);
    }catch(err){
        throw err;
    }
}

async function deleteTodo(id){
    try{
        return model.deleteTodo(id);
    }catch(err){
        throw err;
    }
}


async function update(id, title, completed){
    try{
        return model.updateTodo(id, title, completed);
    }catch(err){
        throw err;
    }
}

module.exports = {create, getAll, getById, deleteTodo, update,getByQuery}