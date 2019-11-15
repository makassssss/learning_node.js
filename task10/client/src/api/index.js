import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';

const error = (err) => console.log(err);
const apiCall = (url, method = 'GET', data) => {
    return axios({
        method,
        url,
        data,
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
        .then(res => res.data)
        .catch(error)
};

export default apiCall;
