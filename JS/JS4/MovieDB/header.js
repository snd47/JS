//Storage
var storage = {
    movieList: []
}
//Search API

function searchMovie () {
    return fetch(
        'https://api.themoviedb.org/3/search/movie?api_key=1078453dc71a614c3a03d74c27fbdcb1&language=en-US&page=1&include_adult=false&query=' + input.value,
        {
            method: 'GET'
        }
    ).then(function(res) { return res.json()})
};
///movie/top_rated API

// -------------------------- Sarch Movies ---------------------------------------------------------
let input = document.getElementById('searchMovie');

input.oninput = function() {
    clearSearch('searchList')
       searchMovie()
        .then(function(res) {
            console.log(res)
            storage.movieList = res.results
            searchList.appendChild(MovieList())
        })
    };


function clearSearch(el){
    document.getElementById(el).innerHTML = "";
};

function MovieList () {
    var div = document.createElement('div')
    div.className = 'MovieList'
    if (input.value) {
        storage.movieList.forEach(function (item) {
            div.appendChild(ItemMovieFromList(item));
        })
    }
    return div
};


function ItemMovieFromList(data) {
    var searchList = document.createElement('div');

    var searchListUl = document.createElement('ul');
    var searchListLi = document.createElement('li');


    var aSearch = document.createElement('a')



    searchList.className = 'col-12 col-sm-12 col-md-8 input-group ';

    searchListUl.className = 'suggests-component';




    aSearch.className = 'ItemMovieFromSearchList'
    aSearch.innerText = data.title


    searchList.appendChild(searchListUl)
    searchListUl.appendChild(aSearch)
    aSearch.appendChild(searchListLi)


    return searchList
}
// }