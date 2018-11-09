"use strict";

console.log('[search] index module required.');

var lunr = require('lunr');
var moment = require('moment');

module.exports = function( documents ) {

    function reverseChronological( items ) {
        return items.sort( function( a,b ) {
            var aDate = moment( a.date ), bDate = moment( b.date );

            return bDate.unix() - aDate.unix();

        });
    }

    /**
     * The resolveDocuments routine takes a set of result indices and scores
     * from ```lunr``` and reconstitutes them as the original documents.
     */
    function resolveDocuments( queryScores ) {
        return queryScores.map( function( score ) {
            documents[ score.ref ].score = score.score * 10;
            return documents[ score.ref ];
        });
    }

    /**
     * The partition function divides the result set of a given query into
     * a user-defined relation, optionally preprocessor the results according
     * to a user-defined sorting routine.
     */
    function partition( relation, items, preprocessor ) {
        var result = {};

        preprocessor = preprocessor || function( x ) { return x; };

        preprocessor( items ).forEach( function( item ) {
            // console.log( item.title );
            // console.log( item.date );
            // console.log( item.score );
            // console.log( '===\n' );

            if ( typeof result[ item[ relation ] ] === "undefined" ) {

                result[ item[relation] ] = [ item ];

            } else if ( Array.isArray( result[ item[ relation ] ] ) ) {

                result[ item[relation] ].push( item );

            }

        });

        return result;
    }

    /**
     * The query manager class implements a query method
     * which executes a query against the set of documents
     * and returns a sorted and partitioned set for rendering.
     */
    function QueryManager() {


        if (!(this instanceof QueryManager)) { return new QueryManager(); }
        var self = this;

        var index = lunr( function () {

            this.field('title', 10);
            this.field('summary', 50);
            this.field('tags', 100);
            this.field('body');

            this.ref('id');

        });

        documents.forEach( function( doc ) { index.add( doc ); });

        self.query = function( searchterms ) {

            return partition( 'type', resolveDocuments( index.search( searchterms ) ), reverseChronological );

        };

    }


    return QueryManager;
};
