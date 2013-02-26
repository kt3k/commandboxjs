/**
 * commandbox.js 0.1
 * author: kt3k (Yosiya Hinosawa)
 * license: MIT license
 * url: https://github.com/kt3k/commandboxjs
 */

this.commandBox = this.exports = (function () {
    'use strict';

    var commandBox = function (args) {
        var commandStack = [];
        var hooks = args.hooks || {};
        var currentNode = hooks;

        var evokeHook = function (cmd) {
            var callback;
            var toReset = false;

            currentNode = currentNode[cmd];

            if (currentNode == null) {
                return;
            }

            if (currentNode instanceof Array) {
                callback = currentNode[0];
                currentNode = currentNode[1];
            } else {
                callback = currentNode;
                toReset = true;
            }

            if (typeof callback === 'function') {
                callback(commandStack);
            }

            if (toReset) {
                reset();
            }
        };

        var reset = function () {
            commandStack = [];
            currentNode = hooks;
        };

        return {
            command: function (cmd) {
                commandStack.push(cmd);

                evokeHook(cmd);
            }
        };
    };

    return commandBox;

}());
