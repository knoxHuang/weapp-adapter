cc.loader.downloader.loadSubpackage = function (name, completeCallback) {
    wx.loadSubpackage({
        name: name,
        success: function () {
            if (completeCallback) completeCallback();
        },
        fail: function () {
            if (completeCallback) completeCallback(new Error(`Failed to load subpackage ${name}`));
        }
    })
};

function downloadScript (item, callback, isAsync) {
    let url = '../../../' + item.url;
    require(url);
    callback(null, item.url);
}

cc.loader.downloader.addHandlers({
    js : downloadScript,

    pvr: cc.loader.downloader.extMap.png,
    etc: cc.loader.downloader.extMap.png,
});

cc.loader.loader.addHandlers({
    pvr: cc.loader.loader.extMap.png,
    etc: cc.loader.loader.extMap.png
});
