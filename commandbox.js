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
            if (currentNode[cmd] == null) {
                return;
            }

            currentNode = currentNode[cmd];

            if (typeof currentNode.callback === 'function') {
                currentNode.callback.call(null, commandStack);
            }

            currentNode = currentNode.nextNode;

            if (currentNode == null) {
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
