import axios from "axios";
const APIKEY = "f8465d28"; // Poné tu APIKEY
const BASE_URL = "http://www.omdbapi.com/";

const OMDBSearchByPage = async (searchText, page) => {
    const response = await axios.get(`${BASE_URL}?apikey=${APIKEY}&s=${searchText}&page=${page}`);
    return {
        respuesta: response.data.Response === "True",
        cantidadTotal: response.data.totalResults ? parseInt(response.data.totalResults, 10) : 0,
        datos: response.data.Search || []
    };
};

const OMDBSearchComplete = async (searchText) => {
    let returnObject = {
        respuesta: false,
        cantidadTotal: 0,
        datos: []
    };
    
    let page = 1;
    while (true) {
        const response = await axios.get(`${BASE_URL}?apikey=${APIKEY}&s=${searchText}&page=${page}`);
        if (response.data.Response !== "True") break;
        
        returnObject.respuesta = true;
        returnObject.cantidadTotal = parseInt(response.data.totalResults, 10);
        returnObject.datos.push(...response.data.Search);
        
        if (returnObject.datos.length >= returnObject.cantidadTotal) break;
        page++;
    }
    
    return returnObject;
};

const OMDBGetByImdbID = async (imdbID) => {
    const response = await axios.get(`${BASE_URL}?i=${imdbID}&apikey=${APIKEY}`);
    return {
        respuesta: response.data.Response === "True",
        datos: response.data.Response === "True" ? response.data : {}
    };
};

export { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID };