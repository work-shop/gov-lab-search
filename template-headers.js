"use strict";

module.exports = {
    projects: function(  ) {
        return $('<li>').attr('class', 'invisible col-xs-12 mt4 mb2').append( $('<h3>').attr('class', "results-header  header-bar small uppercase bold").text( "Projects" ) );
    },
    news: function(  ) {
        return $('<li>').attr('class', 'invisible col-xs-12 mt4 mb2').append($('<h3>').attr('class', "results-header  header-bar small uppercase bold").text( "Updates" ) );
    },
    output: function(  ) {
        return $('<li>').attr('class', 'invisible col-xs-12 mt4 mb2').append( $('<h3>').attr('class', "results-header  header-bar small uppercase bold").text( "Research" ) );
    }
};
