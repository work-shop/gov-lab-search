"use strict";

console.log('[search] lift module required.');

var striptags = require('striptags');

/**
 * Given a structured collection of Webhook CMS entries,
 * this routine destructures that collection into a flat
 * array of typed documents for searching.
 *
 */
module.exports = function( data ) {

    console.log( data );

    function condense( objects, condensation ) {
       return objects
              .map( condensation )
              .filter( function( x ) {
                  return !x.isDraft;
              } );
    }

    function resolveWith( valueInterpolator ) {
        return function( identifier ) {
            if ( identifier !== "undefined undefined" ) {

                identifier = identifier.split(' ');
                var type = identifier[0].trim(), id = identifier[1].trim();

                var candidateSet = data[ type ].filter( function( o ) { return o._id === id; });

                if ( candidateSet.length > 1 ) { throw new Error( "SearchError: Structural Error, non-unique identifier (" + id + ") in datatype " + type +"."); }
                if ( candidateSet.length === 1 ) {

                    return valueInterpolator( candidateSet[0] );

                }
            }

        };
    }

    /**
     * Given an object with the structure of a project in the Webhook CMS,
     * this routine interprets that structure as a document compatible with lunr.
     */
    function collapseProjectObject( project ) {
        var interpolator = function( candidate ) { return candidate.name; };

        var funders = project.funders.map( resolveWith( interpolator ) );
        var team_members = project.team_members.map( resolveWith( interpolator ) );
        var region = resolveWith( interpolator )( project.region );
        var image = (typeof project.images[0] !== 'undefined') ? project.images[0].resize_url : undefined;

        return {
           type: project._type,
           isDraft: project.isDraft,
           slug: ['', project.slug].join('/'),
           funders: funders,
           team_members: team_members,
           region: region,
           image: image,
           timeline: project.project_timeline,
           title: project.name,
           date: project._sort_last_updated,
           shortname: project.shortname,
           summary: project.summary,
           body: striptags( project.body ),
           tags: funders.concat( team_members ).concat( [ region ] )
                 .filter( function ( o ) { return typeof o !== 'undefined'; } )
                 .join(' '),
            sorting: {
                updated: project._sort_last_updated,
                published: project._sort_publish_date,
            }
        };
    }

    /**
     * Given an object with the structure of a news in the Webhook CMS,
     * this routine interprets that structure as a document compatible with lunr.
     */
    function collapseNewsObject( news ) {
        var interpolator = function( candidate ) { return candidate.name; };

        var author = resolveWith( interpolator )( news.author );
        var image = (typeof news.cover_image !== 'undefined') ? news.cover_image.resize_url : undefined;

        return {
           type: news._type,
           isDraft: news.isDraft,
           slug: ['', news.slug].join('/'),
           author: author,
           date: news.news_date,
           title: news.name,
           summary: news.summary,
           image: image,
           body: striptags( news.story ),
           tags: author,
           sorting: {
               updated: news._sort_last_updated,
               published: news._sort_publish_date,
           }
        };
    }

    /**
     * Given an object with the structure of a output object in the Webhook CMS,
     * this routine interprets that structure as a document compatible with lunr.
     */
    function collapseResearchObject( research ) {
        var interpolator = function( candidate ) { return candidate.name; };

        var authors = research.authors.map( resolveWith( interpolator ) );
        var outputType = resolveWith( interpolator)( research.output_type );
        var image = (typeof research.cover_image !== 'undefined') ? research.cover_image.resize_url : undefined;

        return {
           type: research._type,
           isDraft: research.isDraft,
           slug: ['', research.slug].join('/'),
           authors: authors,
           outputType: outputType,
           title: research.name,
           summary: research.summary,
           image: image,
           date: research.publication_date || research.publish_date,
           body: striptags( research.description ),
           tags: authors.concat([ outputType ]).join(' '),
           sorting: {
               updated: research._sort_last_updated,
               published: research._sort_publish_date,
           }
        };
    }

    return condense( data.projects, collapseProjectObject )
           .concat( condense( data.news, collapseNewsObject ) )
           .concat( condense( data.output, collapseResearchObject ) )
           .map( function( entry, i ) {

               entry.id = i;

               return entry;

           });

};
