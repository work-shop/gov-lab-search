"use strict";

var moment = require('moment');

module.exports = {

    // <li class="p0 col-sm-offset-1 col-sm-10 project-result search-result mb3">
    //     <a href="{{ url( item ) }}" class="link">
    //         <div class="col-sm-2 hidden-xs related-image-block-container">
    //             <div class="related-image-block" style="background-image:url('{{ item.images[0]|imageSize(250) }}');"></div>
    //         </div>
    //         <div class="col-sm-10 col-xs-12">
    //             <span class="h6 output-type uppercase bold mt0">Project</span>
    //             <span class="h6 uppercase gray bold mt0">{{ item.publish_date|date('F Y') }}</span>
    //             <h4 class="bold mt0">{{ item.name }}</h4>
    //             <p class="project-description small hidden-xs">{{ item.summary }}</p>
    //         </div>
    //     </a>
    // </li>


    "projects": function( result ) {
        if ( typeof result.image !== "undefined" ) {
            return $('<li>').attr('class', "invisible p0 col-xs-12 project-result search-result mb3")
                   .append( $('<a>').attr('href', result.slug).attr('class', 'link')
                            .append( $('<div>').attr('class', 'col-sm-2 hidden-x related-image-block-container')
                                .append( $('<div>').attr('class', 'related-image-block').attr('style', ['background-image:url(\'', [result.image,'=w300-h200'].join(''), '\');'].join('') ) )
                            )
                            .append( $('<div>').attr('class', 'col-sm-10')
                                     .append( $('<span>').attr('class', "h6 uppercase output-type bold mt0").text( "Project" ) )
                                     .append( $('<span>').attr('class', "h6 bold uppercase gray mt0").text( ', ' + result.timeline ) )
                                     .append( $('<h4>').attr('class', "bold mt0").text( result.title ) )
                                     .append( $('<p>').attr('class', "project-description small hidden-xs").text( result.summary ) )
                            )
                    );

        } else {
            return $('<li>').attr('class', "invisible p0 col-xs-12 project-result search-result mb3")
                   .append( $('<a>').attr('href', result.slug).attr('class', 'link')
                            .append( $('<h6>').attr('class', "output-type uppercase bold brand mt0").text( "Project" ) )
                            .append( $('<div>').attr('class', 'col-sm-12')
                                     .append( $('<h6>').attr('class', "bold uppercase mt0").text( ', ' + result.timeline ) )
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
                        .append( $('<div>').attr('class', 'col-sm-2 hidden-x related-image-block-container')
                            .append( $('<div>').attr('class', 'related-image-block').attr('style', ['background-image:url(\'', [result.image,'=w300-h200'].join(''), '\');'].join('') ) )
                        )
                        .append( $('<div>').attr('class', 'col-sm-10 col-xs-12')
                                 .append( $('<span>').attr('class', "h6 output-type uppercase bold mt0").text( "Update" ) )
                                 .append( $('<span>').attr('class', "h6 gray bold uppercase mt0").text( ', ' + moment( result.date ).format('MMMM Y') ) )
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
                           .append( $('<div>').attr('class', 'col-sm-2 hidden-x related-image-block-container')
                               .append( $('<div>').attr('class', 'related-image-block').attr('style', ['background-image:url(\'', [result.image,'=w300-h200'].join(''), '\');'].join('') ) )
                           )

                            .append( $('<div>').attr('class', 'col-sm-10 col-xs-12')
                                     .append( $('<span>').attr('class', "h6 output-type uppercase bold mt0").text( result.outputType ) )
                                     .append( $('<span>').attr('class', "h6 gray bold uppercase mt0").text( ', ' + moment( result.date ).format('MMMM Y') ) )
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
