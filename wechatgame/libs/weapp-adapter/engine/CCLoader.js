cc.loader.loadSubpackage = function (name, completeCallback) {
    wx.loadSubpackage({
        name: name,
        success: completeCallback,
        fail: completeCallback
    })
};