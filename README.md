# node-24captcha

A Node.js client for the [24captcha.online](https://24captcha.online/api-docs/) API

---

## Installation

```bash
npm install node-24captcha
```

---

# Features

- create tasks  
- automatically poll for the CAPTCHA token  
- supports invisible and enterprise 
- proxy support
- debug logging
- hCaptcha support 🤑

---

## Usage

```js
import node24captcha from 'node-24captcha'

const client = new node24captcha('yourApiKey', {
  debug: true
})

const token = await client.solveCaptcha({
  sitekey: 'siteKey',
  pageurl: 'https://example.com'
})

console.log(token)
```

---
[`documentation/README.md`](./documentation/README.md)
---

## License
 MIT
