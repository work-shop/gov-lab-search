"use strict";

var moment = require('moment');

/**
 * This module deals with rendering the results of a search query.
 * It's job is to take a partition of the search results, divided by
 * type, and render these results in the search window.
 *
 */
module.exports = function( search ) {
    var queryInput = $( '#search-input' );
    var queryOutput = $('#results');
    var queryResultCount = $('#result-count');
    var cutoff = 2;

    /**
     * This object contains header rendering methods divided by type
     *
     */
    var renderHeader = {
        "projects": function(  ) {
            return $('<li>').attr('class', 'invisible col-xs-12 mt4 mb2').append( $('<h3>').attr('class', "results-header  header-bar small uppercase bold").text( "Projects" ) );
        },
        "news": function(  ) {
            return $('<li>').attr('class', 'invisible col-xs-12 mt4 mb2').append($('<h3>').attr('class', "results-header  header-bar small uppercase bold").text( "News" ) );
        },
        "output": function(  ) {
            return $('<li>').attr('class', 'invisible col-xs-12 mt4 mb2').append( $('<h3>').attr('class', "results-header  header-bar small uppercase bold").text( "Research" ) );
        }
    };

    var render = {

        "projects": function( result ) {
            if ( typeof result.image !== "undefined" ) {
                return $('<li>').attr('class', "invisible col-xs-12 project-result search-result mb3")
                       .append( $('<a>').attr('href', result.slug).attr('class', 'link')
                                .append( $('<div>').attr('class', 'col-sm-3').append($('<img>').attr('class','bio-image').attr('src', [result.image,'=w300-h200'].join('') ))
                                )
                                .append( $('<div>').attr('class', 'col-sm-9')
                                         .append( $('<h4>').attr('class', "bold mt0").text( result.title ) )
                                         .append( $('<p>').attr('class', "project-description small hidden-xs").text( result.summary ) )
                                )
                        );

            } else {
                return $('<li>').attr('class', "invisible p0 col-xs-12 project-result search-result mb2")
                       .append( $('<a>').attr('href', result.slug).attr('class', 'link')
                                .append( $('<div>').attr('class', 'col-sm-12')
                                         .append( $('<h4>').attr('class', "bold mt0").text( result.title ) )
                                         .append( $('<p>').attr('class', "project-description small hidden-xs").text( result.summary ) )
                                )
                        );
            }
        },
        "news": function( result ) {
            return $('<li>').attr('class', "invisible p0 col-xs-12 project-result search-result mb2")
                   .append( $('<a>').attr('href', result.slug).attr('class', 'link')
                            .append( $('<div>').attr('class', 'col-sm-12')
                                     .append( $('<h6>').attr('class', "bold uppercase").text( moment( result.date ).format('MMMM Y') ) )
                                     .append( $('<h4>').attr('class', "bold mt0").text( result.title ) )
                                     .append( $('<p>').attr('class', "project-description small hidden-xs").text( result.summary ) )
                                     .append( $('<div>').attr('class', "block news-rule-xs mt2 mb1") )
                                     .append( $('<p>').attr('class', "project-description small hidden-xs").text( result.author ) )
                            )
                    );
        },
        "output": function( result ) {
            return $('<li>').attr('class', "invisible p0 col-xs-12 project-result search-result mb2")
                   .append( $('<a>').attr('href', result.slug).attr('class', 'link')
                            .append( $('<div>').attr('class', 'col-sm-12')
                                     .append( $('<h6>').attr('class', "output-type bold brand mt0").text( result.outputType ) )
                                     .append( $('<h4>').attr('class', "bold").text( result.title ) )
                                //   .append( $('<p>').attr('class', "project-description small hidden-xs").text( result.summary ) )
                                     .append( $('<div>').attr('class', "block news-rule-xs mt2 mb1") )
                                     .append( $('<p>').attr('class', "project-description small hidden-xs").text( result.authors.join(', ') ) )
                            )
                    );
        }
    };

    function describe( count, type ) {
        switch ( type ) {
            case "projects":
                return (count === 1) ? "Project" : "Projects";

            case "news":
                return (count === 1) ? "Update" : "Updates";

            case "output":
                return (count === 1) ? "Research Result" : "Research Results";

            default:
                throw new Error('Search: Unrecognized Result Type (' + type + ').' );

        }
    }

    function updateResultSet( results ) {

        queryOutput.children().remove();

        ['projects', 'news', 'output'].forEach( function( type ) {
            if ( typeof results[ type ] !== "undefined" ) {
                var resultCount = results[ type ].length;

                queryResultCount.find( ['.', type, '-count' ].join('') ).addClass('bold').addClass('brand').text( resultCount );
                queryResultCount.find( ['.', type, '-postfix' ].join('') ).addClass('bold').text( describe( resultCount, type ) );

                results[ type ].forEach( function( result, i ) {

                    if ( i === 0 ) {
                        var header = renderHeader[ type ]()
                        queryOutput.append( header );
                        header.removeClass('invisible');
                    }

                    var renderedResult = render[ type ]( result );

                    queryOutput.append( renderedResult );
                    renderedResult.removeClass('invisible');

                });

            } else {

                queryResultCount.find( ['.', type, '-count' ].join('') ).removeClass('bold').removeClass('brand').text( 0 );
                queryResultCount.find( ['.', type, '-postfix' ].join('') ).removeClass('bold').text( describe( 0, type ) );

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
