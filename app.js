(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        /*searchedForText = 'hippos';
        const unsplashRequest = new XMLHttpRequest();
        unsplashRequest.open('GET',`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID 9c6fa177751af00a3aec58833af93a6d247f855370157a428833bded63f75f1f');
        unsplashRequest.send();*/
        const imgRequest = new XMLHttpRequest();
        imgRequest.onload = addImage;
        imgRequest.onerror = function (err) {
            requestError(err, 'image');
        };
        imgRequest.open('GET',`https://api.unsplash.com/search/photos?=page=1&query=${searchedForText}`);
        imgRequest.setRequestHeader('Authorization', 'Client-ID 9c6fa177751af00a3aec58833af93a6d247f855370157a428833bded63f75f1f');
        imgRequest.send();
        function addImage(){
            let htmlContent = '';
            const data = JSON.parse(this.responseText);
            const firstImage = data.results[0];
            //console.log(firstImage);
            if(data && data.results && data.results[0]){
                htmlContent = `<figure>
                <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`;
            } else {
                htmlContent = '<div class="error-no-image">No images available</div>'
            }

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }

        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticle;
        articleRequest.open('GET', `http://nytimes.com/search/v2/articlesearch.json?q=${searchedForText}$api-key=<5bc3c31c85624f528ffc7de1245ee24f>`);
        articleRequest.setRequestHeader('api-key','5bc3c31c85624f528ffc7de1245ee24f');
        //articleRequest.setRequestHeader('origin','http://nytimes.com/');
        articleRequest.send();
        function addArticle() {
            let articleContent = '';
            const articledata = JSON.parse(this.responseText);
            const firstarticle = articledata.results[0];
            console.log(firstarticle);
            if(articledata && articledata.results && articledata[0]){

            }
        }
    });
})();
