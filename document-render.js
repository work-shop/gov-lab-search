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
    var renderHeader = require('./template-headers.js');

    var render = require('./template-cards.js');

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
