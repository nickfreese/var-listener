/**
*
* var-listner.js copyright Nick Freese
*
* - Adds listeners with Callback functions for variables.
*/


window.addVarListener = (function(varName, namespace, func) {

    var listenerObj = {

        varName: varName,

        namespace: namespace,

        callback: func || function(value){},

        loopTime: 100,

        add: function() {
            var _this = this;


            _this.listen();

            return _this;
        },

        nest: function(varName, func) {

            _this = this;

            func = func || function(value){};

            _this.callback = func;
            _this.namespace = _this.namespace[_this.varName];
            _this.varName = varName;

            _this.listen();

            return _this;

        },


        listen: function() {
            var _this = this;

            if (_this.checkExists(_this.varName, _this.namespace)) {
                _this.callback(_this.namespace[_this.varName]);
                return true;
            } else {
                setTimeout(function() {
                    _this.listen();
                }, _this.loopTime);
            }

        },

        checkExists: function(varName, namespace) {
            var _this = this;


            if (typeof namespace[varName] !== "undefined") {
                return true;
            } else {
                return false;
            }

        },

        exists: function() {
            var _this = this;
            if (typeof _this.namespace[_this.varName] !== "undefined") {
                return true;
            } else {
                return false;
            }
        },


    }

    return listenerObj.add();


});