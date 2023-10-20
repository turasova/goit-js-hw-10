import axios from "axios"; 

//axios.defaults.headers.common["x-api-key"] =
//"live_2hjDRbkow5Awcj03ssO9FogJTsSIFE3B5S49HzYcHRhZpHlGvkGV2Vewj7CPtLNL";

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_2hjDRbkow5Awcj03ssO9FogJTsSIFE3B5S49HzYcHRhZpHlGvkGV2Vewj7CPtLNL';
const option = {
  headers: {
    'x-api-key': API_KEY,
  },
}

export function fetchBreeds() {
 
    return fetch(`${BASE_URL}/breeds`)
        .then(resp => {
          console.log(resp);
        if (!resp.ok) {
            throw new Error(resp.statusText || 'Примусово прокидаємо в catch');
            }
            return resp.json()

        })
    
}

export function fetchCatByBreed( breedId) {

   return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`, option)
        .then(resp => {
          console.log(resp);
        if (!resp.ok) {
            throw new Error(resp.statusText || 'Примусово прокидаємо в catch');
            }
            return resp.json()

        })
    
}
