import axios from 'axios'

const getBaseUrl = function(){
    return 'https://boiling-thicket-13924.herokuapp.com/v1/';
    // return 'http://localhost:9000/v1/'
};

const axiosDefaults = {
    baseURL: getBaseUrl(),
    timeout: 60000,
    withCredentials: true
};

const core = {
    locale: 'ru',
    localStorage: {
        name: 'easy_dev.session'
    },

    notification: {
        errorTime: 5000,
        successTime: 3000
    },


    api: {
        axiosDefaults,

        axiosConfig( params ){

            const { eo_token } = params;

            const headers = {
                Authorization: `Token token=${eo_token}`,
                Source: 'ui'
            };

            // console.log('API: ', {...axiosDefaults, headers});

            return {...axiosDefaults, headers}
        }
    }
}


const createAxiosInstance = function( config = {} )  {


    const eo_token = '100';
    const source = 'ui';

    const axiosConfig = core.api.axiosConfig({eo_token, source});

    return axios.create(axiosConfig)
}

export { createAxiosInstance, getBaseUrl }