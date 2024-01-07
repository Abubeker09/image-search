const accessKey = 'RFapFrh1cylTnW95VRqVNPTN0UYmW2J0LUv9PyF3Bkg';

    let showMore = document.getElementById('show-more')

    let form = document.getElementById('search-form');
    let input = document.getElementById('search-input');
    let parentCont = document.querySelector('.content');

    let keyword = '';
    let page = 1;

    async function searchImages(){
      keyword = input.value;
      const url = `https://api.unsplash.com/search/collections?page=${page}&query=${keyword}&client_id=${accessKey}`;

      const response = await fetch(url);
      const data = await response.json();


      const results = data.results;

      if (results && results.length > 0) {
        results.forEach(result => {
          if (result.preview_photos && result.preview_photos.length > 0) {
            result.preview_photos.forEach(photo => {
              if (photo.urls && photo.urls.small) {
                const image = document.createElement('img');
                image.src = photo.urls.small;
                image.alt = result.title;
                image.addEventListener('click', () => {
                  window.open(result.links.html, '_blank');
                });
                parentCont.appendChild(image);

                if(parentCont.innerHTML === ''){
                  showMore.style.display = 'none'
                }else{
                  showMore.style.display = 'block'
                }
              }
            });
          }
        });
      } else {
        console.log('No results found');
      }
    }

    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      page = 1;
      parentCont.innerHTML = ''; // Clear the content before displaying new images
      showMore.style.display = 'none'
      searchImages();
    });

showMore.addEventListener('click', async () => {
  page++;
  searchImages();
});
