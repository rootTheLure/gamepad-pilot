(function (window, document) {
	var events = {
		DRONE: 'drone',
		MOVE: 'move',
		ANIMATE: 'animate'
	},

	actions = {
		// Drone
		STOP: 'stop',
		EMERGENCY: 'disableEmergency',
		TAKEOFF: 'takeoff',
		LAND: 'land',

		// Move
		UP: 'up',
		DOWN: 'down',
		FORWARD: 'front',
		BACKWARD: 'back',
		LEFT: 'left',
		RIGHT: 'right',
		CLOCKWISE: 'clockwise',
		COUNTERCLOCKWISE: 'counterClockwise',

		// Animate
		FLIP_AHEAD: 'flipAhead',
		FLIP_BACK: 'flipBehind',
		FLIP_RIGHT: 'flipRight',
		FLIP_LEFT: 'flipLeft'
	},

	keyMap = {
		0: {
			event: events.DRONE,
			action: actions.TAKEOFF
		},

		1: {
			event: events.DRONE,
			action: actions.LAND
		},

		9: {
			event: events.DRONE,
			action: actions.EMERGENCY
		}
	},
	GamepadPilot;

	GamepadPilot = function (cockpit) {
		this.cockpit = cockpit;
		this.gamepadManager = new GamepadManager();
		this.gamepadManager.init({ buttonHandler: this.buttonHandler.bind(this) })
	}

	GamepadPilot.prototype.buttonHandler = function(button) {
		this.sendCommands(button);
	};

	GamepadPilot.prototype.sendCommands = function(button) {
        var command = keyMap[button];

        console.log('GamepadPilot: sending command');
        console.log('event: %s; action: %s', command.event, command.action);
        this.cockpit.socket.emit("/pilot/" + command.event, {
            action : command.action
        });
    }

	window.Cockpit.plugins.push(GamepadPilot);

}(window, document));