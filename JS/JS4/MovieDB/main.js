//Storage
"use strict";
var storage = {
    url: "https://api.themoviedb.org/3/",
    key: "?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US",
    total_pages: "",
    current_page: 1,
    articleListLength: "",
    limit: 10,

    articleList: [],        // получаем "главный"  массив объектов, оно же data, storage.articleList
    movieIdClicked: "",     // один элемент, одного из объектов из массива storage.articleList

    movieItem: {},        // один из объектов(фильм по id) из другого API movie/search

    movieList: [],      // массив объектов для списка поиска
    list : document.getElementById("listM"),
    movieBackground: document.getElementById("movieBackground"),
    storageRun: null
};


// ---------------- 1 -----------------
window.onload = function () {
    render();
};


function getData (apiName, num) {
    return fetch(      storage.url + apiName + storage.key + num,
        {
            method: "GET"
        }
    )
}


// ---------------- 2 -----------------
function render () {
    getData("movie/top_rated", "&page=" + storage.current_page)
        .then(function(res) {
            return res.json()
        })
        .then(function(res) {
            console.log(res.results);
            storage.articleList = storage.articleList.concat(res.results); // add new object to existing array
            storage.total_pages	= res.total_pages;
            storage.articleListLength = storage.articleList.length;
            console.log(storage);
            ArticalList()
        })
}
// Событие onload на window срабатывает, когда загружается вся страница, включая ресурсы на ней – стили, картинки и т.п.



// render meth


// Добавляем из объекта storage в div с id="articleList"
function ArticalList () {
    var i = (storage.current_page-1)*20;                           // задаём индекс с какого выводить по 20

    storage.articleList.slice(i).forEach(function(item) {
        articleList.appendChild(ArticalItem(item))
    });

    //--------------------------  Infinite scroll  > render() while limit allows
    window.onscroll = function() {
        var d = document.documentElement;
        var offset = d.scrollTop + window.innerHeight;
        var height = d.offsetHeight;

        // console.log('offset = ' + offset);
        // console.log('height = ' + height);

        if (offset === height) {

            storage.current_page++;

            if (storage.current_page < storage.limit) {
                render()
            }
        }
    };


}

function ArticalItem (data) {
    // -----------------------создаем переменную DOM-элементы
    var itemArticle = document.createElement("div");
    var itemArticleInner = document.createElement("div");

    var rowMovieDiv = document.createElement("div");
    var imgDiv = document.createElement("div");
    var textDiv = document.createElement("div");

    var img = document.createElement("img");
    var h4 = document.createElement("h4");
    var p = document.createElement("p");
    //  var btn = document.createElement('button')
    var cardBodyDiv = document.createElement("div");

    var moreFooterDiv = document.createElement("div");
    var a = document.createElement("a");


    // storage.movieBackground.style.display = "none";
    storage.movieBackground.className = "displayNone";



    // ------------------добавили HTML class для дальнейшей стилизации
    itemArticle.className = "col-12 col-sm-12 col-md-9 col-lg-6";
    itemArticleInner.className = "card movie-card";
    rowMovieDiv.className = "rowMovieDiv row no-gutters";
    imgDiv.className = "imgDiv col-12 col-sm-4 col-md-4 col-lg-5 col-xl-4";
    img.setAttribute("class", "poster");


    textDiv.className = "textDiv col-12 col-sm-8 col-md-8 col-lg-7 col-xl-8 d-flex flex-column justify-content-around";

    cardBodyDiv.className = "card-body";
    h4.className = "card-title";
    p.className = "card-text";
    var idMovie = data.id;
    a.id = idMovie;

    moreFooterDiv.className = "card-footer";
    a.className = "moreInfo";



    // -------------------определяем наполнение "этих" "элементов" и API


    img.src = "https://image.tmdb.org/t/p/w500/" + data.poster_path;

    h4.innerText = data.title;
    // сокращаем выводимый текст до последней точки
    // innerHTML - вставляем как HTML
    // textContent, innerText - вставляем как текст
    var cutString =  data.overview.slice(0,200);
    p.innerText = cutString.slice(0, cutString.lastIndexOf("."))+".";
    // btn.innerText = 'Подробнее'

    a.innerText = "Подробнее";
    var id = storage.articleList.id;
    // a.addEventListener('click',         // ссылка чистит
    //     (function(){clearList('movie')})
    // );
    a.addEventListener("click",
        (function(){clearList("articleList")})
    );

    a.addEventListener("click",

        (function() {
            // storage.movieIdClicked = this.backdrop_path.substring(1);
            storage.movieIdClicked = this.id;
            console.log(storage.movieIdClicked);
            console.log(storage.movieItem)
        })

    );

    a.addEventListener("click",
        renderMovie
    );
    a.addEventListener("click",
        storage.storageRun
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

    // storage.list.style.display = "block";
    storage.list.className = "displayBlock container";

    return itemArticle
}

// --------------------------------------- new blank -----------------------------------------------------------------
//var movie_id = storage.articleList.id
//--------------------------  Movies List page
function renderMovie () {
    //  getTopMovie ()
    getData("movie/"+ storage.movieIdClicked, "")
        .then(function(resM) {
            return resM.json()
        })
        .then(function(resM) {
            storage.movieItem = resM;
            //console.log(storage.movieItem.title)
            console.log(storage.movieItem);
            console.log(storage.articleList);
            MovieItem()
        })

}
// ---------------------------- в новом окне ---------------
function newMovie() {
    //       var newWin = window.open("", "_blank" );
    //      newWin.document.open();
    //       newWin.document.write("<html><head><title>On-the-fly");
    //       newWin.document.write("</title></head><body><div class="root">");

    //        newWin.document.write("</div></body></html>");
}


function clearList(elId)
{
    document.getElementById(elId).innerHTML = ""; // чистим по клику
}


function MovieItem () {
    // ----------------------- back to movie List

    var backLinkDiv = document.createElement("div");
    backLinkDiv.className = "col-12 col-sm-12 col-md-12 col-lg-12 my-3";
    var backLink = document.createElement("button");
    backLink.addEventListener("click",
        (function(){clearList("movie")})
    );
    backLink.addEventListener("click",
        ArticalList                            // надо передавать тело
    );


    backLink.className = "btn btn-outline-info my-2 my-sm-0";
    backLink.innerText = "Back to Movie List";


    movie.appendChild(backLinkDiv);
    backLinkDiv.appendChild(backLink);


    // -----------------------создаем переменную DOM-элементы
    var itemMovie = document.createElement("h4");
    var back_poster = document.createElement("img");
    var imgAbout = document.createElement("div");
    // console.log(imgAbout);
    var imgAboutSrc = document.createElement("img");
    var textAbout = document.createElement("div");
    var iconsAbout = document.createElement("div");
    var pTextAbout = document.createElement("p");
    var genresAboutUl = document.createElement("ul");
    var genresAboutLi;


    // ------------------добавили HTML class для дальнейшей стилизации
    itemMovie.className = "card-title";
    imgAbout.className = "col-12 col-sm-4 col-md-4 col-lg-5 col-xl-4";
    textAbout.className = "col-12 col-sm-8 col-md-8 col-lg-7 col-xl-8 d-flex flex-column ";
    imgAboutSrc.className = "imgAboutSrc";
    iconsAbout.className = "icons ";


    // -------------------определяем наполнение этих элементов из API
        iconsAbout.innerHTML  = "<div class = \"rating\"><svg class=\"score\" viewBox=\"-25 -25 450 400\"><circle class=\"score-empty\"  cx=\"175\" cy=\"175\" r=\"175\"> </circle><circle id=\"js-circle\" class=\"js-circle score-circle\" transform=\"rotate(-90 175 175)\" cx=\"175\" cy=\"175\" r=\"175\" style=\"stroke-dashoffset: 33;\"></circle><text id = \"score-rating\" class=\"js-text score-text\" x=\"49%\" y=\"51%\" dx=\"-25\" text-anchor=\"middle\"></text></svg></div><div class='ratingText'>Рейтинг пользователя</div>"


    // iconsAbout.innerHTML = "<div class='ratingText'>Рейтинг пользователя</div>";
    itemMovie.innerText = storage.movieItem.title;
    imgAboutSrc.src = "https://image.tmdb.org/t/p/w500" + storage.movieItem.poster_path;
    pTextAbout.innerHTML = "<h4>Review</h4>"+ storage.movieItem.overview;



    // genresAboutLi.innerHTML = Object.values(storage.movieItem.genres.name).forEach(function(item) {
    //     genresAboutLi.appendChild(genresAboutUl)
    // })


    //   back_poster.src = "https://image.tmdb.org/t/p/w500" + storage.movieItem.backdrop_path;


    // -------------------------Выводим элементы на страницу

    //imgAbout.appendChild(imgAboutSrc);

    movie.appendChild(imgAbout);
    imgAbout.appendChild(imgAboutSrc);
    movie.appendChild(textAbout);
    textAbout.appendChild(itemMovie);
    textAbout.appendChild(iconsAbout);
    textAbout.appendChild(pTextAbout);

    textAbout.appendChild(genresAboutUl);      // для жанров
    // genresAboutUl.appendChild(genresAboutLi);
    storage.movieItem.genres.forEach(function(item) {
        genresAboutLi = document.createElement("li");
        genresAboutLi.innerHTML = item.name;            // перезатирает каждый раз
        genresAboutLi.id = item.id;
        genresAboutLi.className= "genre badge badge-info";
        genresAboutUl.appendChild(genresAboutLi);
    });



    // storage.movieBackground.style.display = "block";
    storage.movieBackground.className = "displayBlock";
    storage.movieBackground.style.background = `url("https://image.tmdb.org/t/p/w500${storage.movieItem.backdrop_path}") no-repeat`;
    storage.movieBackground.style.backgroundSize = "cover";
    // movieBackground.style.backgroundColor
    //--------------------------  Infinite scroll  > render() while limit allows
    window.onscroll = function() {
        return null;
    };
    // storage.list.style.display = "none";
    storage.list.className = "displayNone";


    var roundRating = document.getElementById("score-rating");
    roundRating.innerText =  storage.movieItem.vote_average*10 + '%';

    // ----------------------------------- SVG begin---------------------------------------
    // DOM Elements

    const button = document.querySelector("js-button");
    const circle = document.getElementById("js-circle");
    const text = document.getElementById("score-rating");


// Circle radius, diameter and offset function

    const radius = circle.getAttribute("r");
    const diameter = Math.round(Math.PI * radius * 2);
    const getOffset = (val = 0) => Math.round((100 - val) / 100 * diameter);


// Generate random number and set offset and percentage
    var val = storage.movieItem.vote_average*10;
    console.log(val);
    var run = () => {
        // const val = Math.floor(Math.random() * 100)
        circle.style.strokeDashoffset = getOffset(val);
        text.textContent = `${val}%`
    };
    run();
// storage.storageRun = run;
// Event listeners

    // button.addEventListener("click", run);
    document.addEventListener("DOMContentLoaded", () => setTimeout(run, 10))

    // ----------------------------------- SVG end --------------------------------------
}


// ---------------------- header -----------------------------
// ---------------------- header -----------------------------
function searchMovie () {
    return fetch(
        "https://api.themoviedb.org/3/search/movie?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US&page=1&include_adult=false&query=" + input.value,
        {
            method: "GET"
        }
    ).then(function(res) { return res.json()})
}
///movie/top_rated API

// -------------------------- Sarch Movies ---------------------------------------------------------
var input = document.getElementById("searchMovie");

input.oninput = function() {
    clearSearch("searchList");
    searchMovie()
        .then(function(res) {
            console.log(res);
            storage.movieList = res.results;
            searchList.appendChild(MovieList())
        })
};


function clearSearch(el){
    document.getElementById(el).innerHTML = "";
}

function MovieList () {
    var div = document.createElement("div");
    div.className = "MovieList";
    if (input.value) {
        storage.movieList.forEach(function (item) {
            div.appendChild(ItemMovieFromList(item));
        })
    }
    return div
}


function ItemMovieFromList(data) {
    var searchList = document.createElement("div");

    var searchListUl = document.createElement("ul");
    var searchListLi = document.createElement("li");


    var aSearch = document.createElement("a");



    searchList.className = "col-12 col-sm-12 col-md-8 input-group ";

    searchListUl.className = "suggests-component";




    aSearch.className = "ItemMovieFromSearchList";
    aSearch.innerText = data.title;


    searchList.appendChild(searchListUl);
    searchListUl.appendChild(aSearch);
    aSearch.appendChild(searchListLi);
    var idMovie = data.id;
    aSearch.id = idMovie;

    // var id = storage.articleList.id;
    aSearch.addEventListener("click",         // ссылка чистит
        (function(){clearList("movie")})
    );
    aSearch.addEventListener("click",
        (function(){clearList("articleList")})
    );
    aSearch.addEventListener("click",
        (function(){clearList("searchList")})
    );
    aSearch.addEventListener("click",
        (function(){clearList("searchMovie")})
    );
    aSearch.addEventListener("click",

        (function() {
            // storage.movieIdClicked = this.backdrop_path.substring(1);
            storage.movieIdClicked = this.id;
            console.log(storage.movieIdClicked);
            console.log(storage.movieItem)
        })

    );

    aSearch.addEventListener("click",
        renderMovie
    );
    aSearch.addEventListener("click",
        storage.storageRun
    );

    return searchList
}



// ----------------------------- end header -------------------------------------------------------------

// function ratingCircle(startDiv) {
//     var ratingDiv = document.createElement("div");
//     var svgRating = document.createElement("svg");
//     var circleRating = document.createElement("circle");
//     var circleRating2 = document.createElement("circle");
//     var textRating = document.createElement("text");
//
//     svgRating.className = "score";
//     circleRating.className = "score-empty";
//     circleRating2.className = "js-circle score-circle";
//     circleRating2.id = "js-circle";
//     textRating.className = "js-text score-text";
//     textRating.id = "score-rating";
//
//     svgRating.viewBox = "-25 -25 450 400";
//     circleRating.cx = "175";
//     circleRating.cy = "175";
//     circleRating.r = "175";
//     circleRating2.cx = "175";
//     circleRating2.cy = "175";
//     circleRating2.r = "175";
//     circleRating2.transform = "rotate(-90 175 175)";
//     textRating.x = "50%";
//     textRating.y = "53%";
//     textRating.dx = "-25";
//     textRating.text-anchor = "middle";
//
//     startDiv.appendChild("ratingDiv");
//     ratingDiv.appendChild("svgRating");
//     svgRating.appendChild("circleRating");
//     svgRating.appendChild("circleRating2");
//     svgRating.appendChild("textRating");
//
//
//
//
//
//
// }