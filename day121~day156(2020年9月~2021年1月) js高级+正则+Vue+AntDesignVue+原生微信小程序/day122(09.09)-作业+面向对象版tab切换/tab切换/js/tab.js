let that;

class Tab {
    constructor(id) {
        that = this;
        this.tab = document.getElementById(id);
        // 获取添加按钮
        this.addBtn = this.tab.querySelector('.tabadd');
        // 给添加按钮绑定
        this.addBtn.onclick = this.addTab;
        // 获取ul
        this.ul = this.tab.querySelector('ul');
        // 获取article
        this.article = this.tab.querySelector('article');

        // 初始化
        this.init();
    };
    /**
     * 初始化
     */
    init() {
        this.aLi = this.tab.querySelectorAll('li');
        this.sections = this.tab.querySelectorAll('section');
        this.removeBtn = this.tab.querySelectorAll('li .icon-guanbi');
        this.spans = this.tab.querySelectorAll('li span:first-child');
        for (let i = 0; i < this.aLi.length; i++) {
            this.aLi[i].onclick = this.clickLi;
            this.aLi[i].index = i;
            this.removeBtn[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    };

    /**
     * 清除所有类名
     */
    clearClassName() {
        for (let i = 0; i < this.aLi.length; i++) {
            this.aLi[i].className = '';
            this.sections[i].className = '';
        }
    };

    /**
     * 点击li
     */
    clickLi() {
        that.clearClassName();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    };

    /**
     * 添加tab
     */
    addTab() {
        that.clearClassName();
        that.ul.insertAdjacentHTML('beforeEnd', `<li class="liactive"><span>测试${that.aLi.length + 1}</span><span class="iconfont icon-guanbi"></span></li>`);
        that.article.insertAdjacentHTML('beforeEnd', `<section class="conactive">测试${that.aLi.length + 1}</section>`);
        that.init();
    };

    /**
     * 移除tab
     */
    removeTab(e) {
        e.stopPropagation();
        // 获取索引
        let index = this.parentNode.index;
        // 移除
        that.aLi[index].remove();
        that.sections[index].remove();
        // 初始化
        that.init();
        // 如果还有li，但是没有被选中的，再选中一个邻近的
        if (!that.tab.querySelector('.liactive') && that.aLi.length >= 1) {
            that.aLi[index - 1] ? that.aLi[index - 1].click() : that.aLi[index].click();
        }
    }

    /**
     * 编辑tab
     */
    editTab() {
        // 显示输入框
        this.innerHTML = `<input type="text" value="${this.innerHTML}">`;
        // 选中
        let input = this.children[0];
        input.select();
        // 失去焦点
        input.onblur = function () {
            this.parentNode.innerHTML = this.value;
        }
        // 回车
        input.onkeypress = function (e) {
            if (e.keyCode == 13) {
                this.blur();
            }
        }
    }
}

new Tab('tab');