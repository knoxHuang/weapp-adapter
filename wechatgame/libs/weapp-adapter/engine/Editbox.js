let KeyboardReturnType = cc.EditBox.KeyboardReturnType;
let _p = cc.EditBox._EditBoxImpl.prototype;

function getKeyboardReturnType (type) {
    switch (type) {
        case KeyboardReturnType.DEFAULT:
        case KeyboardReturnType.DONE:
            return 'done';
        case KeyboardReturnType.SEND:
            return 'send';
        case KeyboardReturnType.SEARCH:
            return 'search';
        case KeyboardReturnType.GO:
            return 'go';
        case KeyboardReturnType.NEXT:
            return 'next';
    }
    return 'done';
}

_p.createInput = function () {
    this.removeDom();

    let multiline = this._inputMode === cc.EditBox.InputMode.ANY;
    let editBoxImpl = this;
    let tmpEdTxt = editBoxImpl._edTxt = document.createElement("input");
    tmpEdTxt.type = "text";

    function onKeyboardConfirmCallback (res) {
        editBoxImpl._text = res.value;
        editBoxImpl._delegate && editBoxImpl._delegate.editBoxEditingReturn && editBoxImpl._delegate.editBoxEditingReturn();
        wx.hideKeyboard({
            success: function (res) {
                editBoxImpl._delegate && editBoxImpl._delegate.editBoxEditingDidEnded && editBoxImpl._delegate.editBoxEditingDidEnded();
            },
            fail: function (res) {
                cc.warn(res.errMsg);
            }
        });
    }

    function onKeyboardInputCallback (res) {        
		if (res.value.length > editBoxImpl._maxLength) {
			res.value = res.value.slice(0, editBoxImpl._maxLength);
		}
		if (editBoxImpl._delegate && editBoxImpl._delegate.editBoxTextChanged) {
			if (editBoxImpl._text !== res.value) {
				editBoxImpl._text = res.value;
				editBoxImpl._delegate.editBoxTextChanged(editBoxImpl._text);
			}
		}
    }

    function onKeyboardCompleteCallback () {
        editBoxImpl._endEditing();
        wx.offKeyboardConfirm(onKeyboardConfirmCallback);
        wx.offKeyboardInput(onKeyboardInputCallback);
        wx.offKeyboardComplete(onKeyboardCompleteCallback);
    }

    tmpEdTxt.focus = function () {
        wx.showKeyboard({
            defaultValue: editBoxImpl._text,
            maxLength: 140,
            multiple: multiline,
            confirmHold: true,
            confirmType: getKeyboardReturnType(editBoxImpl._returnType),
            success: function (res) {
                editBoxImpl._delegate && editBoxImpl._delegate.editBoxEditingDidBegan && editBoxImpl._delegate.editBoxEditingDidBegan();
            },
            fail: function (res) {
                cc.warn(res.errMsg);
                editBoxImpl._endEditing();
            }
        });
        wx.onKeyboardConfirm(onKeyboardConfirmCallback);
        wx.onKeyboardInput(onKeyboardInputCallback);
        wx.onKeyboardComplete(onKeyboardCompleteCallback);
    };
};

_p._beginEditing = function () {    
    this._edTxt.focus();
    
    if (cc.sys.isMobile && !this._editing) {
        // Pre adaptation and
        this._beginEditingOnMobile(this._editBox);
    }
    this._editing = true;
}