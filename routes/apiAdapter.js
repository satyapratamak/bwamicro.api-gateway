const axios = require('axios');
const {TIMEOUT} = process.env;

module.exports = (baseUrl) =>{
    axios.defaults.baseURL = baseUrl;
    return axios.create({        
        timeout: parseInt(TIMEOUT), // datatype of variable that gerenate from .env is String. So should convert to Integer
    });
}