window.onload = function () {
    let regexpPh = /^1[3|4|5|7|8]\d{9}$/;
    let regexpQQ = /^[1-9]\d{4,}$/;
    let regexpNC = /^[\u4e00-\u9fa5]{2,8}$/;
    let regexpDX = /^\d{6}$/;
    let regexpPW = /^[0-9a-zA-Z_]{6,16}$/;

    // 获取元素
    let phoneNum = document.querySelector('#phoneNum');
    let qq = document.querySelector('#qq');
    let nickname = document.querySelector('#nickname');
    let dx = document.querySelector('#dx');
    let password = document.querySelector('#password');
    let sure = document.querySelector('#sure');

    // 校验
    function volidator(ele, reg) {
        ele.onblur = function () {
            if (reg.test(this.value)) {
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = `<i class="success_icon"></i> 恭喜您输入正确`;
            }
            else {
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = `<i class="error_icon"></i> 格式不正确，请从新输入`;
            }
        }
    }

    volidator(phoneNum, regexpPh);
    volidator(qq, regexpQQ);
    volidator(nickname, regexpNC);
    volidator(dx, regexpDX);
    volidator(password, regexpPW);

    sure.onblur = function () {
        if (this.value === password.value) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = `<i class="success_icon"></i> 恭喜您输入正确`;
        }
        else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = `<i class="error_icon"></i> 两次输入的密码不一样请重新输入`;
        }
    }
}