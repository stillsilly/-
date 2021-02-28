/**
 * Created by yang.zhou on 2017/7/25.
 */

define([], function () {
    var module = function () {
        this.init();
    };
    module.prototype = {
        init:function () {
            Trending();
        }
    };
    return module;
});