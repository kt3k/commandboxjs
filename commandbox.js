/**
 * commandbox.js 0.1
 * author: kt3k (Yosiya Hinosawa)
 * license: MIT license
 * url: https://github.com/kt3k/commandboxjs
 */

this.commandBox = this.exports = Object.branch(function (commandBoxPrototype) {
    'use strict';

    commandBoxPrototype.constructor = function (args) {
        this.hooks = args.hooks || {};
        this.reset();
    }

    commandBoxPrototype.command = function (cmd) {
        if (this.currentNode[cmd] == null) {
            console.warn('illegal command: ' + cmd);
            return;
        }

        this.commandStack.push(cmd);
        this.nodeStack.push(this.currentNode);

        this.currentNode = this.currentNode[cmd];

        if (typeof this.currentNode.callback === 'function') {
            this.currentNode.callback(this.commandStack);
        }

        this.currentNode = this.currentNode.nextNode;

        if (this.currentNode == null) {
            this.reset();
        }
    };

    commandBoxPrototype.reset = function () {
        this.commandStack = [];
        this.nodeStack = [];
        this.currentNode = this.hooks;
    };

    commandBoxPrototype.pop = function () {
        this.commandStack.pop();
        this.currentNode = this.nodeStack.pop();
        if (this.currentNode == null) {
            this.currentNode = this.hooks;
        }
    };
});
