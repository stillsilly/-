/**
 * Created by yang.zhou on 2017/7/25.
 */
define([], function () {
    var module = function () {
        this.init();
    }
    module.prototype = {
        // 功能描述：初始化
        init: function () {
            this.load();
        },

        // 功能描述：加载
        load: function () {
            this.pagename = this.get_module();

            // 加载指定模块
            require(["controller/" + this.pagename], function (m) {
                var $this = new m();
            });
        },

        // 功能描述：获取模块
        get_module: function () {
            var module = (window.location.pathname || "").replace(".html", "");
            module = module.split('/');
            module = module[module.length-1];
            //module = module.replace(/^\//, "").replace(/\/$/, "").replace("/", ".");
            return module ? module : "index";
        }
    }
    return module;
});