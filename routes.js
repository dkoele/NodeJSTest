function setup(app, handlers) {
    app.get('/web/barcode', handlers.barcodeweb.showEntryPage);
    app.post('/web/barcode', handlers.barcodeweb.showScanResult);
//    app.get('/api/barcode/:barcode',handlers.barcode.getStatus);

}

exports.setup = setup;