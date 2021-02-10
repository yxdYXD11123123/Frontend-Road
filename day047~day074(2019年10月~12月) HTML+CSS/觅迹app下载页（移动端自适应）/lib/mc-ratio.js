/**
 * 版本：v1.1.0
 * 文档：请参阅 https://gitlab.com/fekits/mc-ratio/blob/master/readme.md
 * @param param {Object}
 * */

let ratio = function ratio(param = {}) {
  let doc = document;
  let root = doc.documentElement;
  let head = doc.getElementsByTagName('head')[0];

  // 设置META
  let meta = doc.getElementsByName('viewport')[0];
  if (!meta) {
    meta = doc.createElement('meta');
    meta.name = 'viewport';
    head.appendChild(meta);

    // head.innerHTML += '<meta name="viewport">';
    // meta = doc.getElementsByName('viewport')[0];
  }

  // 设置字号的标签，如果没有传参则默认为根标签
  let el = param.el || root;

  // 设计稿的宽度
  let design_w = param.size[0];

  // 设计稿的高度
  let design_h = param.size[1];

  // 设计稿的比例
  let design_r = design_h / design_w;

  // 是否双向检测
  let full = param.full;

  let _ratio = function () {

    if (el === root) {
      // 设置DPR
      let DPR = window.devicePixelRatio;
      let scale = param.dpr ? 1 / DPR : 1;
      meta.setAttribute('content', `width=device-width,initial-scale=1,minimum-scale=${scale},maximum-scale=${scale},user-scalable=no`);
    }

    // 浏览器的宽度
    let window_w = root.clientWidth;

    // 浏览器的高度
    let window_h = root.clientHeight;

    // 字号;
    let fontSize;

    if (full) {

      /*
      如果浏览器的高宽比例小于设计稿的高度比例时，那如果还仅按照宽度缩放的话，内容肯定是放不下的。
      这就好比设计尺寸是100*200的比例，内容是一个80*180的色块，当浏览器尺寸是50*50时。
      就算是内容宽度跟据宽度比例缩小了一半是40，那内容高度按比例缩小到90也不能在浏览器50*50的尺寸内放展示出来。
      */
      if (window_h / window_w < design_r) {
        // 字号 = 浏览器的高度 ／ 设计稿的比例 ／ 设计稿的宽度
        fontSize = (window_h / design_r / design_w);
      } else {
        fontSize = (window_w / design_w);
      }

    } else {
      // 字号 = （浏览器的宽度 ／ 设计稿的宽度）*100
      fontSize = (window_w / design_w);
    }
    fontSize = fontSize.toFixed(param.fixed ? (param.fixed + 2) : 2);
    el.style.fontSize = fontSize * 100 + 'px';
    param.then && param.then(fontSize * 100);
  };

  _ratio();
  window.addEventListener('resize', _ratio);

};
// window.fekit ? window.fekit.mcRatio = ratio : window.fekit = { mcRatio: ratio };
// module.exports = ratio;
// export default ratio;
