import axios from "axios";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import Notiflix from "notiflix";

axios.defaults.headers.common["x-api-key"] =
"live_2hjDRbkow5Awcj03ssO9FogJTsSIFE3B5S49HzYcHRhZpHlGvkGV2Vewj7CPtLNL";

const refs = {
    select: document.querySelector('.breed-select'),
    cardCat: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
}

refs.loader.style.display ='none';
refs.error.style.display ='none';
//refs.cardCat.style.display ='none';

let arrBreedsId = [];

fetchBreeds()
    .then(data => { 
        console.log(data);
        data.forEach(element => {
            arrBreedsId.push({ text: element.name, value: element.id })
        });
        new SlimSelect({
            select: refs.select,
            // Array of Option objects
            data: arrBreedsId,
        })
    })
    .catch(err => console.log(err))
   


refs.select.addEventListener('change', breedsSearch)

function breedsSearch(evt) {

    const  breedId = evt.currentTarget.elements;
      

fetchCatByBreed(breedId)
    .then(data => {
       
       
        refs.cardCat.insertAdjacentHTML('beforebegin', createMarkup(data))
        
       
        refs.cardCat.style.display = 'block';
})
.catch(err => console.log(err))
}


 function createMarkup(arr) {
     return arr.map(({ url, breeds: { name, description, temperament } }) => {
        `<div class="box-img">
        <img src="${url}" alt="${name}" width="400"/>
        </div>
        <div class="box">
        <h1>${name}</h1>
        <p>${description}</p>
        <p> ${temperament}</p>
        </div>`
    }).join('');

}

