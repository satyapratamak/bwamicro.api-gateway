const jwt = require('jsonwebtoken');
const apiAdapter = require('../../apiAdapter');
const {URL_SERVICE_USER, 
JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;


const api = apiAdapter(URL_SERVICE_USER);


module.exports = async (req, res) => {

    try {
        const refreshToken = req.body.refresh_token;
        const email = req.body.email;

        if (!refreshToken || !email) {
            return res.status(400).json({
                status : 'Error',
                message : `Invalid refresh token`,
            });
        }

        // check refresh token in Database
        await api.get('/refresh_tokens', { params : {refresh_token : refreshToken}} );
    
        await jwt.verify(refreshToken,JWT_SECRET_REFRESH_TOKEN,  (err, decoded) => {

            if(err){
                return res.status(403).json({
                    status : 'Error', 
                    message : err.message,
                })
            }

            // check email
            if (email !== decoded.data.email){
                return res.status(400).json({
                    status : 'Error',
                    message : `Email is not valid`,
                });
            }

            // valid Email
            const token = jwt.sign({data : decoded.data}, JWT_SECRET, {expiresIn: JWT_ACCESS_TOKEN_EXPIRED});

            return res.json({
                status : 'Success',
                data : {token},
            });

        });
    }catch(error){

        if (error.code === 'ECONNREFUSED'){
            return res.status(500).json({
                status : 'error',
                message : 'service unavailable'
            });
        }

        const {status, data} = error.response;
        return res.status(status).json(data);
        


    }

    // await api.post(`/users/register`, req.body)
    // .then(function (response) {
    //     return res.json(response.data);
    // })
    // .catch(function (error) {
    //     if (error.response) {

    //         console.log(error.response);

    //         if (error.response.status == 500){
    //             return res.status(error.response.status).json({
    //                 message : 'service unavailable',
    //             });
    //         }

    //         if (error.response.status == 400){
    //             return res.status(error.response.status).json({
    //                 message : error.response.message,
    //             });
    //         }
            
    //         return res.status(error.response.status).json({
    //             message : error.message,
    //             tag : 'res.status(error.response.status)'
    //         });

        
    //     } else if (error.request) {
    //         // The request was made but no response was received
    //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //         // http.ClientRequest in node.js
            
    //         return res.status(700).json({
    //             message : "The request was made but no response was received",
    //         });
    //     } else {
    //         // Something happened in setting up the request that triggered an Error
            
    //         return res.status(800).json({
    //             message : "Something happened in setting up the request that triggered an Error",
    //         });
            
    //     }
        
    // });
    
};
