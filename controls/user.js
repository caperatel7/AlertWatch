const {getUsersQuery, getUserQuery, deleteUserQuery, createUserQuery, updatePasswordQuery, updateUserQuery  } = require('../../db/config.js');
const {hashPassword} = require("../service/auth.js");
const jwt = require ('jsonwebtoken');


// get all users
async function allUsers (request, response) {
    res = await getUsersQuery();
    console.log('in controller-get User',res);
    response.send(res);
    
  }
//get user by id
async function getUserById (request, response) {
    res = await getUser(request.params.id);
    console.log('in controller-get User',res);
    response.send(res);
}
//delete user by id
async function deleteUserById (request, response) {
    res = await deleteUser(request.params.id);
    console.log('in controller-delete User',res);
    response.send(res);
}
//create user
async function createUser (request, response) {
    const {username, password, display_name, privilege} = request.body;
    console.log('in create user ,', [password])
    let hashpwd = await hashPassword(password);
    console.log('after hash', hashpwd)
    try {
        res = await createUserQuery(username, hashpwd, display_name, privilege);
    console.log('in controller-create User',res);
    response.send(res);
    }
    catch (err) {
        console.log('err in create user', err)
        response.send(err)
    }
    
}
//update user password
async function updateUserPassword (request, response) {
    const {username, password, token} = request.body;

    console.log('token is', token)

    try{
        jwt.verify(token, 'alertwatch');
    
    let hashpwd = await hashPassword(password);
    res = await updatePasswordQuery(username, hashpwd);
    console.log('in controller-update User', res);
    response.send(res);
    }
    catch (err){
        console.log('c',err)
        return response.status(401).send({message: 'Invaiid Request', "error": err })
     
    }
}
//update user
async function updateUser (request, response) {
    const {username, display_name, privilege} = request.body;
    res = await updateUserQuery(username, display_name, privilege);
    console.log('in controller-update User',res);
    response.send(res);
}

module.exports = { allUsers, getUserById, deleteUserById, createUser, updateUserPassword, updateUser };
