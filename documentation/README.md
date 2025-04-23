# node-24captcha Documentation
(most of this was ripped from the 24captcha API docs bc im lazy :3)
## Overview
`node-24captcha` is a Nodejs client for [24captcha.online](https://24captcha.online/api-docs/) API.
---

## Constructor

### `new client(apiKey, options)`

**Parameters:**
- `apiKey` (string): 24captcha API key
- `options` (object, optional):
  - `pollingInterval` (number): Time in between poll attempts in ms (default: 2000)
  - `timeout` (number): Max wait time for a CAPTCHA token in ms (default: 60000)
  - `debug` (boolean): Enables debug logging(default: false)

---

## Methods

### `createTask({ sitekey, pageurl, proxy, proxytype, rqdata, invisible, enterprise, json })`

Creates a new task

**Parameters:**
- `sitekey` (string): The CAPTCHA sitekey
- `pageurl` (string, optional): CAPTCHA PAge URL
- `proxy` (string, optional): Proxy in IP:PORT:USER:PASS format
- `proxytype` (string, optional): Proxy type (`HTTPS`, `HTTP`)
- `rqdata` (string, optional): In most cases you see it as rqdata inside network requests.
- `invisible` (boolean, optional): Use true for invisible version of captcha.
- `enterprise` (boolean, optional): Use true for enterprise or discord captcha.
- `json` (boolean, optional): 0 - server will send the response as plain text, 1 - tells the server to send the response as JSON

**Returns:** Task ID (string) or throws error

---

### `getTaskResult(taskId, options)`

Polls until a CAPTCHA is ready

**Parameters:**
- `taskId` (string): ID from `createTask`
- `options` (object, optional):
  - `pollingInterval` (number): Polling delay in ms
  - `timeout` (number): Max total wait time in ms

**Returns:** CAPTCHA token or throws error

---

### `getRawResult(taskId)`

Fetches the raw result for a task

**Parameters:**
- `taskId` (string): task ID

**Returns:** JSON response from API

---

### `getTextResult(taskId)`

Fetches a plaintext result from the API

**Parameters:**
- `taskId` (string): CAPTCHA ID

**Returns:** CAPTCHA token or throws error

---

### `solveCaptcha({ sitekey, pageurl, proxy, proxytype, rqdata, invisible, enterprise })`

method to create a task **AND** wait for result

**Parameters:**
- Same as `createTask` (without `json`) (im lazy)

**Returns:** CAPTCHA token

---

## Debug Logging

If the `debug` flag is enabled in the constructor, logs will be printed

---

## Example

```js
import captchaClient from 'node-24captcha'

const client = new captchaClient('yourApiKey', {
  debug: true
})

const token = await client.solveCaptcha({
  sitekey: 'siteKey',
  pageurl: 'https://example.com'
})

console.log(token)
```
