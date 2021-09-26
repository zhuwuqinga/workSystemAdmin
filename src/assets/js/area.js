import address from './address'

// 省份
export const province = address.filter(i => {
  return i.level === '0'
})

// 城市
export const loadCity = (pid) => {
  const cityList = []
  address.forEach(i => {
    if (i.level === '1' && i.value.substring(0, 2) === pid.substring(0, 2)) {
      cityList.push(i)
    }
  })
  return cityList
}

// 区县
export const loadArea = (pid) => {
  const areaList = []
  address.forEach(i => {
    if (i.level === '2' && i.value.substring(0, 4) === pid.substring(0, 4)) {
      areaList.push(i)
    }
  })
  return areaList
}
