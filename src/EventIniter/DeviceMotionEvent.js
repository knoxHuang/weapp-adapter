export default class DeviceMotionEvent {
  constructor() {
    this.type = 'devicemotion';
  }
}

wx.onAccelerometerChange(function (res) {
  var deviceMotionEvent = new DeviceMotionEvent();
  deviceMotionEvent.accelerationIncludingGravity = res;

  document.dispatchEvent(deviceMotionEvent);
});