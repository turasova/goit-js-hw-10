
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from "notiflix";
import './style.css'
import { fetchBreeds, fetchCatByBreed } from './cat-api';



const refs = {
    select: document.querySelector('.breed-select'),
    cardCat: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};

fetchBreeds()
    .then(data => {
    let markup = data.map(
      ({ id, name }) => `<option value="${id}">${name}</option>`
    );
    markup.unshift(`<option data-placeholder="true"></option>`);
    refs.select.innerHTML = markup;
    new SlimSelect({
      select: refs.select,
      settings: {
        placeholderText: 'Select cat breed',
      },
    });
    refs.select.classList.remove('is-hidden');
  })
  .catch(fetchError)
  .finally(() => {
    refs.loader.classList.add('is-hidden');
  });

refs.select.addEventListener('change', onBreedsSearch);

function onBreedsSearch(evt) {

        Notiflix.Loading.hourglass(
                'Loading data, please wait...',{
           clickToClose: true,
           svgSize: '50px',
           });
            
  refs.cardCat.classList.add('is-hidden');

    const breedId = evt.currentTarget.value;

   console.log(breedId);

   fetchCatByBreed(breedId)
        .then(data => {
            //console.log(data)
            Notiflix.Loading.remove();
           
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
    //refs.select.classList.add('is-hidden');

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
