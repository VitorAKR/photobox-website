const auth = "*** Your Key ***";
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const more = document.querySelector('.more');
let searchValue;
let page = 1;
let fetchLink;
let currentSearch;

searchInput.addEventListener("input", updateInput);
more.addEventListener("click", loadMore);
//pass the search query to the function
form.addEventListener('submit', (e)=>{
    //avoid the refresh page
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
})


//function to get the value inside search input
function updateInput(e){
    //just log what it's typed in the input
    //console.log(e.target.value);
    searchValue = e.target.value;
}

async function loadMore(){
    //this function will increase the pagination 
    page++;
    //verify if you're searching for more photos or requesting more curated photos
    if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
    }else{
        fetchLink = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
    }
    //just pass the new link to the function
    const data = await fetchApi(fetchLink);
    generatePictures(data);

}

//refactoing by creating 2 standard functions
async function fetchApi(url){
    const dataFetch = await fetch(url,
    {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });
    //passing this to a JSON e return it
    const data = await dataFetch.json();
    //console.log(data); //to see bunch of infos on json
    return data;
}

function generatePictures(data){
    //loop over the photos from data
    data.photos.forEach(photo => {
        //console.log(photo); //to see the resource of a photo
        //generate a div for each photo with classname
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        //put the source image inside of <img> tags
        galleryImg.innerHTML = `<img src=${photo.src.large}></img>
        <div class="gallery-info">
        <p><b>Photographer:</b> ${photo.photographer}</p>
        <b><a href="${photo.src.large}">Download</a></b>
        </div>
        `;
        gallery.appendChild(galleryImg);
        //photo.src.original vai na tag a (esta com problemas)
    });
}

//create a function to clear the other images out of the search
function clear(){
    gallery.innerHTML = "";
    searchValue.value = '';
}

//function to fetch some curated photos from pexels
async function curatedPhotos(){
    fetchLink = "https://api.pexels.com/v1/curated?page=5&per_page=15";
    const data = await fetchApi(fetchLink);
    generatePictures(data);    
}

//function to fetch some curated photos from the query term used in a search
async function searchPhotos(query){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=5`
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

curatedPhotos();
