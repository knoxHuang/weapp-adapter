var settings = window._CCSettings;

cc.director.once(cc.Director.EVENT_BEFORE_SCENE_LOADING, function () {
    cc.Pipeline.Downloader.PackDownloader._doPreload("WECHAT_SUBDOMAIN", settings.WECHAT_SUBDOMAIN_DATA);
});

// Canvas component adaptation

cc.Canvas.prototype.update = function () {
    if (this._width !== cc.game.canvas.width || this._height !== cc.game.canvas.height) {
        this.applySettings();
    }
};

cc.Canvas.prototype.applySettings = function () {
    var ResolutionPolicy = cc.ResolutionPolicy;
    var policy;
    if (this.fitHeight && this.fitWidth) {
        policy = ResolutionPolicy.SHOW_ALL;
    }
    else {
        if (this.fitWidth) {
            policy = ResolutionPolicy.FIXED_WIDTH;
        }
        else if (this.fitHeight) {
            policy = ResolutionPolicy.FIXED_HEIGHT;
        }
        else {
            policy = ResolutionPolicy.NO_BORDER
        }
    }
    var designRes = this._designResolution;
    cc.view.setDesignResolutionSize(designRes.width, designRes.height, policy);
    this._width = cc.game.canvas.width;
    this._height = cc.game.canvas.height;
};