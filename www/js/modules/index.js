// =====================================================================
//  main.js
//  Contains code related to the main page
// =====================================================================

Main = {
    featureTotal: 1,
    mainStoriesTotal: 4,
    moviesTab: '#moviesTab',
    seriesTab: '#seriesTab',
    index: 0,
    totalStories: 0,

    refreshPage: function(){
        console.log('Starting Grid Refresh');
        showLoading();
        Main.totalStories = UserContent.content.movies.length
        console.log('Total movies: ' + Main.totalStories);

        Main.loadEmptyMessage(Main.moviesTab, 'movie');

        Main.loadFeature(Main.moviesTab, UserContent.content.movies);
        Main.loadMain(Main.moviesTab, UserContent.content.movies);
        Main.loadSub(Main.moviesTab, UserContent.content.movies);


        Main.totalStories = UserContent.content.series.length
        console.log('Total series: ' + Main.totalStories);


        Main.loadEmptyMessage(Main.seriesTab, 'tv series');

        Main.loadFeature(Main.seriesTab, UserContent.content.series);
        Main.loadMain(Main.seriesTab, UserContent.content.series);
        Main.loadSub(Main.seriesTab, UserContent.content.series);
        hideLoading();
    },

    loadEmptyMessage: function(tab, type){
        $(tab + ' #emptyMessage').html("");

        if (Main.totalStories <= 0){
            var message = '  <div class="list-block cards-list">\
                                <ul>\
                                    <li class="card">\
                                        <div class="card-content">\
                                            <div class="card-content-inner">\
                                                <p>No ' + type + ' yet. Search for your favorite ' + type + ' and add it to appear here!</p>\
                                            </div>\
                                        </div>\
                                    </li>\
                                </ul>\
                            </div>'

            $(tab + ' #emptyMessage').html(message);
        }
    },

    loadFeature: function(tab, list){
        $(tab + ' #main').html("");

        for(Main.index = 0; Main.index < Main.featureTotal && Main.index < Main.totalStories; Main.index++){
            console.log(Main.index);

            var poster = "img/default-poster.png";
            if (list[Main.index].Poster !== "N/A"){
                poster = list[Main.index].Poster;
            }

            var newFeature = '  <div class="columns large-8 feature">\
                                    <div class="aspect ratio-feature">\
                                    </div>\
                                    <div class="gutters">\
                                        <a class="clickable" href="pages/' + list[Main.index].Type + '.html?id=' + list[Main.index].imdbID + '&saved=true">\
                                            <div class="box" style="background-image: url(' + poster + ');">\
                                                <span class="text-box">\
                                                    <div class="title">' + list[Main.index].Title + '</div>\
                                                    <div class="color-gray">' + list[Main.index].Year + '</div>\
                                                </span>\
                                            </div>\
                                        </a>\
                                    </div>\
                                </div>';

            $(tab + ' #main').append(newFeature);
        }

        console.log('Inserted ' + Main.index + ' itens to feature grid');

    },
    loadMain: function(tab, list){

        for(; Main.index < Main.featureTotal + Main.mainStoriesTotal && Main.index < Main.totalStories; Main.index++){
            console.log(Main.index);

            var poster = "img/default-poster.png";
            if (list[Main.index].Poster !== "N/A"){
                poster = list[Main.index].Poster;
            }

            var newMain = '  <div class="large-4 columns">\
                                    <div class="aspect ratio-square">\
                                    </div>\
                                    <div class="gutters">\
                                        <a class="clickable" href="pages/' + list[Main.index].Type + '.html?id=' + list[Main.index].imdbID + '&saved=true">\
                                            <div class="box" style="background-image: url(' + poster + ');">\
                                                <span class="text-box">\
                                                    <div class="title">' + list[Main.index].Title + '</div>\
                                                    <div class="color-gray">' + list[Main.index].Year + '</div>\
                                                </span>\
                                            </div>\
                                        </a>\
                                    </div>\
                                </div>';

            $(tab + ' #main').append(newMain);
        }

    },
    loadSub: function(tab, list){
        $(tab + ' #sub').html("");

        for(; Main.index < Main.totalStories; Main.index++){
            console.log(Main.index);

            var poster = "img/default-poster.png";
            if (list[Main.index].Poster !== "N/A"){
                poster = list[Main.index].Poster;
            }

            var newSub = '  <div class="large-3 columns">\
                                    <div class="aspect ratio-square">\
                                    </div>\
                                    <div class="gutters">\
                                        <a class="clickable" href="pages/' + list[Main.index].Type + '.html?id=' + list[Main.index].imdbID + '&saved=true">\
                                            <div class="box" style="background-image: url(' + poster + ');">\
                                                <span class="text-box">\
                                                    <div class="title">' + list[Main.index].Title + '</div>\
                                                    <div class="color-gray">' + list[Main.index].Year + '</div>\
                                                </span>\
                                            </div>\
                                        </a>\
                                    </div>\
                                </div>';

            $(tab + ' #sub').append(newSub);
        }
    }
}
