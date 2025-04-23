import node24captcha from './index.js'

(async()=>{
    const solver=new node24captcha('apiKey', {
      debug:true
    })
  
    try {
      const token=await solver.solveCaptcha({
        sitekey: 'a5f74b19-9e45-40e0-b45d-47ff91b7a6c2',
        pageurl: 'https://accounts.hcaptcha.com/demo',
        //proxy: 'root:password@127.0.0.1:69420',
        //proxytype: 'HTTPS',
        invisible: false,
        enterprise: false
      })
      console.log(token)
    } catch (err) {
      console.error(err.message)
    }
})()
