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
    movieSimilar: {},
    list: document.getElementById('listM'),
    movieBackground: document.getElementById('movieBackground'),

    // en: [["Search movies by title"], ["More info"], [ "Users' rating"], ["Release date"], ["Back to Movie List "], [], ],
    // en: [{0:"Search movies by title"}, {1:"More info"}, {2: "Users' rating"}, {3:"Release date"}, {4:"Back to Movie List "}, {}, ],

    en: {"title":"Search movies by title","info":"More info","rating": "Users' rating","release":"Release date","back":"Back to Movie List "},

    // ru: [{0:"Поиск фильмов по названию"}, {1:"Подробнее"}, {2: "Рейтинг пользователя"}, {3:"Дата релиза"}, {4:"Обратно к списку фильмов"}, {}, ],
    // ru: ["Поиск фильмов по названию","Подробнее","Рейтинг пользователя", "Дата релиза", "Обратно к списку фильмов" ],
    ru: {"title":"Поиск фильмов по названию", "info":"Подробнее","rating": "Рейтинг пользователя", "release":"Дата релиза", "back":"Обратно к списку фильмов" }
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

function translation(n){
    if ( storage.currentLang === "en-US") {
        return storage.en[n]
        // return storage.en[n][n]
    }
    else {return storage.ru[n] }
}


$(window).scroll(function() {
    if (storage.currentApi === "Grid") {
        var d = document.documentElement;
        var offset = d.scrollTop + window.innerHeight;
        var height = d.offsetHeight;

        // console.log('offset = ' + offset);
        // console.log('height = ' + height);
        storage.currentApi = "Grid";
        if (offset === height) {

            storage.current_page++

            if (storage.current_page < storage.limit) {
                CallAPI('movie/top_rated', '&page=' + storage.current_page, movieGrid, errorFunc);
            }
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
                "<div class=\"result col-12 col-sm-4 col-md-3\" resourceId=\"" + storage.ArticleList[i]["id"] + "\">"
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
                                + "<button class =\"moreInfo\" id=\"" + storage.ArticleList[i]["id"] +  "\">"+translation("info")+"</button>"
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

$(document).on('click', ".Lang", function () {
    $('#movieBackground').hide();
    $('#listM').show().empty();
    // $('#listM').empty();
    var text = document.querySelector(".headerSearchName");
    storage.ArticleList= [];
    // storage.movieIdClicked=this.id;
        if (storage.currentLang === "en-US") {
            // $('#movieBackground').show();
            // Mivie List call
            storage.currentLang = "ru-RU";
            text.textContent = storage.ru.title
        } else  {
            storage.currentLang = "en-US";
            text.textContent = storage.en.title
        }
        if (storage.currentApi === "Grid") {
        CallAPI('movie/top_rated', '&page=' + storage.current_page, movieGrid, errorFunc); //API request for movie list
        //	https://api.themoviedb.org/3/movie/372058?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US

        }
        // else if (storage.currentApi == "About")
        else
        {
            moviePage();//API request for movie list
        }


});

function moviePage() {
    CallAPI("movie/"+ storage.movieIdClicked, "", movieAbout , errorFunc); //API request for movie list

    //	https://api.themoviedb.org/3/movie/372058?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US
    CallAPI("movie/"+ storage.movieIdClicked + "/similar", "", movieSimilar , errorFunc); //API request for movie list
	// CallAPI("movie/"+ storage.movieIdClicked + "/credits", "", movieSimilar , errorFunc); 
    //https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>>&language=en-US&page=1
}



// ----------- Событие на кнопку moreInfo, открывает страницу с конкретным фильмом ------

$(document).on('click', ".moreInfo", function () {
    storage.currentApi = "About";
    $('#listM').hide();
    storage.movieIdClicked=this.id;
    clearSearch("searchList");
    clearSearchValue("searchMovie");
    $('#movieBackground').show();
    // Mivie List call

    moviePage();

});



$(document).on('click', "#back", function (e) {
    storage.currentApi = "Grid";
    storage.ArticleList = [];
    $('#movieBackground').hide();
    $('#listM').show();

    CallAPI('movie/top_rated', '&page='+ storage.current_page, movieGrid, errorFunc);
    // }
});

// ------- similar films ----------------------------------------- карусель ------------------------------------
function movieSimilar(data) {
    storage.movieSimilar = data['results']; // add new object to existing array
  var resultHtml=  $("<div class=\"carousel-items\">");

    for (var i = 0; i < storage.movieSimilar.length; i++) {

        var image = storage.movieSimilar[i]["poster_path"] == null ? "Image/no-image.png" : "https://image.tmdb.org/t/p/w500/" + storage.movieSimilar[i]["poster_path"];

        // var cutString = storage.movieSimilar[i].overview.slice(0, 200);
        // storage.movieSimilar[i].overview = cutString.slice(0, cutString.lastIndexOf('.')) + '.';

        resultHtml.append(
            "<div class=\"carousel-block\" >"
            + "<img  id='"+ storage.movieSimilar[i]["id"] +"' src='" + image + "' class='poster img-fluid moreInfo'/>"
                 +   "</div>");
    }

    resultHtml.append("</div>");

    $(".carousel-wrapper").html(resultHtml);
};


    function movieAbout(data) {  // специальная ф-я, в аргументс приходят данные

    storage.movieItem = data; // add new object to existing array
        console.log(storage.movieItem);


        // -------------------------- формируем страницу о фильме -------------------------------------


        var image = storage.movieItem["poster_path"] == null ? "Image/no-image.png" :  storage.imgUrl + storage.movieItem["poster_path"];
    var imageBackground =  storage.movieItem["backdrop_path"];
    storage.movieBackground.style.display = 'block';
    storage.movieBackground.style.background = "url('https://image.tmdb.org/t/p/w500" + imageBackground +"') no-repeat";
    storage.movieBackground.style.backgroundSize = "cover";

    var resultHtml = $(

        "<div class=\"container\">"
    + " <div class=\"row\" id=\"movie\">"
    + " <div class=\"col-12 col-sm-12 col-md-12 col-lg-12 my-3\">"
    + "<button id=\"back\" class=\"btn btn-outline-warning my-2 my-sm-0\">"+translation("back")+"</button>"
    + "</div>"
    + "<div class=\"col-12 col-sm-4 col-md-4 col-lg-5 col-xl-4\">"
    + "<img class=\"imgAboutSrc\" src=\"" + image +"\">"
    + "</div>"
    + "<div class=\"col-12 col-sm-8 col-md-8 col-lg-7 col-xl-8 d-flex flex-column \">"
    + "<h4 class=\"card-title\">" + storage.movieItem["title"] +  "</h4> "
        + "<div id='icons'></div>"
    + "<p> "
    + storage.movieItem["overview"]
    + "</p>"
        + "<div id='genres'></div>"
       + "<div id='release'></div>"
    + "</div>"
       + "</div>"
       + "</div>"
        + "<div id = 'similar'>"
        +"<div class=\"carousel shadow\"><div class=\"carousel-button-left\"><a href=\"#\"></a></div>" +
        "<div class=\"carousel-button-right\"><a href=\"#\"></a></div><div class=\"carousel-wrapper\">"
        + "</div></div></div>"
    );
        // ------------------------- жанры -------------------------------------

        var genres = $("<ul>");
        for (var i = 0; i < storage.movieItem.genres.length; i++) {
            genres.append(
                "<li id='"    + storage.movieItem.genres[i]["id"] +"' class='genre badge badge-info'>" + storage.movieItem.genres[i]["name"] + "</li>"
            )
        }
        genres.append("</ul>");
        // ------------------------- дата выхода -------------------------------------
        var releaseHTML = $("<div>");
        releaseHTML.append(
            "<div  class='text-light font-size-1.2em'><i class=\"fas fa-tv mr-1\"></i>"+ translation('release')+ ": <span class='font-weight-bold'>" + storage.movieItem.release_date + "</span>" +
            "</div>"
        );


        // -------------------------- svg -------------------------------------



        var svgRating = $("<div id=\"ratingAll \">");
        svgRating.append(
            "<div class=\"rating \"><svg class='score' viewBox='-25 -25 450 400'>" +
            "<circle class='score-empty' cx='175' cy='175' r='175'> </circle>" +
            "<circle id='js-circle' class='js-circle score-circle' transform='rotate(-90 175 175)' cx='175' cy='175' r='175' style='stroke-dashoffset: 154;'></circle>" +
            "<text id='score-rating' class='js-text score-text' x='49%' y='51%' dx='-25' text-anchor='middle'></text></svg>" +
            "</div>" +
            "</div>" +
            "<div class='ratingText'>"+translation("rating")+"</div>"
    );

    // <div class="icons "><div class="rating"><svg class="score" viewBox="-25 -25 450 400"><circle class="score-empty" cx="175" cy="175" r="175"> </circle><circle id="js-circle" class="js-circle score-circle" transform="rotate(-90 175 175)" cx="175" cy="175" r="175" style="stroke-dashoffset: 154;"></circle><text id="score-rating" class="js-text score-text" x="49%" y="51%" dx="-25" text-anchor="middle">86%</text></svg></div></div><div class="ratingText">Рейтинг пользователя</div>

    $("#aboutMovie").html(resultHtml);
        $("#icons").html(svgRating);
        $("#genres").html(genres);
        $("#release").html(releaseHTML); // первое значение куда поместить, второе что именно(созданную переменную с HTML)

        const button = document.querySelector("js-button");
        const circle = document.getElementById("js-circle");
        const text = document.getElementById("score-rating");


// Circle radius, diameter and offset function

        const radius = circle.getAttribute("r");
        const diameter = Math.round(Math.PI * radius * 2);
        const getOffset = (val = 0) => Math.round((100 - val) / 100 * diameter);


// Generate random number and set offset and percentage
        let val = storage.movieItem.vote_average * 10;
        console.log(val);
        let run = () => {
            // const val = Math.floor(Math.random() * 100)
            circle.style.strokeDashoffset = getOffset(val);
            text.textContent = `${val}%`
        };

        run();
// storage.storageRun = run;
// Event listeners

        // button.addEventListener("click", run);
        document.addEventListener("DOMContentLoaded", () => setTimeout(run, 10))
}
// ------------------------------------- карусель -----------------------------------
$(document).on('click', ".carousel-button-right",function(){
    var carusel = $(this).parents('.carousel');
    right_carusel(carusel);
    return false;
});
//Обработка клика на стрелку влево
$(document).on('click',".carousel-button-left",function(){
    var carusel = $(this).parents('.carousel');
    left_carusel(carusel);
    return false;
});
function left_carusel(carusel){
    var block_width = $(carusel).find('.carousel-block').outerWidth();
    $(carusel).find(".carousel-items .carousel-block").eq(-1).clone().prependTo($(carusel).find(".carousel-items"));
    $(carusel).find(".carousel-items").css({"left":"-"+block_width+"px"});
    $(carusel).find(".carousel-items .carousel-block").eq(-1).remove();
    $(carusel).find(".carousel-items").animate({left: "0px"}, 200);

}
function right_carusel(carusel){
    var block_width = $(carusel).find('.carousel-block').outerWidth();
    $(carusel).find(".carousel-items").animate({left: "-"+ block_width +"px"}, 200, function(){
        $(carusel).find(".carousel-items .carousel-block").eq(0).clone().appendTo($(carusel).find(".carousel-items"));
        $(carusel).find(".carousel-items .carousel-block").eq(0).remove();
        $(carusel).find(".carousel-items").css({"left":"0px"});
    });
}

$(function() {
//Раскомментируйте строку ниже, чтобы включить автоматическую прокрутку карусели
//	auto_right('.carousel:first');
})

// Автоматическая прокрутка
function auto_right(carusel){
    setInterval(function(){
        if (!$(carusel).is('.hover'))
            right_carusel(carusel);
    }, 1000)
}
// Навели курсор на карусель
$(document).on('mouseenter', '.carousel', function(){$(this).addClass('hover')});
//Убрали курсор с карусели
$(document).on('mouseleave', '.carousel', function(){$(this).removeClass('hover')});


// --------  Search ---------------------------

function clearSearch(el) {
    document.getElementById(el).innerHTML = "";
}

function clearSearchValue(el){
    document.getElementById(el).value = "";
};
function noInput () {
    clearSearch('searchList');
}


$(document).on('keyup paste', "input", function () {

    var input = document.getElementById('searchMovie');
    clearSearch('searchList');
    if (input.value!=="") {
        CallAPI("search/movie", "&page=1&include_adult=false&query=" + input.value, searchList, noInput);
      //  https://api.themoviedb.org/3/search/movie?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US&page=1&include_adult=false&query=g//  call search render
        storage.currentApi="About";
    }
});
// --------  Search function ---------------------------

function searchList(data) {  // специальная ф-я, в аргументс приходят данные (это 3-ий параметр SUCCESS из $.ajax запросы, который мы занесли в ф-ю CallApi
    // storage.ArticleList = data["results"];
    storage.movieList =  data["results"]; // add new object to existing array
    // console.log(storage.movieList);

    var resultHtml = $("<div class=\"MovieList\" >");
    resultHtml.append("<div class=\"col-12 col-sm-12 col-md-8 input-group\" >");


    for (var i = 0; i < storage.movieList.length; i++) {

        var image = storage.movieList[i]["poster_path"] == null ? "Image/no-image.png" : "https://image.tmdb.org/t/p/w500/" + storage.ArticleList[i]["poster_path"];

        var cutString = storage.movieList[i].overview.slice(0, 200);
        storage.movieList[i].overview = cutString.slice(0, cutString.lastIndexOf('.')) + '.';

        resultHtml.append(
            "<div class=\"col-12  input-group \" >"
            // + "<div class=\"card movie-card\">"
            // + "<div class=\"rowMovieDiv row no-gutters\">"
            // + "<div class=\"imgDiv\">"
            // + "<img src=\"" + image + "\" class=\"poster img-fluid \"/>"
            // + "<div class=\"overlayPoster\">"
            // + "<div class =\"card-body\">"
            // + "<h4 class=\"card-title\">"
            +"<div class=\"searchHover\" role=\"alert\">"
            +         "<a href='#' class='moreInfo search' id='" + storage.movieList[i]['id'] +       "'>"       + storage.movieList[i]["title"]     + "</a>"
            + "</div>"

            // +"</h4>"
            // +"<p>" + storage.ArticleList[i]["overview"]
            // + "</p>"
            // + "<p class=\"card-footer\" >"
            // + "<button class =\"moreInfo\" id=\"" + storage.ArticleList[i]["id"] +  "\">More info</button>"
            // + "</p>"
            // + "</div>"
            // + "</div>"
            // +  "</div>"
            // + "</div>"
            // +  "</div>"
            +   "</div>");
    }

    resultHtml.append("</div></div>");


    $("#searchList").html(resultHtml);

    // Прячем выпадающий список
    $("#searchList").mouseleave(function(){
        $('.MovieList').hide();
    });

    //Paging(result["total_pages"]);
}