// Component({
// 	properties: {
// 		// 画布宽
// 		canvasWidth: {type: Number, default: 0},
// 		// 画布高
// 		canvasHeight: {type: Number, default: 0},
// 		// 需要绘制的图片
// 		imgSrc: {type: String, default: ''},
// 	},
// 	data: {
// 		canvas: null, // 画布对象
// 		ctx: null, // 渲染上下文
// 		dpr: 1, // 设备像素比
// 		scale: 1, // 缩放比例
// 	},
// 	lifetimes: {
// 		attached() {
// 			this.initCanvas()
// 		}
// 	},
// 	// observers: {
// 	// 	'imgSrc': function(val) {
// 	// 		this.drawImage()
// 	// 	}
// 	// },
// 	methods: { 
// 		// 初始化画布
// 		initCanvas() {
// 			const {canvasWidth, canvasHeight} = this.properties
// 			this.createSelectorQuery().select("#myCanvas").fields({node: true, size: true}).exec(res => {
// 				this.data.canvas = res[0].node
// 				this.data.ctx = this.data.canvas.getContext("2d")
// 				// Canvas 画布的实际绘制宽高
// 				// const width = res[0].width
// 				// const height = res[0].height

// 				// 初始化画布大小
// 				// this.dpr = wx.getWindowInfo().pixelRatio
// 				// this.canvas.width = width * this.dpr
// 				// this.canvas.height = height * this.dpr
// 				this.data.ctx.scale(this.dpr, this.dpr)
// 				// 清空画布
// 				this.data.ctx.clearRect(0, 0, canvasWidth, canvasHeight)
// 				// 绘制图片
// 				this.drawImage()
// 			})
// 		},
// 		// 绘制图片
// 		drawImage() {
// 			const _this = this
// 			const { imgSrc } = this.properties
// 			wx.getImageInfo({
// 				src: imgSrc,
// 				success(res) {
// 					let imgWidth = res.width
// 					let imgHeight = res.height
// 					// let canvasWidth = _this.canvas.width
// 					// let canvasHeight = _this.canvas.height
// 					// _this.data.canvas.width = imgWidth * _this.data.dpr
// 					// _this.data.canvas.height = imgHeight* _this.data.dpr
// 					// _this.data.scale = 
// 					// Math.min(
// 					// 		imgWidth  / Math.max(canvasWidth,  1),
// 					// 		imgHeight / Math.max(canvasHeight, 1))
// 					// imgWidth *= _this.scale 
// 					// imgHeight *= _this.scale
// 					// _this.canvas.width *= _this.scale
// 					// _this.canvas.height *= _this.scale 
// 					const img = _this.data.canvas.createImage()
// 					img.src = imgSrc
// 					img.onload = () => {
// 							console.log('画布的宽高', _this.data.canvas.width, _this.data.canvas.height)
// 							console.log('图片的宽高', imgWidth, imgHeight)
// 						_this.data.ctx.drawImage(img, 0, 0, imgWidth, imgHeight)
// 					}
// 				},
// 				fail(err) {
// 					console.log('绘制图片报错', err)
// 				}
// 			})
// 		},
// 		// 可拖动区域的拖动事件
// 		handleChange(event) {
// 			const {x, y} = event.detail
// 			this.data.canvas.translate(x, y)
// 		}
// 	}
// })

Component({
	properties: {
		src: {
			type: String,
			value: '',
			// observer: 'loadImage'
		},
		width: {
			type: Number,
			value: 300
		},
		height: {
			type: Number,
			value: 300
		}
	},
	data: {
		canvasWidth: 300,
		canvasHeight: 300,
		x: 0,
		y: 0,
		canvas: null,
		ctx: null
	},
	lifetimes:{
		attached() {
			this.initCanvas()
		}
	},
	methods: {
		// 初始化画布
		initCanvas() {
			// const {canvasWidth, canvasHeight} = this.properties
			this.createSelectorQuery().select("#myCanvas").fields({node: true, size: true}).exec(res => {
				this.data.canvas = res[0].node
				this.data.ctx = this.data.canvas.getContext("2d")
				// Canvas 画布的实际绘制宽高
				// const width = res[0].width
				// const height = res[0].height

				// 初始化画布大小
				const dpr = wx.getWindowInfo().pixelRatio
				// this.canvas.width = width * this.dpr
				// this.canvas.height = height * this.dpr
				this.data.ctx.scale(dpr, dpr)
				// 清空画布
				// this.data.ctx.clearRect(0, 0, canvasWidth, canvasHeight)
				// 绘制图片
				// this.drawImage()
				this.loadImage()
			})
		},
		loadImage() {
			// const ctx = wx.createCanvasContext('myCanvas');
			const image = this.data.canvas.createImage();
			const that = this
			image.onload = () => {
				const canvasWidth = this.properties.width;
				const canvasHeight = this.properties.height;
				const imageWidth = image.width;
				const imageHeight = image.height;

				let drawWidth, drawHeight, scaleX, scaleY;

				if (imageWidth > canvasWidth || imageHeight > canvasHeight) {
					scaleX = canvasWidth / imageWidth;
					scaleY = canvasHeight / imageHeight;

					if (scaleX > scaleY) {
						drawWidth = imageWidth * scaleY;
						drawHeight = imageHeight * scaleY;
					} else {
						drawWidth = imageWidth * scaleX;
						drawHeight = imageHeight * scaleX;
					}
				} else {
					drawWidth = imageWidth;
					drawHeight = imageHeight;
				}

				this.setData({
					canvasWidth: drawWidth,
					canvasHeight: drawHeight
				});

				that.data.ctx.drawImage(image, 0, 0, drawWidth, drawHeight);
				// that.data.ctx.draw();
			};

			image.src = this.properties.src;
		},
		onMovableChange(e) {
			const { x, y } = e.detail;

			this.setData({
				x: x,
				y: y
			});
		}
	}
});
