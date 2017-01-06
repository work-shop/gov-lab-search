"use strict";

var moment = require('moment');

module.exports = {

    "projects": function( result ) {
        if ( typeof result.image !== "undefined" ) {
            return $('<li>').attr('class', "invisible p0 col-xs-12 project-result search-result mb3")
                   .append( $('<a>').attr('href', result.slug).attr('class', 'link')
                            .append( $('<div>').attr('class', 'col-sm-2')
                                .append( $('<h6>').attr('class', "output-type bold brand mt0").text( "Project" ) )
                                .append($('<img>').attr('class','bio-image').attr('src', [result.image,'=w300-h200'].join('') ))
                            )
                            .append( $('<div>').attr('class', 'col-sm-10')
                                     .append( $('<h6>').attr('class', "bold uppercase mt0").text( result.timeline ) )
                                     .append( $('<h4>').attr('class', "bold mt0").text( result.title ) )
                                     .append( $('<p>').attr('class', "project-description small hidden-xs").text( result.summary ) )
                            )
                    );

        } else {
            return $('<li>').attr('class', "invisible p0 col-xs-12 project-result search-result mb3")
                   .append( $('<a>').attr('href', result.slug).attr('class', 'link')
                            .append( $('<h6>').attr('class', "output-type bold brand mt0").text( "Project" ) )
                            .append( $('<div>').attr('class', 'col-sm-12')
                                     .append( $('<h6>').attr('class', "bold uppercase mt0").text( result.timeline ) )
                                     .append( $('<h4>').attr('class', "bold mt0").text( result.title ) )
                                     .append( $('<p>').attr('class', "project-description small hidden-xs").text( result.summary ) )
                            )
                    );
        }
    },

    "news": function( result ) {

        if ( typeof result.image !== "undefined" ) {
            return $('<li>').attr('class', "invisible p0 col-xs-12 project-result search-result mb3")
                .append( $('<a>').attr('href', result.slug).attr('class', 'link')
                        .append( $('<div>').attr('class', 'col-sm-2 hidden-xs')
                            .append( $('<h6>').attr('class', "output-type bold brand mt0").text( "Update" ) )
                            .append($('<img>').attr('class','bio-image').attr('src', [result.image,'=w300-h200'].join('') ))
                        )
                        .append( $('<div>').attr('class', 'col-sm-10 col-xs-12')
                                 .append( $('<h6>').attr('class', "bold uppercase mt0").text( moment( result.date ).format('MMMM Y') ) )
                                 .append( $('<h4>').attr('class', "bold mt0").text( result.title ) )
                                 .append( $('<p>').attr('class', "project-description small hidden-xs").text( result.summary ) )
                                // .append( $('<div>').attr('class', "block news-rule-xs mt2 mb1") )
                                // .append( $('<p>').attr('class', "project-description small hidden-xs").text( result.author ) )
                        )
                );
        } else {
            return $('<li>').attr('class', "invisible p0 col-xs-12 project-result search-result mb3")
                    .append( $('<a>').attr('href', result.slug).attr('class', 'link')
                        .append( $('<h6>').attr('class', "col-sm-12 output-type bold brand mt0").text( "Update" ) )
                        .append( $('<div>').attr('class', 'col-sm-12 col-xs-12')
                                 .append( $('<h6>').attr('class', "bold uppercase mt0").text( moment( result.date ).format('MMMM Y') ) )
                                 .append( $('<h4>').attr('class', "bold mt0").text( result.title ) )
                                 .append( $('<p>').attr('class', "project-description small hidden-xs").text( result.summary ) )
                                // .append( $('<div>').attr('class', "block news-rule-xs mt2 mb1") )
                                // .append( $('<p>').attr('class', "project-description small hidden-xs").text( result.author ) )
                        )
                );
        }
    },

    "output": function( result ) {
        if ( typeof result.image !== "undefined" ) {
            return $('<li>').attr('class', "invisible p0 col-xs-12 project-result search-result mb3")
                   .append( $('<a>').attr('href', result.slug).attr('class', 'link')
                            .append( $('<div>').attr('class', 'col-sm-2 hidden-xs')
                                .append( $('<h6>').attr('class', "output-type bold brand mt0").text( ["Research", result.outputType ].join(' ') ) )
                                .append($('<img>').attr('class','bio-image').attr('src', [result.image,'=w300-h200'].join('') ))
                            )
                            .append( $('<div>').attr('class', 'col-sm-10 col-xs-12')
                                     .append( $('<h6>').attr('class', "bold uppercase mt0").text( moment( result.date ).format('MMMM Y') ) )
                                     .append( $('<h4>').attr('class', "bold mt0").text( result.title ) )
                                     .append( $('<p>').attr('class', "project-description small hidden-xs").text( result.summary ) )
                                    // .append( $('<div>').attr('class', "block news-rule-xs mt2 mb1") )
                                    // .append( $('<p>').attr('class', "project-description small hidden-xs").text( result.authors.join(', ') ) )
                            )
                    );
        } else {
            return $('<li>').attr('class', "invisible p0 col-xs-12 project-result search-result mb3")
                   .append( $('<a>').attr('href', result.slug).attr('class', 'link')
                            .append( $('<h6>').attr('class', "col-sm-12  output-type bold brand mt0").text( ["Research", result.outputType ].join(' ') ) )
                            .append( $('<div>').attr('class', 'col-sm-12 col-xs-12')
                                     .append( $('<h6>').attr('class', "bold uppercase mt0").text( moment( result.date ).format('MMMM Y') ) )
                                     .append( $('<h4>').attr('class', "bold mt0").text( result.title ) )
                                     .append( $('<p>').attr('class', "project-description small hidden-xs").text( result.summary ) )
                                    // .append( $('<div>').attr('class', "block news-rule-xs mt2 mb1") )
                                    // .append( $('<p>').attr('class', "project-description small hidden-xs").text( result.authors.join(', ') ) )
                            )
                    );

        }
    }
};
