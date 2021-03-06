"use strict";

var moment = require('moment');

/**
 * This module deals with rendering the results of a search query.
 * It's job is to take a partition of the search results, divided by
 * type, and render these results in the search window.
 *
 */
module.exports = function( search, names ) {
    var queryInput = $( '#search-input' );
    var queryOutput = $('#results');
    var queryResultCount = $('#result-count');
    var cutoff = 2;

    var typeOrder = ['projects', 'output', 'news' ];

    var threshold_score = .05;

    /**
     * This object contains header rendering methods divided by type
     *
     */
    //var renderHeader = require('./template-headers.js');

    var render = require('./template-cards.js');

    function describe( count, type ) {
        switch ( type ) {
            case "projects":
                return (count === 1) ? names.projects.singular : names.projects.plural;

            case "news":
                return (count === 1) ? names.news.singular : names.news.plural;

            case "output":
                return (count === 1) ? names.output.singular : names.output.plural;

            default:
                throw new Error('Search: Unrecognized Result Type (' + type + ').' );

        }
    }

    function updateResultSet( results ) {

        queryOutput.children().remove();

        console.log( results );

        typeOrder.forEach( function( type ) {
            if ( typeof results[ type ] !== "undefined" ) {
                var resultCount = results[ type ].length;

                queryResultCount.find( ['.', type, '-count' ].join('') ).addClass('bold').addClass('brand').text( resultCount );
                queryResultCount.find( ['.', type, '-postfix' ].join('') ).addClass('bold').text( describe( resultCount, type ) );

                results[ type ].forEach( function( result ) {

                    var renderedResult = render[ type ]( result, names );

                    queryOutput.append( renderedResult );
                    renderedResult.removeClass('invisible');

                });

            } else {

                queryResultCount.find( ['.', type, '-count' ].join('') ).removeClass('bold').removeClass('brand').text( 0 );
                queryResultCount.find( ['.', type, '-postfix' ].join('') ).removeClass('bold').text( describe( 0, type ) );

            }

        });

    }


    function updateResultSetReverseChronological( results ) {

        queryOutput.children().remove();

        var merged = typeOrder
                        .map( function( t ) { return results[t]; })
                        .reduce( function( a,b ) { return a.concat( b ); }, [])
                        .filter( function( a ) { return a.score >= threshold_score; });

        merged.sort( function( a,b ) {
            return Math.sign( b.sorting.published - a.sorting.published );
        });

        typeOrder.forEach( function( type ) {
            var resultCount = results[ type ].length;

            queryResultCount.find( ['.', type, '-count' ].join('') ).addClass('bold').addClass('brand').text( resultCount );
            queryResultCount.find( ['.', type, '-postfix' ].join('') ).addClass('bold').text( describe( resultCount, type ) );

        });

        merged.forEach( function( result ) {
            var renderedResult = render[ result.type ]( result, names );

            queryOutput.append( renderedResult );
            renderedResult.removeClass('invisible');

        });

        console.log( merged );

    }

    queryInput.on('keyup', function( ) {
        var val = queryInput.val();

        if ( val.length > cutoff ) {

            updateResultSetReverseChronological( search.query( val ) );

        }

    });


};
