const {getUserQuery} = require('../../db/config.js');
const {comparePassword, sendEmail} =  require("../service/auth.js");


//User Log out
async function login (request, response) {
    const {username, password} = request.body;
    console.log('in login user,', [username, password])
    res = await getUserQuery(username);
    console.log('in controller-get User',res);
    if (res.length > 0) {
        let pwd = res[0].password;
        let compare = await comparePassword (password, pwd);
        console.log ('compare', compare)
        if  (compare) {
            response.status(200).send({message: 'login sucessfully', data :res[0]}); 
        } 
        else {
            response.status(401).send({message: 'Invaild Password', data: null});
        }
    }
        else {
            response.status(401).send({message: 'Invaild Username', data: null});
        }
}

// send the email for password reset
async function sendResetPasswordEmail (request, response) {
    const {email} = request.body;
    console.log('in sendResetPasswordEmail', email )
    try {
        let user = await getUserQuery(email);
        console.log ('user',user)
        if (user.length > 0) {
        res = await sendEmail(email);
        response.status(200).send({message: 'Email Sent', data: null })
        }
        else {
            response.status(401).send({message: 'Invaild Email', data: null });
        }
    }

    catch (err){
        response.status(500).send({message: 'Internal Server Error', data: null });
    }
    }

module.exports = {login,sendResetPasswordEmail };
