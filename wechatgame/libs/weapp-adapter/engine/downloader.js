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

cc.loader.downloader.addHandlers({
    pvr: cc.loader.downloader.extMap.png,
    etc: cc.loader.downloader.extMap.png
});

cc.loader.loader.addHandlers({
    pvr: cc.loader.loader.extMap.png,
    etc: cc.loader.loader.extMap.png
});
