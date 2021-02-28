/**
 * Created by yang.zhou on 2017/7/25.
 */
define([],function () {
    var module = function () {
        this.init();
    }

    module.prototype = {
        init:function () {
            this.load();
            this.event();
        },
        load:function () {
            this.loadMainNav();
        },
        event:function () {
            
        },
        loadMainNav:function () {
            var navHtml = '\
                <ul class="main-nav">\
                    <a class="index" href="../requirejs-demo/index.html">首页</a>\
                    <a class="article" href="../requirejs-demo/article.html">文章</a>\
                    <a class="industry" href="../requirejs-demo/industry.html">行业热点</a>\
                    <a class="training" href="../requirejs-demo/training.html">培训资源</a>\
                    <a class="exhibition" href="../requirejs-demo/exhibition.html">会展资源</a>\
                </ul>';
            if(!document.querySelector('.main-nav')){
                document.querySelector('#app').insertAdjacentHTML('beforeBegin',navHtml);
            }
            var activeA = document.querySelector('.' + getPageName() );
            activeA.classList.add('router-link-exact-active');

            function getPageName() {
                var module = (window.location.pathname || "").replace(".html", "");
                module = module.split('/');
                module = module[module.length-1];
                //module = module.replace(/^\//, "").replace(/\/$/, "").replace("/", ".");
                return module ? module : "index";
            };


        }
    }

    return module
});