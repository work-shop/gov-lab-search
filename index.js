console.log('[search] search module required.');

var lift = require('./document-lift.js');
var index = require('./document-index.js');
var render = require('./document-render.js');

/**
 * The ```data``` parameter is an assumed global parameter
 * supplied by the embedding context, containing the Webhook cms.
 */
var Search = index( lift( data ) )();


render( Search );
