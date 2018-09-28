<template>
  <div class="zoom-on-hover" @mousemove="move" @mouseenter="zoom" @mouseleave="unzoom">
    <img class="normal" ref="normal" :src="imgNormal"/>
    <img class="zoom" ref="zoom" :src="imgZoom || imgNormal"/>
  </div>
</template>

<script>
/* eslint-disable */
function pageOffset(el) {
	// -> {x: number, y: number}
	// get the left and top offset of a dom block element
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return {
		y: rect.top + scrollTop,
		x: rect.left + scrollLeft
	}
}
export default {
  data () {
    return {
      scaleFactor: 1,
			resizeCheckInterval: null
    }
  },
  props: ["imgNormal", "imgZoom", "scale", "disabled"],
  mounted () {
    if (this.scale) {
			this.scaleFactor = parseInt(this.scale)
			this.$refs.zoom.style.transform = "scale(" + this.scaleFactor + ")"
		}
		this.initEventLoaded()
		this.initEventResized()
  },
  updated () {
    this.initEventLoaded()
  },
  beforeDestroy () {
    this.resizeCheckInterval && clearInterval(this.resizeCheckInterval)
  },
  methods: {
    zoom () {
			if (this.disabled) return
			this.$refs.zoom.style.opacity = 1
			this.$refs.normal.style.opacity = 0
		},
    unzoom () {
			if (this.disabled) return
			this.$refs.zoom.style.opacity = 0
			this.$refs.normal.style.opacity = 1
		},
    move (event) {
			if (this.disabled) return
			var offset = pageOffset(this.$el)
			var zoom = this.$refs.zoom
			var normal = this.$refs.normal
			var relativeX = event.clientX - offset.x + window.pageXOffset
			var relativeY = event.clientY - offset.y + window.pageYOffset
			var normalFactorX = relativeX / normal.offsetWidth
			var normalFactorY = relativeY / normal.offsetHeight
			var x = normalFactorX * (zoom.offsetWidth * this.scaleFactor - normal.offsetWidth)
			var y = normalFactorY * (zoom.offsetHeight * this.scaleFactor - normal.offsetHeight)
			zoom.style.left = -x + "px"
			zoom.style.top = -y + "px"
		},
    initEventLoaded () {
			// emit the "loaded" event if all images have been loaded
			var promises = [this.$refs.zoom, this.$refs.normal].map(function (image) {
				return new Promise(function (resolve, reject) {
					image.addEventListener("load", resolve)
					image.addEventListener("error", reject)
				})
			})
			var component = this
			Promise.all(promises).then(function () {
				component.$emit("loaded")
			})
		},
    initEventResized () {
			var normal = this.$refs.normal
			var previousWidth = normal.offsetWidth
			var previousHeight = normal.offsetHeight
			var component = this
			this.resizeCheckInterval = setInterval(function () {
				if ((previousWidth != normal.offsetWidth) || (previousHeight != normal.offsetHeight)) {
					previousWidth = normal.offsetWidth
					previousHeight = normal.offsetHeight
					component.$emit("resized", {
						width: normal.width,
						height: normal.height,
						fullWidth: normal.naturalWidth,
						fullHeight: normal.naturalHeight
					})
				}
			}, 1000)
		}
  }
}
</script>

<style scoped>
  .zoom-on-hover {
    position: relative;
    overflow: hidden;
  }
  .zoom-on-hover .normal {
    width: 100%;
  }
  .zoom-on-hover .zoom {
    position: absolute;
    opacity: 0;
    transform-origin: top left;
  }
</style>
