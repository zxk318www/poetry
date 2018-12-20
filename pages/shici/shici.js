// pages/shici/shici.js

const jinrishici = require('../../utils/jinrishici.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shiju: [],  //诗句
    answer: '',  //答案
    anArray: [],
    num: 0,
    check: [],
    userChoose: [],
    isLast: false,
    conl: false,

    jielun: '',
    content: [], //完整诗句
    author: '',
    dynasty: '', //朝代
    title: '',  //标题
    translate: '' //翻译（可能为空）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getQuestion()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {


  },

  getQuestion() {

    //初始化
    this.init()

    jinrishici.load(result => {
      // 下面是处理逻辑示例
      console.log(result)
      console.log(result.data.content)
      var content = result.data.content;

      let jzArray = [];
      if (content.indexOf('，') != -1) {
        jzArray = content.split('，')
      }

      if (content.indexOf('、') != -1) {
        jzArray = content.split('、')
      }

      //诗歌截取成数组，随机展示提示诗句

      var idx = Math.floor(Math.random() * jzArray.length)
      var answer = jzArray[idx]
      var anArray = answer.split('')
      if (anArray.indexOf('。') != -1) {
        anArray.splice(anArray.length - 1, 1)
      }

      //将答案数据打乱顺序，需要用户自行排序

      anArray.sort(function () { return 0.5 - Math.random() })

      var isLast = false
      if ((idx + 1) == jzArray.length) {
        jzArray[idx] = '_________。'
        isLast = true
      } else {
        jzArray[idx] = '_________'
      }

      let check = []
      for (var i = 0; i < anArray.length; i++) {
        check.push(false)
      }

      this.setData({
        "shiju": jzArray,
        "answer": answer,
        "anArray": anArray,
        "check": check,
        "isLast": isLast,
        "content": result.data.origin.content,
        "dynasty": result.data.origin.dynasty,
        "title": result.data.origin.title,
        "translate": result.data.origin.translate,
        "author": result.data.origin.author,
      })
    })
  },
  choose(e) {
  
    if(this.data.conl){
      return;
    }
    var val = e.currentTarget.dataset.val

    var index = e.currentTarget.dataset.index

    var num = this.data.num
    var check = this.data.check

    var userChoose = this.data.userChoose

    //动态样式获取
    if (!this.data.check[index]) {

      check[index] = true
      num = parseInt(e.currentTarget.dataset.num) + 1
      userChoose.push(this.data.anArray[index])
    } else {

      check[index] = false
      num = parseInt(e.currentTarget.dataset.num) - 1
      var delInd = userChoose.indexOf(val)
      userChoose.splice(delInd, 1)
    }
    this.setData({
      "check": check,
      "num": num,
      "userChoose": userChoose
    })
    //校验答案
    var userNum = this.data.userChoose.length
    var answerNum = this.data.anArray.length

    if (userNum == answerNum) {
      this.check()
    }

  },
  check() {
    console.log('校验答案')

    var user = ""
    for (var i = 0; i < this.data.userChoose.length; i++) {
      user = user + this.data.userChoose[i]
    }
    //如果要猜的诗句是最后一句，需要加上句号
    if (this.data.isLast ) {
      if(this.data.answer.indexOf('？')==-1){
        user = user + "。"
      }
      
    }
    console.log(user)
    console.log(this.data.answer)
    var jielun = ""
    if (user == this.data.answer) {
      console.log("答对了")
      jielun = "答对了"
    } else {
      console.log("答错了")
      jielun = "答错了"
    }
    this.setData({
      "conl": true,
      "jielun": jielun
    })
  },
  init() {
    this.setData({
      "shiju": [],
      "answer": "",
      "anArray": [],
      "check": [],
      "isLast": false,
      "num": 0,
      "userChoose": [],
      "conl": false,
      "jielun": "",
      "content": "",
      "dynasty": "",
      "title": "",
      "translate": "",
      "author": "",
    })
  },
  next(){
    this.getQuestion()
  }
})