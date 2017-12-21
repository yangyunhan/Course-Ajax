(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

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
        articleRequest.onerror = function (err) {
            requestError(err, 'article');
        };
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=5bc3c31c85624f528ffc7de1245ee24f&q=${searchedForText}`);
        articleRequest.send();
        function addArticle() {
            let htmlContent = '';
            const data = JSON.parse(this.responseText);

            if(data.response && data.response.docs && data.response.docs.length > 1){
                htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article">
                    <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                    <p>${article.snippet}</p>
                </li>`
                ).join('') + '</ul>';
            } else {
                htmlContent = '<div class="error-no-articles">No articles available</div>';
            }

            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }

        function requestError(e, part) {
            console.log(e);
            responseContainer.insertAdjacentHTML('beforeend',  `<p class="network-warning error-${part}">Oh no!`);
        }
    });
})();
