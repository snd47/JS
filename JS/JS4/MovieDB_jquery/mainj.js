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

$(document).ready(function () {
    $(window).load(function (e) {
        var validate = Validate();
        $("#listM").html(validate);
        if (validate.length == 0) {
            CallAPI(1);
        }
    });
    function CallAPI(page) {
        $.ajax({
            url: "https://api.themoviedb.org/3/movie/top_rated?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US&page=" + page,
            // url: "https://api.themoviedb.org/3/search/person?language=en-US&query=" + $("#searchInput").val() + "&page=" + page + "&include_adult=false",
            data: { "api_key": "1078453dc71a614c3a03d74c27fbdcb1" },
            // data: { "api_key": "3356865d41894a2fa9bfa84b2b5f59bb" },
            dataType: "json",
            success: function success(result, status, xhr) {
                // занести в storage.ArticleList

                storage.ArticleList = result["results"];
                var resultHtml = $("<div class=\"row\" id=\"articleList\">");
                for (var i = 0; i < storage.ArticleList.length; i++) {

                    var image = storage.ArticleList[i]["poster_path"] == null ? "Image/no-image.png" : "https://image.tmdb.org/t/p/w500/" + storage.ArticleList[i]["poster_path"];

                    var cutString = storage.ArticleList[i].overview.slice(0, 200);
                    storage.ArticleList[i].overview = cutString.slice(0, cutString.lastIndexOf('.')) + '.';

                    resultHtml.append("<div class=\"result col-12 col-sm-12 col-md-9 col-lg-3\" resourceId=\"" + storage.ArticleList[i]["id"] + "\">" + "<div class=\"card movie-card\">" + "<div class=\"rowMovieDiv row no-gutters\">" + "<div class=\"imgDiv\">" + "<img src=\"" + image + "\" class=\"poster\" />" + "</div><div class=\"overlayPoster\"><div class =\"card-body\"><h4 class=\"card-title\"><a>" + storage.ArticleList[i]["title"] + "</a></h4><p>" + storage.ArticleList[i]["overview"] + "</p><p class=\"card-footer\">More info</p></div></div></div></div></div>");
                }

                resultHtml.append("</div>");
                $("#listM").html(resultHtml);

                //Paging(result["total_pages"]);
            },
            error: function error(xhr, status, _error) {
                $("#message").html("Result: " + status + " " + _error + " " + xhr.status + " " + xhr.statusText);
            }
        });
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
});