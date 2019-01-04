//Storage
var storage = {
    url: "https://api.themoviedb.org/3/",
    key: '?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US',
    total_pages: '',
    current_page: 1,
    articleListLength: '',
    limit: 10,

    articleList: [],        // получаем массив объектов
    movieIdClicked: '',     // один элемент

    movieItem: {},        // один из объектов из другого api

    movieList: [],      // массив объектов для списка поиска
    list : document.getElementById('listM'),
    movieBackground: document.getElementById('movieBackground'),
};

// function loadConsoleStorageArticleList() {
//     console.log(storage.articleList);
// }
//
// function loadConsoleStorageMovieItem() {
//     console.log(storage.movieItem);
// }
// ---------------------- header -----------------------------



// ----------------------------- end header -------------------------------------------------------------
// ---------------- 1 -----------------
window.onload = function () {
    render()
};

//--------------------------  Infinite scroll  > render() while limit allows
// window.onscroll = function() {
//     var d = document.documentElement;
//     var offset = d.scrollTop + window.innerHeight;
//     var height = d.offsetHeight;
//
//     // console.log('offset = ' + offset);
//     // console.log('height = ' + height);
//
//     if (offset === height) {
//
//         storage.current_page++
//
//         if (storage.current_page < storage.limit) {
//             render()
//         }
//     }
// };


function getData (apiName, num) {
    return fetch(      storage.url + apiName + storage.key + num,
        {  method: 'GET'  }
    )
}

// function getTopMovie () {
//     return fetch(
//         'https://api.themoviedb.org/3/movie/' + storage.movieIdClicked + '?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US',
//         {
//             method: 'GET'
//         }
//     )
// }
// // url: "https://api.themoviedb.org/3/",
// //     key: '?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US&page=',
// //https://api.themoviedb.org/3/search/movie?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US&page=1&include_adult=false&query=' + input.value
// //'https://api.themoviedb.org/3/movie/' + storage.movieIdClicked + '?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US
// function getAllArticle () {
//     return fetch(
//         'https://api.themoviedb.org/3/movie/top_rated?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US&page=' + storage.current_page,
//       //          https://api.themoviedb.org/3/movie/top_rated?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US&page=1
//         {
//             method: 'GET'
//         }
//     )
// }

// ---------------- 2 -----------------
function render () {
    getData('movie/top_rated', '&page=' + storage.current_page)
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
    let i = (storage.current_page-1)*20;                           // задаём индекс с какого выводить по 20
    storage.articleList.slice(i).forEach(function(item) {
        articleList.appendChild(ArticalItem(item))
    })

    //--------------------------  Infinite scroll  > render() while limit allows
    window.onscroll = function() {
        var d = document.documentElement;
        var offset = d.scrollTop + window.innerHeight;
        var height = d.offsetHeight;

        // console.log('offset = ' + offset);
        // console.log('height = ' + height);

        if (offset === height) {

            storage.current_page++

            if (storage.current_page < storage.limit) {
                render()
            }
        }
    };


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


    storage.movieBackground.style.display = 'none';
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



    // -------------------определяем наполнение этих элементов и API


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
    a.addEventListener('click',         // ссылка чистит
        (function(){clearList('movie')})
    );
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

    storage.list.style.display = 'block';
    return itemArticle
}

// --------------------------------------- new blank -----------------------------------------------------------------
//let movie_id = storage.articleList.id
//--------------------------  Movies List page
function renderMovie () {
  //  getTopMovie ()
    getData('movie/'+ storage.movieIdClicked, '')
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

    let backLinkDiv = document.createElement('div');
    backLinkDiv.className = 'col-12 col-sm-12 col-md-12 col-lg-12 my-3';
    let backLink = document.createElement('button');
    backLink.addEventListener('click',
        (function(){clearList('movie')})
    );
    backLink.addEventListener('click',
        ArticalList                            // надо передавать тело
    );


    backLink.className = 'btn btn-outline-info my-2 my-sm-0';
    backLink.innerText = 'Back to Movie List';


    movie.appendChild(backLinkDiv);
    backLinkDiv.appendChild(backLink);


    // -----------------------создаем переменную DOM-элементы
    let itemMovie = document.createElement('h4');
    let back_poster = document.createElement('img');
    let imgAbout = document.createElement('div');
    // console.log(imgAbout);
    let imgAboutSrc = document.createElement('img');
    let textAbout = document.createElement('div');
    let pTextAbout = document.createElement('p');
    // ------------------добавили HTML class для дальнейшей стилизации
    itemMovie.className = 'card-title';
    imgAbout.className = 'col-12 col-sm-4 col-md-4 col-lg-5 col-xl-4';
    textAbout.className = 'col-12 col-sm-8 col-md-8 col-lg-7 col-xl-8 d-flex flex-column ';
    imgAboutSrc.className = 'imgAboutSrc'
    // -------------------определяем наполнение этих элементов из API

    itemMovie.innerText = storage.movieItem.title;
    imgAboutSrc.src = 'https://image.tmdb.org/t/p/w500' + storage.movieItem.poster_path;
    pTextAbout.innerText = storage.movieItem.overview;
 //   back_poster.src = 'https://image.tmdb.org/t/p/w500' + storage.movieItem.backdrop_path;
    // -------------------------Выводим элементы на страницу

    //imgAbout.appendChild(imgAboutSrc);

    movie.appendChild(imgAbout);
    imgAbout.appendChild(imgAboutSrc);
    movie.appendChild(textAbout);
    textAbout.appendChild(itemMovie);
    textAbout.appendChild(pTextAbout);

   storage.movieBackground.style.display = 'block';
    storage.movieBackground.style.background = `url('https://image.tmdb.org/t/p/w500${storage.movieItem.backdrop_path}') no-repeat`;
    storage.movieBackground.style.backgroundSize = "cover";
   // movieBackground.style.backgroundColor
    //--------------------------  Infinite scroll  > render() while limit allows
    window.onscroll = function() {
       return null;
    };
    storage.list.style.display = 'none';
}
