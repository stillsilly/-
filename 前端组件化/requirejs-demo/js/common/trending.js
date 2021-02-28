/**
 * Created by Administrator on 2017/7/25.
 */


function Trending() {

    cuteDialog = {
        open:function (o) {
            alert(o.message)
        }
    };


    var trendingDiv = document.querySelector('.trending-component');
    var trendingType = trendingDiv.dataset.type;

    var trendingItems = getTrending();

    var div = document.createElement('div');
    div.id = 'trending';

    var addInput = document.createElement('input');
    div.appendChild(addInput);
    addInput.type = 'text';
    addInput.className = 'add-input';
    addInput.onkeyup = function (event) {
        if(event.keyCode !== 13 && event.keyCode !== 108){
            return;
        }
        addTrending();
    };

    var addBtn = document.createElement('span');
    div.appendChild(addBtn);
    addBtn.outerHTML = '<span class="add-btn" >添加</span>';

    var trendingUl = document.createElement('ul');
    trendingUl.className = 'trending-ul';
    renderItems();
    trendingDiv.appendChild(div);
    div.appendChild(trendingUl);

    function renderItems() {
        var liHtml = '';
        for(var i = 0;i<trendingItems.length;i++ ){
            liHtml = liHtml + '\
                <li  >\
                        <span class="sort-icon-box">' + ( isNotFist(i)?'<span class="toup-icon" data-index="'+ i +'">上移</span>' :'') +'</span>\
                        <span class="sort-icon-box">'+ (isNotLast(i)?'<span class="todown-icon" data-index="'+ i +'"  >下移</span>':'') +'</span>\
                        <span class="trending-item">' + trendingItems[i] + '</span>\
                        <span class="delete-item"  data-index="'+ i +'"   >删除</span>\
                </li>';
        }
        trendingUl.innerHTML = liHtml;
    }

    (function bindEvent() {
        document.addEventListener('click',function (e) {
            var target = e.target;
            if( target.classList.contains('add-btn') ){
                return addTrending();
            }
            if( target.classList.contains('toup-icon') ){
                return upTrending(target);
            }
            if(target.classList.contains('todown-icon')){
                return downTrending(target);
            }
            if(target.classList.contains('delete-item')){
                return removeTrending(target);
            }
        })
    })();

    function getTrending() {
        var trending = localStorage.getItem(trendingType) || trendingDiv.dataset.default || '[]';
        return  JSON.parse(trending);
    }

    function addTrending() {

        if(!addInput.value || !addInput.value.trim()){
            return cuteDialog.open({
                message:'不能为空'
            });
        }
        if(trendingItems.length>5){
            return cuteDialog.open({
                message:'不能多于5个搜索热词'
            });
        }
        if(trendingItems.indexOf(this.itemToAdd)>=0){
            return cuteDialog.open({
                message:'该词已存在'
            });
        }
        trendingItems.push(addInput.value);
        addInput.value = '';

        updateShowAndStore();
    }

    function removeTrending(t) {

        var index = t.dataset.index;
        if(trendingItems.length <= 3){
            return cuteDialog.open({
                message:'不能少于3个搜索热词'
            });
        }
        // cuteDialog.open({
        //     message:'确定删除吗？',
        //     type:'comfirm',
        //     cancelCallback:function () {
        //     },
        //     comfirmCallback:function () {
        //         self.trendingItems.splice(self.trendingItems.indexOf(item),1);
        //     }
        // });

        trendingItems.splice(index,1);

        updateShowAndStore();
    }


    function isNotFist(index) {
        return index !== 0;
    }

    function isNotLast(index) {
        return index !== (trendingItems.length -1)
    }

    function upTrending(t) {
        var index = t.dataset.index;
        var item = trendingItems[index];
        trendingItems.splice(index,1);
        trendingItems.splice(index-1,0,item);

        updateShowAndStore();
    }

    function downTrending(t) {
        var index = t.dataset.index;
        var item = trendingItems[index];
        trendingItems.splice(index,1);
        trendingItems.splice(index+1,0,item);

        updateShowAndStore();
    }


    function updateShowAndStore() {
        renderItems();
        localStorage.setItem(trendingType,JSON.stringify(trendingItems));
    }
}

