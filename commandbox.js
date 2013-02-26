/**
 * commandbox.js 0.1
 * author: kt3k (Yosiya Hinosawa)
 * license: MIT license
 * url: https://github.com/kt3k/commandboxjs
 */

this.commandBox = this.exports = (function () {
    'use strict';

    var commandBox = function (args) {
        var commands_ = [];
        var hooks_ = args.hooks || {};
        var x_ = hooks_;

        var evokeHook_ = function (cmd) {
            var callback;
            var toReset = false;

            x_ = x_[cmd];

            if (x_ == null) {
                return;
            }

            if (x_ instanceof Array) {
                callback = x_[0];
                x_ = x_[1];
            } else {
                callback = x_;
                toReset = true;
            }

            if (typeof callback === 'function') {
                callback.call(null, commands_);
            }

            if (toReset) {
                reset_();
            }
        };

        var reset_ = function () {
            commands_ = [];
            x_ = hooks_;
        };

        return {
            command: function (cmd) {
                commands_.push(cmd);

                evokeHook_(cmd);
            },
        };
    };

    return commandBox;

}());
