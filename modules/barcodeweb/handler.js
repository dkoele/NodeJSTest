// barcodeweb handler
function showEntryPage(req,res) {
    res.render('form', {title : 'Barcodeweb handler'});
    //res.end('Hello BarcodeWeb ShowEntryPage');
};
exports.showEntryPage = showEntryPage;

function showScanResult(req,res) {
    res.render('form', {title : 'RESULT'});
    //res.end('Hello BarcodeWeb ShowEntryPage');
};
exports.showScanResult = showScanResult;
