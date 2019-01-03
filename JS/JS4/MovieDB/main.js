//Storage
var storage = {

    articleList: [],        // получаем массив объектов
    movieIdClicked: '',     // один элемент

    movieItem: {}        // один из объектов из другого api
};

function loadConsoleStorageArticleList() {
    console.log(storage.articleList);
}

function loadConsoleStorageMovieItem() {
    console.log(storage.movieItem);
}

function getAllArticle () {
    return fetch(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US&page=2',
        {
            method: 'GET'
        }
    )
}

// Событие onload на window срабатывает, когда загружается вся страница, включая ресурсы на ней – стили, картинки и т.п.

window.onload = function () {
    render()
};

// render meth

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
    itemArticle.className = 'col-12 col-sm-12 col-md-9 col-lg-6';
    itemArticleInner.className = 'card movie-card';
    rowMovieDiv.className = 'rowMovieDiv row no-gutters';
    imgDiv.className = 'imgDiv col-12 col-sm-4 col-md-4 col-lg-5 col-xl-4';
    img.setAttribute('class', 'poster');


    textDiv.className = 'textDiv col-12 col-sm-8 col-md-8 col-lg-7 col-xl-8 d-flex flex-column justify-content-around';

    cardBodyDiv.className = 'card-body';
    h4.className = 'card-title';
    p.className = 'card-text';
    let idMovie = data.id
    a.id = idMovie;

    moreFooterDiv.className = 'card-footer';
    a.className = 'moreInfo';



    // -------------------определяем наполнение этих элементов из API


    img.src = "https://image.tmdb.org/t/p/w500/" + data.poster_path;

    h4.innerText = data.title;
    // сокращаем выводимый текст до последней точки
    // innerHTML - вставляем как HTML
    // textContent, innerText - вставляем как текст
    var cutString =  data.overview.slice(0,200);
    p.innerText = cutString.slice(0, cutString.lastIndexOf('.'))+'.';
    // btn.innerText = 'Подробнее'

    a.innerText = 'Подробнее';
    let id = storage.articleList.id;
    // a.addEventListener('click',         // ссылка чистит
    //     (function(){clearList('movie')})
    // );
    a.addEventListener('click',
        (function(){clearList('articleList')})
    );

    a.addEventListener('click',

        (function() {
            // storage.movieIdClicked = this.backdrop_path.substring(1);
            storage.movieIdClicked = this.id;
            console.log(storage.movieIdClicked);
            console.log(storage.movieItem)
        })

    );

    a.addEventListener('click',

        renderMovie

    );
    // a.removeEventListener(click, renderMovie ());


    // -------------------------Выводим элементы на страницу

    itemArticle.appendChild(itemArticleInner);
    itemArticleInner.appendChild(rowMovieDiv);

    rowMovieDiv.appendChild(imgDiv);
    imgDiv.appendChild(img);

    rowMovieDiv.appendChild(textDiv);

    textDiv.appendChild(cardBodyDiv);
    cardBodyDiv.appendChild(h4);
    cardBodyDiv.appendChild(p);

    textDiv.appendChild(moreFooterDiv);
    moreFooterDiv.appendChild(a);


    return itemArticle
}

// --------------------------------------- new blank -----------------------------------------------------------------
//let movie_id = storage.articleList.id
//--------------------------  Movies List page
function renderMovie () {
    getTopMovie ()

        .then(function(resM) {
            return resM.json()
        })
        .then(function(res) {
            storage.movieItem = res;
            //console.log(storage.movieItem.title)
            console.log(storage.movieItem);
            console.log(storage.articleList);
            MovieItem()
        })

}
function getTopMovie () {
    return fetch(
        'https://api.themoviedb.org/3/movie/' + storage.movieIdClicked + '?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US',
        {
            method: 'GET'
        }
    )
}




function newMovie() {
    //       var newWin = window.open('', '_blank' );
    //      newWin.document.open();
    //       newWin.document.write("<html><head><title>On-the-fly");
    //       newWin.document.write("</title></head><body><div class='root'>");

    //        newWin.document.write("</div></body></html>");
}


function clearList(elId)
{
    document.getElementById(elId).innerHTML = ""; // чистим по клику
}


function MovieItem () {
    // ----------------------- back to movie List

    var backLinkDiv = document.createElement('div');

    backLinkDiv.className = 'col-12 col-sm-12 col-md-12 col-lg-12';

    var backLink = document.createElement('a');

    backLink.addEventListener('click',
        (function(){clearList('movie')})
    );
    backLink.addEventListener('click',
        ArticalList()
    );
    backLink.innerText = 'Back to Movie List';


    movie.appendChild(backLinkDiv);
    backLinkDiv.appendChild(backLink);


    // -----------------------создаем переменную DOM-элементы
    var itemMovie = document.createElement('h4');

    var back_poster = document.createElement('img');
    // ------------------добавили HTML class для дальнейшей стилизации
    itemMovie.className = 'card-title';

    // -------------------определяем наполнение этих элементов из API

    itemMovie.innerText = storage.movieItem.title;

    back_poster.src = 'https://image.tmdb.org/t/p/w500' + storage.movieItem.backdrop_path;
    // -------------------------Выводим элементы на страницу
    movie.appendChild(itemMovie);

    movie.appendChild(back_poster)

}
