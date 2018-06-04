export default class DeviceMotionEvent {
  constructor() {
    this.type = 'devicemotion';
    this.accelerationIncludingGravity = null;
  }
}

wx.onAccelerometerChange && wx.onAccelerometerChange(function (res) {
  let deviceMotionEvent = new DeviceMotionEvent();
  let gravityFactor = 10;
  let visibleRect = cc.view._visibleRect;
  if (visibleRect.height / visibleRect.width < 1) {
    // landscape view
    let tmp = res.x;
    res.x = res.y;
    res.y = tmp;
    
    res.x *= gravityFactor;
    res.y *= -gravityFactor;

    // TODO adjust x y axis when the view flips upside down
  }
  else {
    // portrait view
    res.x *= -gravityFactor;
    res.y *= -gravityFactor;
  }
  deviceMotionEvent.accelerationIncludingGravity = res;

  document.dispatchEvent(deviceMotionEvent);
});