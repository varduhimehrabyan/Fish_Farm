const jwt = require('jsonwebtoken');
const secret = '39442051e92c051c27790d9552812efc88239532';

const createToken = function(res, mail, id, typeId) {
    try {
        const token = jwt.sign({ mail: mail, id: id, typeId: typeId }, secret);
        console.log("token: ", token);
         res.cookie('token', token, {
            httpOnly: true,
            });
    } catch(err) {
        console.log(err);
    }
}

module.exports = createToken;