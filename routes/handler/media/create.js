const apiAdapter = require('../../apiAdapter');
const {URL_SERVICE_MEDIA} = process.env;


const api = apiAdapter(URL_SERVICE_MEDIA);
module.exports = async (req, res) => {


    try {
        const user = await api.post('/media', req.body);
        return res.json(user.data);
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

    // await api.post(`${URL_SERVICE_MEDIA}/media`, req.body)
    // .then(function (response) {
    //     return res.json(response.data);
    // })
    // .catch(function (error) {
    //     if (error.response) {

    //         if (error.response.status == 500){
    //             return res.status(error.response.status).json({
    //                 message : 'service unavailable',
    //             });
    //         }
            
    //         return res.status(error.response.status).json({
    //             message : error.message,
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