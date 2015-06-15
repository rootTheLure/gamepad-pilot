function XGamepad (gamepad) {
	this.gamepad = navigator.getGamepads()[0];

	var buttons = {
		'A': new Button ('A', this.gamepad.buttons[0])
	}

	Object.observe(buttons['A'], function () { console.log(buttons['A'].pressed) });

	this.buttons = buttons;
	this._sync();
}

XGamepad.prototype._sync = function() {
	var gamepad = navigator.getGamepads()[0];

	this.buttons['A'].update(gamepad.buttons[0]);

	window.requestAnimationFrame(this._sync.bind(this));
};

function Trigger () {

}

function Button (name, button) {
	this.name = name;
	this.pressed = button.pressed;
	this.value = button.value;
}

Button.prototype.update = function(button) {
	this.pressed = button.pressed;
	this.value = button.value;	
};

function Stick () {

}

var buttonsMap = {
	'A': 0
}