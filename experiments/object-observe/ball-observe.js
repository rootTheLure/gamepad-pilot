var gamepadInfo = document.getElementById("gamepad-info");
var ball = document.getElementById("ball");
var start;
var a = 0;
var b = 0;

var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;

var rAFStop = window.mozCancelRequestAnimationFrame ||
  window.webkitCancelRequestAnimationFrame ||
  window.cancelRequestAnimationFrame;

window.addEventListener("gamepadconnected", function() {
  var gp = navigator.getGamepads()[0];
  gamepadInfo.innerHTML = "Gamepad connected: " + gp.id;

  subscribe();
});

window.addEventListener("gamepaddisconnected", function() {
  gamepadInfo.innerHTML = "Waiting for gamepad.";

  rAFStop(start);
});

(function subscribe () {
  var gamepad = navigator.getGamepads()[0];
      button = gamepad.buttons[0];

  xpad = new XGamepad(gamepad);

  gamepadInfo.innerHTML = "Gamepad connected: " + gamepad.id;

})();

function gameLoop() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  var speed = 10;
  if (!gamepads)
    return;

  var gp = gamepads[0];
  if (gp.axes[2] > 0.1) {
    a += speed*gp.axes[2];
  } 
  if (gp.axes[2] < -0.1) {
    a += speed*gp.axes[2];
  } 
  if (gp.axes[3] > 0.1) {
    b += speed*gp.axes[3];
  } 
  if (gp.axes[3] < -0.1) {
    b += speed*gp.axes[3];
  } 
  ball.style.left = a + "px";
  ball.style.top = b + "px";

  var start = rAF(gameLoop);
};