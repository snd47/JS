//Storage
var storage = {

    articleList: [],
    // movieItem: []
};



function getAllArticle () {
    return fetch(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US&page=1',
        {
            method: 'GET'
        }
    )
}

// Событие onload на window срабатывает, когда загружается вся страница, включая ресурсы на ней – стили, картинки и т.п.

window.onload = function () {
    render()
};

// render methdo

function render () {
    getAllArticle()
        .then(function(res) {
            return res.json()
        })
        .then(function(res) {
            storage.articleList = res.results;
            ArticalList()
        })
}
// Добавляем из объекта storage в div с id="articleList"
function ArticalList () {
    storage.articleList.forEach(function(item) {
        articleList.appendChild(ArticalItem(item))
    })
}

function ArticalItem (data) {
    // -----------------------создаем переменную DOM-элементы
    var itemArticle = document.createElement('div');
    var itemArticleInner = document.createElement('div');

    var rowMovieDiv = document.createElement('div');
    var imgDiv = document.createElement('div');
    var textDiv = document.createElement('div');

    var img = document.createElement('img');
    var h4 = document.createElement('h4');
    var p = document.createElement('p');
        //  var btn = document.createElement('button')
    var cardBodyDiv = document.createElement('div');

    var moreFooterDiv = document.createElement('div');
    var a = document.createElement('a');


    // ------------------добавили HTML class для дальнейшей стилизации
    rowMovieDiv.className = 'rowMovieDiv row no-gutters';
     imgDiv.className = 'imgDiv col-12 col-sm-4 col-md-4 col-lg-5 col-xl-4';
         img.setAttribute('class', 'poster');


    textDiv.className = 'textDiv col-12 col-sm-8 col-md-8 col-lg-7 col-xl-8 d-flex flex-column justify-content-around';

        cardBodyDiv.className = 'card-body';
            h4.className = 'card-title';
            p.className = 'card-text';

    moreFooterDiv.className = 'card-footer';
            a.className = 'moreInfo';



    // -------------------определяем наполнение этих элементов из API
    itemArticle.className = 'col-12 col-sm-12 col-md-9 col-lg-6';
    itemArticleInner.className = 'card movie-card';

    img.src = "https://image.tmdb.org/t/p/w500/" + data.poster_path;
    h4.innerText = data.title;
    // сокращаем выводимый текст до последней точки
                                                                    // innerHTML - вставляем как HTML
                                                                    // textContent, innerText - вставляем как текст
    var cutString =  data.overview.slice(0,200);
    p.innerText = cutString.slice(0, cutString.lastIndexOf('.'))+'.';
    // btn.innerText = 'Подробнее'
    a.innerText = 'Подробнее';

                // a.addEventListener(click, renderMovie ());
                // a.removeEventListener(click, renderMovie ());
    a.onclick =

        function () {

        renderMovie()


    };

    // -------------------------Выводим элементы на страницу

    itemArticle.appendChild(itemArticleInner)
    itemArticleInner.appendChild(rowMovieDiv)

    rowMovieDiv.appendChild(imgDiv)
    imgDiv.appendChild(img)

    rowMovieDiv.appendChild(textDiv);

        textDiv.appendChild(cardBodyDiv)
            cardBodyDiv.appendChild(h4)
            cardBodyDiv.appendChild(p)

        textDiv.appendChild(moreFooterDiv)
            moreFooterDiv.appendChild(a)


    return itemArticle
}

// --------------------------------------- new blank -----------------------------------------------------------------
//let movie_id = storage.articleList.id
//--------------------------  Movies List page
function getTopMovie () {
    return fetch(
        'https://api.themoviedb.org/3/movie/19404?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US',
        {
            method: 'GET'
        }
    )
}

function renderMovie () {
    getTopMovie()
        .then(function () {
            var newWin = window.open('', '_blank' );
            newWin.document.open();
            newWin.document.write("<html><head><title>On-the-fly");
            newWin.document.write("</title></head><body><div class='root'>");

            newWin.document.write("</div></body></html>"); })
        .then(function(res) {
            return res.json()
        })
        .then(function(res) {
            storage.movieItem = res.results
            console.log(storage.movieItem)
            movieInfo()
        })
}

function movieInfo (item) {
    storage.movieItem.appendChild(MovieItem(item))

}


function MovieItem (data) {

    var itemMovie = document.createElement('div')
    itemMovie.innerText = data.title;
    root.appendChild(itemMovie)
}
