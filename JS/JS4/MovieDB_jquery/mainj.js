'use strict';

//Storage
var storage = {
    url: "https://api.themoviedb.org/3/",
    key: '?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US',
    ArticleList: [],
    total_pages: '',
    current_page: 1,
    articleListLength: '',
    limit: 10,
    movieList: [],
    movieIdClicked: '',
    movieItem: {},
    list: document.getElementById('listM'),
    movieBackground: document.getElementById('movieBackground')
};

     // функция запустится, как только DOM полностью загрузится
    $(window).load(function (e) {   // функция запустится, как только DOM полностью загрузится, включая загрузку изображений
        // var validate = Validate();
        // $("#listM").html(validate);
        // if (validate.length == 0) {
            CallAPI('movie/top_rated', '&page='+ storage.current_page, movieGrid, errorFunc);
        // }
    });


    $(window).scroll(function() {
        var d = document.documentElement;
        var offset = d.scrollTop + window.innerHeight;
        var height = d.offsetHeight;

        // console.log('offset = ' + offset);
        // console.log('height = ' + height);

        if (offset === height) {

            storage.current_page++

            if (storage.current_page < storage.limit) {
                CallAPI('movie/top_rated', '&page='+ storage.current_page, movieGrid, errorFunc);
            }
        }
});
//https://api.themoviedb.org/3/search/movie?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US&page=1&include_adult=false&query=" + input.value



    function CallAPI( apiName, settings, success, error ) { // в success подставляем movieGrid, а дальше другую ф-ю(movieList)
        $.ajax({
            url: storage.url + apiName + storage.key + settings, // подставляем данные из storage и
            // url: "https://api.themoviedb.org/3/movie/top_rated?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US&page=" + page,
            dataType: "json", // .then
            success: success, // .then
            error: error
        });
    }

    function movieGrid(data) {  // специальная ф-я, в аргументс приходят данные
        // занести в storage.ArticleList

       // storage.ArticleList = data["results"];

        console.log(storage.ArticleList);
        storage.ArticleList = storage.ArticleList.concat( data["results"]); // add new object to existing array


        var resultHtml = $("<div class=\"row\" id=\"articleList\">");
        for (var i = 0; i < storage.ArticleList.length; i++) {

            var image = storage.ArticleList[i]["poster_path"] == null ? "Image/no-image.png" : "https://image.tmdb.org/t/p/w500/" + storage.ArticleList[i]["poster_path"];

            var cutString = storage.ArticleList[i].overview.slice(0, 200);
            storage.ArticleList[i].overview = cutString.slice(0, cutString.lastIndexOf('.')) + '.';

            resultHtml.append("<div class=\"result col-12 col-sm-12 col-md-9 col-lg-3\" resourceId=\"" + storage.ArticleList[i]["id"] + "\">" + "<div class=\"card movie-card\">" + "<div class=\"rowMovieDiv row no-gutters\">" + "<div class=\"imgDiv\">" + "<img src=\"" + image + "\" class=\"poster img-fluid \" style=\" \"/>" + "<div class=\"overlayPoster\"><div class =\"card-body\"><h4 class=\"card-title\"><a>" + storage.ArticleList[i]["title"] + "</a></h4><p>" + storage.ArticleList[i]["overview"] + "</p><p class=\"card-footer\">More info</p></div></div></div></div></div></div>");
        }

        resultHtml.append("</div>");
        $("#listM").html(resultHtml);

        //Paging(result["total_pages"]);
    }


    function errorFunc(xhr, status, _error) {
        $("#message").html("Result: " + status + " " + _error + " " + xhr.status + " " + xhr.statusText);
    }

    function Validate() {
        var errorMessage = "";
        if ($("#searchInput").val() == "") {
            errorMessage += "► Enter Search Text";
        }
        return errorMessage;
    }

    function Paging(totalPage) {
        var obj = $("#pagination").twbsPagination({
            totalPages: totalPage,
            visiblePages: 5,
            onPageClick: function onPageClick(event, page) {
                CallAPI(page);
            }
        });
    }
    $(document).ajaxStart(function () {
        $(".loader img").show();
    });

    $(document).ajaxStop(function () {
        $(".loader  img").hide();
    });


    $('input').on('input', function() {
        // console.log('input');
        var MovieList = $("<div class=\"row\" id=\"MovieList\">");
        for (var i = 0; i < storage.ArticleList.length; i++) {


            MovieList.append("<div >Список Фильмов</div>");
        }

    });







// -----------------------------------------------------------------------------
//
// function searchMovie () {
//     return fetch(
//         "https://api.themoviedb.org/3/search/movie?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US&page=1&include_adult=false&query=" + input.value,
//         {
//             method: "GET"
//         }
//     ).then(function(res) { return res.json()})
// }
// ///movie/top_rated API
//
// // -------------------------- Sarch Movies ---------------------------------------------------------
// var input = document.getElementById("searchMovie");
//
// input.oninput = function() {
//     clearSearch("searchList");
//     searchMovie()
//         .then(function(res) {
//             console.log(res);
//             storage.movieList = res.results;
//             searchList.appendChild(MovieList())
//         })
// };
//
//
// function clearSearch(el){
//     document.getElementById(el).innerHTML = "";
// }
//
// function MovieList () {
//     var div = document.createElement("div");
//     div.className = "MovieList";
//     if (input.value) {
//         storage.movieList.forEach(function (item) {
//             div.appendChild(ItemMovieFromList(item));
//         })
//     }
//     return div
// }
//
// function ItemMovieFromList(data) {
//     var searchList = document.createElement("div");
//
//     var searchListUl = document.createElement("ul");
//     var searchListLi = document.createElement("li");
//
//
//     var aSearch = document.createElement("a");
//
//
//
//     searchList.className = "col-12 col-sm-12 col-md-8 input-group ";
//
//     searchListUl.className = "suggests-component";
//
//
//
//
//     aSearch.className = "ItemMovieFromSearchList";
//     aSearch.innerText = data.title;
//
//
//     searchList.appendChild(searchListUl);
//     searchListUl.appendChild(aSearch);
//     aSearch.appendChild(searchListLi);
//     var idMovie = data.id;
//     aSearch.id = idMovie;
//
//     var id = storage.articleList.id;
//     // a.addEventListener("click",         // ссылка чистит
//     //     (function(){clearList("movie")})
//     // );
//     aSearch.addEventListener("click",
//         (function(){clearList("articleList")})
//     );
//     aSearch.addEventListener("click",
//         (function(){clearList("searchList")})
//     );
//     aSearch.addEventListener("click",
//         (function(){clearList("searchMovie")})
//     );
//     aSearch.addEventListener("click",
//
//         (function() {
//             // storage.movieIdClicked = this.backdrop_path.substring(1);
//             storage.movieIdClicked = this.id;
//             console.log(storage.movieIdClicked);
//             console.log(storage.movieItem)
//         })
//
//     );
//
//     aSearch.addEventListener("click",
//         renderMovie
//     );
//     aSearch.addEventListener("click",
//         storage.storageRun
//     );
//
//     return searchList
// }
//
// function renderMovie () {
//     //  getTopMovie ()
//     getData("movie/"+ storage.movieIdClicked, "")
//         .then(function(resM) {
//             return resM.json()
//         })
//         .then(function(resM) {
//             storage.movieItem = resM;
//             //console.log(storage.movieItem.title)
//             console.log(storage.movieItem);
//             console.log(storage.articleList);
//             MovieItem()
//         })
//
// }