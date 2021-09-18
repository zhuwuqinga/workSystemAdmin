import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? 'http://121.40.68.67:8090' : config.baseUrl.pro

const axios = new HttpRequest(baseUrl)
export default axios
