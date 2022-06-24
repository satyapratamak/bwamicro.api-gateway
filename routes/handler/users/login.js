const apiAdapter = require('../../apiAdapter');
const {
    URL_SERVICE_USER,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;
const jwt = require('jsonwebtoken');


const api = apiAdapter(URL_SERVICE_USER);


module.exports = async (req, res) => {

    try {
        const user = await api.post('/users/login', req.body);

        const data = user.data.data;

        const token = jwt.sign({data : data}, JWT_SECRET, {expiresIn : JWT_ACCESS_TOKEN_EXPIRED});
        const refreshToken = jwt.sign({data : data}, JWT_SECRET_REFRESH_TOKEN, {expiresIn : JWT_REFRESH_TOKEN_EXPIRED});
        
        await api.post("/refresh_tokens", {user_id : data.id, refresh_tokens : refreshToken});
        
        return res.json({
            status:"success",
            data : {
                token,
                refreshToken,
            }
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