const jwt = require('jsonwebtoken');

const getEmail = (token) => {
    try {
        const decoded = jwt.decode(token, process.env.SECRET);
        return decoded.email;
    } catch (err) {
        console.log(err);
        return;
    }
}

module.exports = getEmail;