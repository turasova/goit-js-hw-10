
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import Notiflix from "notiflix";
import './style.css'



const refs = {
    select: document.querySelector('.breed-select'),
    cardCat: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
}

refs.loader.classList.replace('loader', 'is-hidden');
refs.cardCat.classList.add('is-hidden');
refs.error.style.display = 'none';



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
    .catch(fetchError)
   


refs.select.addEventListener('change', breedsSearch)

function breedsSearch(evt) {
        Notiflix.Loading.hourglass(
                'Loading data, please wait...',{
           clickToClose: true,
           svgSize: '50px',
           });
            
            

   //refs.loader.classList.replace('is-hidden', 'loader');
    refs.cardCat.classList.add('is-hidden');
     refs.select.style.display = 'block';



    const breedId = evt.currentTarget.value;

   console.log(breedId);

    fetchCatByBreed(breedId)
        .then(data => {
            //console.log(data)
             Notiflix.Loading.remove();
            refs.loader.classList.replace('loader', 'is-hidden');
            refs.select.classList.remove('is-hidden');
          
       
            refs.cardCat.innerHTML = createMarkup(data);
            refs.cardCat.classList.remove('is-hidden');
            
            
        }
        )
  
        .catch(fetchError);
}


function createMarkup(obj) {
     
    const img = obj[0].url;

    const { name, description, temperament } = obj[0].breeds[0];

    return `<div class="box-img">
        <img src="${img}" alt="${name}" width="400"/>
        </div>
        <div class="box">
        <h1>${name}</h1>
        <p>${description}</p>
        <b>Temperament:</b>
        <p> ${temperament}</p>
        </div>`
}

function fetchError() {
    refs.select.classList.add('is-hidden');

Notiflix.Report.failure(
  'Error',
  'Oops! Something went wrong! Try reloading the page or select another cat breed!',
  'OK',
  {
    width: '360px',
    svgSize: '120px',
  },
);
}

