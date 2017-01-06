"use strict";

module.exports = {

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
