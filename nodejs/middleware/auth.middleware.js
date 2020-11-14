const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
    guard: async (req, res, next) => {
        let token;
        try {
            if (req.cookies.token) {
                token = req.cookies.token;
            }
            if (!token) {
                const error = new Error('Bạn cần phải đăng nhập');
                error.status = 401;
                throw error;
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id);
            req.user = user;

            next();
        } catch (error) {
            next(error);
        }
    }
};


// const jwtHelper = require('../utils/jwt.helper');

// const accessTokenSecret =
//   process.env.ACCESS_TOKEN_SECRET || 'super-secret-superman-secret-my-blog';

// module.exports = async (req, res, next) => {
//   const authHeader = req.get('Authorization');
//   if (!authHeader) {
//     const error = new Error('Not authenticated.');
//     error.statusCode = 401;
//     throw error;
//   }
//   const token = authHeader.split(' ')[1];
//   let decodeToken;
//   try {
//     decodeToken = await jwtHelper.decodeJWT(token, accessTokenSecret);
//   } catch (error) {
//     err.statusCode = 500;
//     throw err;
//   }
//   if (!decodedToken) {
//     const error = new Error('Not authenticated.');
//     error.statusCode = 401;
//     throw error;
//   }
//   req.payload = decodeToken;
//   next();
// };
