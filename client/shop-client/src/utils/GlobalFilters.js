export default function (Vue) {
  Vue.filter('filterGoodsType', val => {
    switch (val) {
      case 1:
        return '电脑'
      case 2:
        return '智能手机'
      case 3:
        return '耳机'
      case 4:
        return '相机'
      case 5:
        return '家电'
      case 6:
        return 'A I'
      default:
        return ''
    }
  })
  Vue.filter('formatPrice', val => {
    if (val) {
      return Number(val).toFixed(2)
    } else {
      return '0.00'
    }
  })
}
