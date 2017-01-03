"use strict";

console.log('[search] index module required.');

var lunr = require('lunr');

module.exports = function( documents ) {

    function resolveDocuments( queryScores ) {
        return queryScores.map( function( score ) {
            return documents[ score.ref ];
        });
    }

    function partition( relation, items, postprocessor ) {
        var result = {};

        items.forEach( function( item ) {
            if ( typeof result[ item[ relation ] ] === "undefined" ) {

                result[ item[relation] ] = [ item ];

            } else if ( Array.isArray( result[ item[ relation ] ] ) ) {

                result[ item[relation] ].push( item );

            }

        });

        return result;
    }

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

            return partition( 'type', resolveDocuments( index.search( searchterms ) ) );

        };

    }


    return QueryManager;
};
