Main = {
    featureTotal: 1,
    mainStoriesTotal: 4,
    movieTab: '#movieTab',
    seriesTab: '#seriesTab',
    index: 0,
    totalStories: 0,

    loadGrids: function(){
        Main.totalStories = UserContent.movies.length

        Main.loadFeature(Main.movieTab, UserContent.movies);
        Main.loadMain(Main.movieTab, UserContent.movies);
        Main.loadSub(Main.movieTab, UserContent.movies);

    },
    loadFeature: function(tab, list){
        $(tab + ' #main').html("");

        for(Main.index = 0; Main.index < Main.featureTotal && Main.index < Main.totalStories; Main.index++){
            var newFeature = '  <div class="columns large-8 feature">\
                                    <div class="aspect ratio-feature">\
                                    </div>\
                                    <div class="gutters">\
                                        <a href="pages/' + list[0].Type + '.html?id=' + list[0].imdbID + '">\
                                            <div class="box" style="background-image: url("' + list[0].Poster + '");">\
                                                <span class="text-box">\
                                                    <div class="title">' + list[0].Title + '</div>\
                                                    ' + list[0].Year + '\
                                                </span>\
                                            </div>\
                                        </a>\
                                    </div>\
                                </div>';

            $(tab + ' #main').append(newFeature);
        }

        console.log('Inserted ' + Main.index + 'itens to grid');

    },
    loadMain: function(tab, list){

        for(; Main.index < Main.featureTotal + Main.mainStoriesTotal && Main.index < Main.totalStories; Main.index++){
            var newMain = '  <div class="large-4 columns">\
                                    <div class="aspect ratio-square">\
                                    </div>\
                                    <div class="gutters">\
                                        <a href="pages/' + list[0].Type + '.html?id=' + list[0].imdbID + '">\
                                            <div class="box" style="background-image: url("' + list[0].Poster + '");">\
                                                <span class="text-box">\
                                                    <div class="title">' + list[0].Title + '</div>\
                                                    ' + list[0].Year + '\
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
            var newSub = '  <div class="large-3 columns">\
                                    <div class="aspect ratio-square">\
                                    </div>\
                                    <div class="gutters">\
                                        <a href="pages/' + list[0].Type + '.html?id=' + list[0].imdbID + '">\
                                            <div class="box" style="background-image: url("' + list[0].Poster + '");">\
                                                <span class="text-box">\
                                                    <div class="title">' + list[0].Title + '</div>\
                                                    ' + list[0].Year + '\
                                                </span>\
                                            </div>\
                                        </a>\
                                    </div>\
                                </div>';

            $(tab + ' #sub').append(newSub);
        }
    }
}
