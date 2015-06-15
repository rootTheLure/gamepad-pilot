function GamepadManager () {}

GamepadManager.POLLING_INTERVAL = 30;
GamepadManager.ACTION_THRESHOLD = 0.1;

GamepadManager.onButtonPressCallback = function (button) {
	return false;
};

GamepadManager.onTriggerPressCallback = function (trigger) {
	return false;
};

GamepadManager.onStickTiltCallback = function (stick) {
	return false;
};

GamepadManager.prototype.init = function (options) {
	var isGamepadApiAvailable = !!navigator.getGamepads || !!navigator.webkitGetGamepads ||!!navigator.webkitGamepads;
		
	this.rAF = window.requestAnimationFrame;

    if (!isGamepadApiAvailable) {
    	console.error("GamepadManager: browser does not support gamepad API.");
    	return false;
    }

    this.onButtonPressCallback = options.buttonHandler;

    window.addEventListener("gamepadconnected", this._onGamepadConnected);
    window.addEventListener("gamepaddisconnected", this._onGamepadDisconnected);

    this.startTracking();
};

GamepadManager.prototype._onGamepadConnected = function (e) {
	console.log("GamepadManager: new gamepad connected.");
};

GamepadManager.prototype._onGamepadDisconnected = function (e) {
	console.log("GamepadManager: gamepad disconnected.");	
};

GamepadManager.prototype.startTracking = function () {
	if (!this.isTracking) {
		this.isTracking = true;
		this.track();
	}
};

GamepadManager.prototype.stopTracking = function () {
	this.isTracking = false;
};

GamepadManager.prototype.track = function () {
	if (this.isTracking) {
		this.checkButtons();
		window.requestAnimationFrame(this.go.bind(this));
	}
}

GamepadManager.prototype.go = function() {
	setTimeout(this.track.bind(this), 100);
};

GamepadManager.prototype.checkButtons = function () {
	var gamepad = navigator.getGamepads()[0];

	for (var i = 0; i < gamepad.buttons.length; i++) {
		if (this._isButtonPressed(gamepad.buttons[i])) {
			this.onButtonPressCallback(i);
		}
	};
}

GamepadManager.prototype._isButtonPressed = function (button) {
	if (button != null) {
		return button.pressed;
	}
	return false;
}
