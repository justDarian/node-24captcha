// hi so basically i tried to replicate https://24captcha.online/api-docs/
import axios from 'axios'

class client {
  constructor(apiKey, { pollingInterval = 2000, timeout = 60000, debug = false } = {}) {
    this.apiKey = apiKey
    this.apiUrl = 'https://24captcha.online'
    this.pollingInterval = pollingInterval
    this.timeout = timeout
    this.debug = debug
  }

  // bruh
  log(...args) {
    if (this.debug) console.debug('[node-24captcha]', ...args)
  }

  async createTask({ sitekey, pageurl, proxy, proxytype, rqdata, invisible = false, enterprise = false, json = true }) {
    const body = { key: this.apiKey, sitekey, json: json ? 1 : 0 }
    // todo make this effecient :money_mouth:
    if (pageurl) body.pageurl = pageurl
    if (proxy) body.proxy = proxy
    if (proxytype) body.proxytype = proxytype
    if (rqdata) body.rqdata = rqdata
    if (invisible) body.invisible = true
    if (enterprise) body.enterprise = true

    this.log('createTask →', body)
    const { data } = await axios.post(`${this.apiUrl}/in.php`, body)
    this.log('createTask ←', data)

    if (!json) {
      if (data.startsWith('OK|')) return data.split('|')[1]
      const err = new Error(data)
      err.code = data
      throw err
    }

    if (data.status === 1) return data.request
    const err = new Error(data.errorDescription || data.request)
    err.code = data.errorCode || data.request
    throw err
  }

  async getTaskResult(taskId, { pollingInterval = this.pollingInterval, timeout = this.timeout } = {}) {
    const start = Date.now()
    while (true) {
      const body = { key: this.apiKey, action: 'get', id: taskId, json: 1 }
      this.log('getTaskResult →', body)
      const { data } = await axios.post(`${this.apiUrl}/res.php`, body)
      this.log('getTaskResult ←', data.status === 1 ? { ...data, request: '...' } : data)

      if (data.status === 1) return data.request

      if (data.request === 'CAPCHA_NOT_READY') {
        if (Date.now() - start >= timeout) {
          const err = new Error('CAPTCHA_SOLVE_TIMEOUT')
          err.code = 'CAPTCHA_SOLVE_TIMEOUT'
          throw err
        }
        await new Promise(r => setTimeout(r, pollingInterval))
        continue
      }

      const err = new Error(data.errorDescription || data.request)
      err.code = data.errorCode || data.request
      throw err
    }
  }

  async getRawResult(taskId) {
    const body = { key: this.apiKey, action: 'get', id: taskId, json: 1 }
    this.log('getRawResult →', body)
    const { data } = await axios.post(`${this.apiUrl}/res.php`, body)
    this.log('getRawResult ←', data)
    return data
  }

  async getTextResult(taskId) {
    const body = { key: this.apiKey, action: 'get', id: taskId, json: 0 }
    this.log('getTextResult →', body)
    const { data } = await axios.post(`${this.apiUrl}/res.php`, body)
    this.log('getTextResult ←', data.startsWith('OK|') ? 'OK|...' : data)

    if (data === 'CAPCHA_NOT_READY') return null
    if (data.startsWith('OK|')) return data.split('|')[1]

    const err = new Error(data)
    err.code = data
    throw err
  }

  // for mfs who are too lazy to call createTask AND getTaskResult (im mfs)
  async solveCaptcha({ sitekey, pageurl, proxy, proxytype, rqdata, invisible = false, enterprise = false }) {
    const taskId = await this.createTask({ sitekey, pageurl, proxy, proxytype, rqdata, invisible, enterprise, json: true })
    this.log('solveCaptcha taskId generated:',taskId)
    const token = await this.getTaskResult(taskId)
    if (token) this.log('got token for taskId:',taskId)
    return token
  }
}


export default client