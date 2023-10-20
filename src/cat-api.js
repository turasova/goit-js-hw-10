    const BASE_URL = 'https://api.thecatapi.com/v1';
    const API_KEY = 'live_2hjDRbkow5Awcj03ssO9FogJTsSIFE3B5S49HzYcHRhZpHlGvkGV2Vewj7CPtLNL';


export function fetchBreeds() {
 
    return fetch(`${BASE_URL}/breeds?x-api-key=${API_KEY}`)
        .then(resp => {
          console.log(resp);
        if (!resp.ok) {
            throw new Error(resp.statusText || 'Примусово прокидаємо в catch');
            }
            return resp.json()

        })
    
}

export function fetchCatByBreed(breedId) {
  
   return fetch(`${BASE_URL}/images/search?x-api-key=${API_KEY}&breed_ids=${breedId}`)
        .then(resp => {
          console.log(resp);
        if (!resp.ok) {
            throw new Error(resp.statusText || 'Примусово прокидаємо в catch');
            }
            return resp.json()

        })
    
}
