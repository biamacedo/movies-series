Search = {
    searchForMovie: function(movieName) {
        var movies = [];

        showLoading();
        imdb.search(movieName).done(function(data){
            if (data.Response !== undefined && data.Response === 'False'){
                hideLoading();
                console.log(data.Error);
                Search.showMessageResults(data.Error);
            } else {
                // console.log(data);
                movies = data.Search;

                Search.showResults(movies);
                hideLoading();
            }
        })
        .fail(function(error){
            hideLoading();
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
                                    <div class="item-media"><img src="' + poster + '" width="80"></div>\
                                    <div class="item-inner">\
                                        <div class="item-title-row">\
                                            <div class="item-title">' + item.Title + '</div>\
                                        </div>\
                                        <div class="item-subtitle">(' + item.Year + ')</div>\
                                        <div class="item-text">' + toTitleCase(item.Type) + '</div>\
                                    </div>\
                                </a>\
                            </li>';

            $("#searchList").append(newItem);
        });
    },

    showMessageResults: function(result){
        $("#searchList").html("");

        var message = '  <li class="card">\
                                <div class="card-content">\
                                    <div class="card-content-inner" style="text-align:center;">\
                                        <p>' + result + '</p>\
                                    </div>\
                                </div>\
                            </li>'

        $("#searchList").append(message);
    },

    loadError: function(errorMessage){
        alert(errorMessage);
    }
}
