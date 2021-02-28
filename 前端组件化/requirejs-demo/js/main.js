/**
 * Created by yang.zhou on 2017/7/25.
 */

require(['common/trending','router','common'], function (Trending,router,common) {

    //加载全局组件
    new common();

    // 模块路由
    new router();
});