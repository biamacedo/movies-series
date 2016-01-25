imdb = {
    apiUrl: 'http://www.omdbapi.com/',
    search: function(inputSearch){
        return $.getJSON(imdb.apiUrl + "?s=" + inputSearch);
    },
    getById: function(id){
        return $.getJSON(imdb.apiUrl + "?i=" + id);
    }
}
