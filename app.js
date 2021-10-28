const auth = "*** Your Key ***";
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const submitButton = document.querySelector('.submit-btn');
let searchValue;

//create a function to fetch some curated photos from pexels
async function curatedPhotos(){
    const dataFetch = await fetch("https://api.pexels.com/v1/curated?per_page=15&page=1", 
    {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });

    const data = await dataFetch.json();
    //console.log(data); //to see bunch of infos on json
    //loop over the photos
    data.photos.forEach(photo => {
        console.log(photo);
        //generate a div for each photo with classname
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        //put the source image inside of <img> tags
        galleryImg.innerHTML = `<img src=${photo.src.large}></img>
        <p>${photo.photographer}</p>
        `;
        gallery.appendChild(galleryImg);
    });
}

curatedPhotos();