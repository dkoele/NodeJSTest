var server = require('../../server');

function getStartPage(req, res){

    res.render('modules/defaultweb',{title : 'Demo web services', subtitle : 'Postal Vision partner demo sites', routes : server.app.routes});
}

exports.getStartPage = getStartPage;