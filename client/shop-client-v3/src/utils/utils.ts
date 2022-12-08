import moment from 'moment';

export default {
  isPhone (val: string) {
    if (/^1[3456789][0-9]{9}$/g.test(val)) {
      return true
    } else {
      return false
    }
  },
  isEmail (val: string) {
    if (/^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/g.test(val)) {
      return true
    } else {
      return false
    }
  }
}

export function getGoodsType(val: number) {
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
}
export function formatPrice(val: number) {
  if (val) {
    return Number(val).toFixed(2)
  } else {
    return '0.00'
  }
}
export function formatDateTime(val: string) {
  if (val) {
    return moment(parseInt(val)).format('YYYY-MM-DD HH:mm:ss')
  } else {
    return '----'
  }
}
