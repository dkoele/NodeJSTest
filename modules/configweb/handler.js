var server = require('../../server');

function getStartPage(req, res){

    res.render('modules/configweb',{title : 'Configuration web services', subtitle : 'Postal Vision partner demo sites', routes : server.app.routes});
}

exports.getStartPage = getStartPage;