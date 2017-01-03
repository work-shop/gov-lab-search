console.log('[search] search module required.');

var lift = require('./document-lift.js');
var index = require('./document-index.js');
var render = require('./document-render.js');

render( index( lift( data ) ) );
