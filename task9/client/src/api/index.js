import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
const error = (err) => console.log(err);
const apiCall = (url, method = 'GET', data, auth = false) => {
    return axios({
        method,
        url: auth ? url : `/api/${url}`,
        data,
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
        .then(res => res.data)
        .catch(error)
};

export default apiCall;
