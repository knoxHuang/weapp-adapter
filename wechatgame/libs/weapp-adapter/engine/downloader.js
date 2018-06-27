cc.loader.downloader.loadSubpackage = function (name, completeCallback) {
    wx.loadSubpackage({
        name: name,
        success: function () {
            completeCallback();
        },
        fail: function () {
            completeCallback(new Error(`Failed to load subpackage ${name}`));
        }
    })
};