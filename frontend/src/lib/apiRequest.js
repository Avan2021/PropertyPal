import axios from "axios";
axios.defaults.withCredentials = true;

const apiRequest = axios.create({
    baseURL: "https://propertypal-wbh0.onrender.com/api",
    withCredentials: true,
});

// Add request interceptor
apiRequest.interceptors.request.use(
    (config) => {
        console.log('Making request to:', config.url);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor
apiRequest.interceptors.response.use(
    (response) => {
        console.log('Response received:', response.status);
        return response;
    },
    (error) => {
        console.error('Response error:', {
            status: error.response?.status,
            message: error.message,
            data: error.response?.data
        });
        return Promise.reject(error);
    }
);

export default apiRequest;