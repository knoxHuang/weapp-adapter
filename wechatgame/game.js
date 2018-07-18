require('libs/weapp-adapter/index');
var Parser = require('libs/xmldom/dom-parser');
window.DOMParser = Parser.DOMParser;
require('libs/wx-downloader.js');
require('src/settings');
require('main');
require(window._CCSettings.debug ? 'cocos2d-js.js' : 'cocos2d-js-min.js');
require('./libs/weapp-adapter/engine/index.js');

wxDownloader.REMOTE_SERVER_ROOT = "";
wxDownloader.SUBCONTEXT_ROOT = "";
var pipeBeforeDownloader = cc.loader.md5Pipe || cc.loader.assetLoader;
cc.loader.insertPipeAfter(pipeBeforeDownloader, wxDownloader);

if (cc.sys.browserType === cc.sys.BROWSER_TYPE_WECHAT_GAME_SUB) {
    cc.Pipeline.Downloader.PackDownloader._doPreload("WECHAT_SUBDOMAIN", window._CCSettings.WECHAT_SUBDOMAIN_DATA);
}

window.boot();