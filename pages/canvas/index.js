Page({
  canvas: null,
  ctx: null,
  dpr: 1, // 设备像素比
  scale: 1, // 缩放比例
  data: {
    imgUrl: "/images/quan3.jpeg",
    imgWidth: 0,
    imgHeight: 0
  },
  onReady() {
    const _this = this
    wx.getImageInfo({
      src: _this.data.imgUrl,
      success(res) {
        _this.setData({
          imgWidth: res.width,
          imgHeight: res.height
        })
      }
    })
    // wx.createSelectorQuery().select("#myCanvas").fields({node: true, size: true}).exec(res => {
    //   this.canvas = res[0].node
    //   this.ctx = this.canvas.getContext("2d")
    //   // Canvas 画布的实际绘制宽高
    //   const width = res[0].width
    //   const height = res[0].height

    //   // 初始化画布大小
    //   this.dpr = wx.getWindowInfo().pixelRatio
    //   this.canvas.width = width * this.dpr
    //   this.canvas.height = height * this.dpr
    //   this.ctx.scale(this.dpr, this.dpr)
    //   // 清空画布
    //   this.ctx.clearRect(0, 0, width, height)
    //   // 绘制图片
    //   this.drawImage()
    // })
  },

  drawImage() {
    const _this = this
    wx.getImageInfo({
      src: _this.data.imgUrl,
      success(res) {
        let imgWidth = res.width
        let imgHeight = res.height
        let canvasWidth = _this.canvas.width
        let canvasHeight = _this.canvas.height
        // _this.data.canvas.width = imgWidth * _this.data.dpr
        // _this.data.canvas.height = imgHeight* _this.data.dpr
        _this.data.scale =
          Math.min(
            imgWidth / Math.max(canvasWidth, 1),
            imgHeight / Math.max(canvasHeight, 1))
        imgWidth *= _this.scale
        imgHeight *= _this.scale
        _this.canvas.width *= _this.scale
        _this.canvas.height *= _this.scale
        const img = _this.canvas.createImage()
        img.src = _this.data.imgUrl
        img.onload = () => {
          console.log('画布的宽高', _this.canvas.width, _this.canvas.height)
          console.log('图片的宽高', imgWidth, imgHeight)
          _this.ctx.drawImage(img, 0, 0, imgWidth, imgHeight)
        }
      },
      fail(err) {
        console.log('绘制图片报错', err)
      }
    })
  },
  handleChange(event) {
    const { x, y } = event.detail
    this.canvas.translate(x, y)
  }
})