'use strict';

//Storage
var storage = {
    url: "https://api.themoviedb.org/3/",
    currentLang: "en-US",
    currentApi: "Grid",
    key: '?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=',
    imgUrl: "https://image.tmdb.org/t/p/w500/",
    ArticleList: [],         // Список фильмов для стартовой страницы, data.result
    total_pages: '',
    current_page: 1,         // infinity scroll
    articleListLength: '',
    limit: 10,               // предел для infinity scroll
    movieList: [],          // список фильмов для поиска
    movieIdClicked: '',     // id фильма для moreInfo, заполняем при нажатии на button
    movieItem: {},          // данные о конкретном фильме, которые в ответе на запрос с id фильма
    list: document.getElementById('listM'),
    movieBackground: document.getElementById('movieBackground')
};

     // функция запустится, как только DOM полностью загрузится
    $(window).load(function (e) {   // функция запустится, как только DOM полностью загрузится, включая загрузку изображений
        // var validate = Validate();
        // $("#listM").html(validate);
        // if (validate.length == 0) {
        $('#movieBackground').hide();
            CallAPI('movie/top_rated', '&page='+ storage.current_page, movieGrid, errorFunc);
        // }
    });
// ------------------------- --------------------------------------------------------------------------------------




$(window).scroll(function() {
        var d = document.documentElement;
        var offset = d.scrollTop + window.innerHeight;
        var height = d.offsetHeight;

        // console.log('offset = ' + offset);
        // console.log('height = ' + height);
        storage.currentApi = "Grid";
        if (offset === height) {

            storage.current_page++

            if (storage.current_page < storage.limit) {
                CallAPI('movie/top_rated', '&page='+ storage.current_page, movieGrid, errorFunc);
            }
        }
});
//https://api.themoviedb.org/3/search/movie?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US&page=1&include_adult=false&query=" + input.value

    console.log(storage.key);

    function CallAPI( apiName, settings, success, error ) { // в success подставляем movieGrid, а дальше другую ф-ю(movieList)
        $.ajax({
            url: storage.url + apiName + storage.key + storage.currentLang + settings, // подставляем данные из storage ; добавили currentLang
            // url: "https://api.themoviedb.org/3/movie/top_rated?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US&page=" + page,
            dataType: "json", // .then
            success: success, // .then
            error: error
        });
    }



    function movieGrid(data) {  // специальная ф-я, в аргументс приходят данные (это 3-ий параметр SUCCESS из $.ajax запросы, который мы занесли в ф-ю CallApi
        // занести в storage.ArticleList

       // storage.ArticleList = data["results"];

        console.log(storage.ArticleList);
        storage.ArticleList = storage.ArticleList.concat( data["results"]); // add new object to existing array


        var resultHtml = $("<div class=\"row pt-3\" id=\"articleList\">");
        for (var i = 0; i < storage.ArticleList.length; i++) {

            var image = storage.ArticleList[i]["poster_path"] == null ? "Image/no-image.png" : "https://image.tmdb.org/t/p/w500/" + storage.ArticleList[i]["poster_path"];

            var cutString = storage.ArticleList[i].overview.slice(0, 200);
            storage.ArticleList[i].overview = cutString.slice(0, cutString.lastIndexOf('.')) + '.';

            resultHtml.append(
                "<div class=\"result col-12 col-sm-12 col-md-9 col-lg-3\" resourceId=\"" + storage.ArticleList[i]["id"] + "\">"
                + "<div class=\"card movie-card\">"
                    + "<div class=\"rowMovieDiv row no-gutters\">"
                        + "<div class=\"imgDiv\">"
                        + "<img src=\"" + image + "\" class=\"poster img-fluid \"/>"
                        + "<div class=\"overlayPoster\">"
                        + "<div class =\"card-body\">"
                            + "<h4 class=\"card-title\">"
                                +"<a>" + storage.ArticleList[i]["title"]
                                + "</a>"
                            +"</h4>"
                            +"<p>" + storage.ArticleList[i]["overview"]
                            + "</p>"
                            + "<p class=\"card-footer\" >"
                                + "<button class =\"moreInfo\" id=\"" + storage.ArticleList[i]["id"] +  "\">More info</button>"
                            + "</p>"
                        + "</div>"
                        + "</div>"
                        +  "</div>"
                        + "</div>"
                    +  "</div>"
                +   "</div>");
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

$(document).on('click', ".Lang", function (e) {
    $('#movieBackground').hide();
    $('#listM').show();
    $('#listM').empty();

    storage.ArticleList= [];
    // storage.movieIdClicked=this.id;
        if (storage.currentLang == "en-US") {
            // $('#movieBackground').show();
            // Mivie List call
            storage.currentLang = "ru-RU"

        } else  {
            storage.currentLang = "en-US"
        }
        if (storage.currentApi == "Grid") {
        CallAPI('movie/top_rated', '&page=' + storage.current_page, movieGrid, errorFunc); //API request for movie list
        //	https://api.themoviedb.org/3/movie/372058?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US

        }
        // else if (storage.currentApi == "About")
        else
        {
            CallAPI("movie/"+ storage.movieIdClicked, "", movieAbout , errorFunc);
        }



});

// --------------------------------------------------------------------------------------------

$(document).on('click', ".moreInfo", function (e) {
    storage.currentApi = "About";
    $('#listM').hide();
    storage.movieIdClicked=this.id;

    $('#movieBackground').show();
    // Mivie List call
    CallAPI("movie/"+ storage.movieIdClicked, "", movieAbout , errorFunc); //API request for movie list

    //	https://api.themoviedb.org/3/movie/372058?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US
});



$(document).on('click', "#back", function (e) {
    storage.currentApi = "Grid";
    $('#movieBackground').hide();
    $('#listM').show();

    CallAPI('movie/top_rated', '&page='+ storage.current_page, movieGrid, errorFunc);
    // }
});



function movieAbout(data) {  // специальная ф-я, в аргументс приходят данные

    storage.movieItem = data; // add new object to existing array
            var image = storage.movieItem["poster_path"] == null ? "Image/no-image.png" :  storage.imgUrl + storage.movieItem["poster_path"];
    var imageBackground =  storage.movieItem["backdrop_path"];
    storage.movieBackground.style.display = 'block';
    storage.movieBackground.style.background = "url('https://image.tmdb.org/t/p/w500" + imageBackground +"') no-repeat";
    storage.movieBackground.style.backgroundSize = "cover";

    var resultHtml = $(

        "<div class=\"container\">"
    + " <div class=\"row\" id=\"movie\">"
    + " <div class=\"col-12 col-sm-12 col-md-12 col-lg-12 my-3\">"
    + "<button id=\"back\" class=\"btn btn-outline-info my-2 my-sm-0\">Back to Movie List</button>"
    + "</div>"
    + "<div class=\"col-12 col-sm-4 col-md-4 col-lg-5 col-xl-4\">"
    + "<img class=\"imgAboutSrc\" src=\"" + image +"\">"
    + "</div>"
    + "<div class=\"col-12 col-sm-8 col-md-8 col-lg-7 col-xl-8 d-flex flex-column \">"
    + "<h4 class=\"card-title\">" + storage.movieItem["title"] +  "</h4> "
    + "<p> "
    + storage.movieItem["overview"]
    + "</p>"
    + "</div>"
       + "</div>"
       + "</div>");

    $("#aboutMovie").html(resultHtml);
}



