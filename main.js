$(document).ready(function () {
  let $code = $("#code")
  let $css = $("#css")
  let code1 = `
/** 
 * 你好，我是小蔡，一名北京精雕科技集团有限公司的前端开发工程师。
 * 现在我将用这份简历介绍自己。
 * 这样的开场是不是有些单调，那么我们试着改变一下样式吧！
 * 首先我们把背景和字体颜色改变一下吧！
 */
html{
    background-color: rgb(60, 80, 100);
    color: rgb(255,255,255);
    padding: 20px;
}

pre:not(:empty){
    overflow: auto;
    padding: 10px;
    width: 45vw;
    height: 85vh;
    background-color: rgb(48, 48, 48);
    box-shadow: 0 0 10px 2px #FFF;
}

/* 接下来，我们让这个codePanel 动起来 */
pre.css{
    animation: my-move 2s;
}

/* 加一个呼吸效果吧！ */
pre.css{
  animation: my-breath 1s 200;
}

pre:not(:empty){
  transform: rotateY(10deg);
  transform-origin: left;
}

/* 感覺哪裡不對勁？來讓代碼高亮吧！&&_&& */
pre.md{
  position: fixed;
  top: 20px;
  right: 100px;
  transform: rotateY(-10deg);
  transform-origin: right;
}

/* 开始写我们的简历吧！&&_&& */
 `
  let md = `
  # 蔡进东
  初级前端工程师，现在供职于北京精雕科技集团苏州分公司


  # 技能
  * HTML CSS JS 
  * JQUERY VUE REACT
  * NodeJS
  * 移动端开发
  * 小程序开发
  

  # 工作经历
  1. 东北大学
  2. 北京精雕


  # 链接
  - [github]()
  - [我的博客](http://caijd.top)
  `
  let next = 0
  let n = 0
  let isHighLight = 0
  let timer1 = null
  let pauseCount = 0
  let promise = new Promise((resolve, reject) => {
    timer1 = setTimer(code1, "pre", resolve, true)
  })
    .then(() => {
      let $md = $(".md")
      $md.text(" ")
      next = 0
      isHighLight = 0
    })
    .then(() => {
      n = 0
      timer1 = setTimer(md, "pre.md", null, false)
    })



  
  function setTimer(code, selector, resolve, isCss) {
    return window.setInterval(() => {
      writeCode(code, selector, resolve, isCss)
      isHighLight && highlight(selector)
    }, 50)
  }

  function writeCode(str, selector, resolve, isCss) {
    let subString = str.substr(0, n)
    if (detectPause(subString) && pauseCount === 0) {
      window.clearInterval(timer1)
      let timer2 = window.setTimeout(() => {
        timer1 = setTimer(code1, "pre.css", resolve,true)
        isHighLight = 1
        window.clearTimeout(timer2)
      }, 1500)
      pauseCount++
    } else if (detectPause(subString) && pauseCount === 1) {
      $("<pre>").appendTo("body").addClass("md")
      pauseCount++
    }
    $(selector).text(subString).scrollTop(1000000)
    isCss && $css.html(subString)
    isCss || textToMd(subString,'.md')
    n++
    if (n > str.length) {
      window.clearInterval(timer1)
      n = 0
      resolve && resolve()
    }
  }

  function highlight(selector) {
    document.querySelectorAll(selector).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }

  function detectPause(str) {
    let substr = str.trim().substr(-8).split("*/")[0].trim()
    return substr === "&&_&&" && str[str.length - 1].match(/\s/) ? true : false
  }

  function textToMd(str,selector){
    $(selector).html(marked(str))
  }  
})
