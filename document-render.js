"use strict";

var moment = require('moment');

/**
 *
 *
 *
 */
module.exports = function( search ) {
    var queryInput = $( '#search-input' );
    var queryOutput = $('#results');
    var cutoff = 2;

    var renderHeader = {
        "projects": function(  ) {
            return $('<li>').attr('class', 'mt4 mb2').append( $('<h3>').attr('class', "results-header header-bar small uppercase bold").text( "Projects" ) );
        },
        "news": function(  ) {
            return $('<li>').attr('class', 'mt4 mb2').append($('<h3>').attr('class', "results-header header-bar small uppercase bold").text( "News" ) );
        },
        "output": function(  ) {
            return $('<li>').attr('class', 'mt4 mb2').append( $('<h3>').attr('class', "results-header header-bar small uppercase bold").text( "Research" ) );
        }
    };

    var render = {

        "projects": function( result ) {
            if ( typeof result.image !== "undefined" ) {
                return $('<li>').attr('class', "row project-result search-result mb2")
                       .append( $('<a>').attr('href', result.slug).attr('class', 'link')
                                .append( $('<div>').attr('class', 'col-sm-3').append($('<img>').attr('class','bio-image').attr('src', [result.image,'=w300-h200'].join('') ))
                                )
                                .append( $('<div>').attr('class', 'col-sm-9')
                                         .append( $('<h4>').attr('class', "bold").text( result.title ) )
                                         .append( $('<p>').attr('class', "project-description small hidden-xs").text( result.summary ) )
                                )
                        );

            } else {
                return $('<li>').attr('class', "p0 row project-result search-result mb2")
                       .append( $('<a>').attr('href', result.slug).attr('class', 'link')
                                .append( $('<div>').attr('class', 'col-sm-12')
                                         .append( $('<h4>').attr('class', "bold").text( result.title ) )
                                         .append( $('<p>').attr('class', "project-description small hidden-xs").text( result.summary ) )
                                )
                        );
            }
        },
        "news": function( result ) {
            return $('<li>').attr('class', "p0 row project-result search-result mb2")
                   .append( $('<a>').attr('href', result.slug).attr('class', 'link')
                            .append( $('<div>').attr('class', 'col-sm-12')
                                     .append( $('<h5>').attr('class', "brand uppercase").text( moment( result.date ).format('MMMM Y') ) )
                                     .append( $('<h4>').attr('class', "bold").text( result.title ) )
                                     .append( $('<p>').attr('class', "project-description small hidden-xs").text( result.summary ) )
                            )
                    );
        },
        "output": function( result ) {
            return $('<li>').attr('class', "p0 row project-result search-result mb2")
                   .append( $('<a>').attr('href', result.slug).attr('class', 'link')
                            .append( $('<div>').attr('class', 'col-sm-12')
                                     .append( $('<h5>').attr('class', "brand uppercase").text( result.outputType ) )
                                     .append( $('<h4>').attr('class', "bold").text( result.title ) )
                                     .append( $('<p>').attr('class', "project-description small hidden-xs").text( result.summary ) )
                            )
                    );
        }
    };

    function updateResultSet( results ) {

        queryOutput.children().remove();

        ['projects', 'news', 'output'].forEach( function( type ) {
            if ( typeof results[ type ] !== "undefined" ) {
                results[ type ].forEach( function( result, i ) {

                    if ( i === 0 ) { queryOutput.append( renderHeader[ type ]() ); }

                    queryOutput.append( render[ type ]( result ) );

                });
            }

        });

    }

    queryInput.on('keyup', function( ) {
        var val = queryInput.val();

        if ( val.length > cutoff ) {

            updateResultSet( search.query( val ) );

        }

    });


};
