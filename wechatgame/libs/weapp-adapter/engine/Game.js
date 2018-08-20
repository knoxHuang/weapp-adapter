

var _frameRate = 60;
cc.game.setFrameRate = function (frameRate) {
    _frameRate = frameRate;
    wx.setPreferredFramesPerSecond(frameRate);
};

cc.game.getFrameRate = function () {
    return _frameRate;
};