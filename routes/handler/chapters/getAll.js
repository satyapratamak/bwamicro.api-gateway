const apiAdapter = require('../../apiAdapter');
const {URL_SERVICE_COURSE,
HOSTNAME} = process.env;


const api = apiAdapter(URL_SERVICE_COURSE);


module.exports = async (req, res) => {

    try {
        const chapters = await api.get('/api/chapters', {
            params : {...req.query,
            
        }
        });
        // const coursesData = courses.data;
        // const firstPage = coursesData.data.first_page_url.split('?').pop();
        // const lastPage = coursesData.data.last_page_url.split('?').pop();

        // coursesData.data.first_page_url = `${HOSTNAME}/courses?${firstPage}`;
        // coursesData.data.last_page_url = `${HOSTNAME}/courses?${lastPage}`;

        // if(coursesData.data.next_page_url){
        //     const nextPage = coursesData.data.next_page_url.split('?').pop();
        //     coursesData.data.next_page_url = `${HOSTNAME}/courses?${nextPage}`;
        // }

        // if(coursesData.data.prev_page_url){
        //     const prevPage = coursesData.data.prev_page_url.split('?').pop();
        //     coursesData.data.prev_page_url = `${HOSTNAME}/courses?${prevPage}`;
        // }

        // coursesData.data.path = `${HOSTNAME}/courses`;
        
        return res.json(chapters.data);
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
};