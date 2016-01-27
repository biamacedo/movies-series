Search = {
    searchForMovie: function(movieName) {
        var movies = [];

        imdb.search(movieName).done(function(data){
            if (data.Response !== undefined && data.Response === 'False'){
                Search.loadError(data.Error);
            } else {
                console.log(data);
                movies = data.Search;

                Search.showResults(movies);
            }
        })
        .fail(function(error){
            console.log(error);
            Search.loadError(error);
        });
    },

    showResults: function(list){
        $("#searchList").html("");

        $.each(list, function(i, item) {
            console.log(item);

            var poster = "img/default-poster.png";
            if (item.Poster !== "N/A"){
                poster = item.Poster;
            }

            var newItem = ' <li>\
                                <a href="pages/' + item.Type + '.html?id=' + item.imdbID + '" class="item-link item-content">\
                                    <div class="item-media"><img src="' + item.Poster + '" width="80"></div>\
                                    <div class="item-inner">\
                                        <div class="item-title-row">\
                                            <div class="item-title">' + item.Title + '</div>\
                                            <!-- <div class="item-after">$15</div> -->\
                                        </div>\
                                        <div class="item-subtitle">' + item.Year + '</div>\
                                        <div class="item-text">' + item.Type + '</div>\
                                    </div>\
                                </a>\
                            </li>';

            $("#searchList").append(newItem);
        });
    },

    loadError: function(errorMessage){
        alert(errorMessage);
    }
}
