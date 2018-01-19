import checkType from './checkType'

export default function (obj = {}) {
  if (!checkType(obj, 'Object')) {
    return ''
  }

  const queryArr = []

  Object.keys(obj).forEach((key) => {
    queryArr.push(`${key}=${encodeURIComponent(obj[key])}`)
  })

  return `${queryArr.join('&')}`
}