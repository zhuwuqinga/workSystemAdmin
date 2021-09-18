import address from './address'

// const province = address.filter(i => {
//   return i.level === '0'
// })

export const province = address.filter(i => {
  return i.level === '0'
})
