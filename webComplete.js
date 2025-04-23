// may need this idk
// it worked for https://accounts.hcaptcha.com/demo lol
function complete(token) {
  document.querySelectorAll('textarea[name="h-captcha-response"]').forEach(input => {
      input.value = token
      // uncomment if it doesnt work ykwim okay cool
      // input.dispatchEvent(new Event('change', { bubbles: true }))
  })

  const container = document.querySelector('.h-captcha[data-callback]')
  if (container) {
      const callbackFn = window[container.getAttribute('data-callback')]
      if (typeof callbackFn === 'function') {
          callbackFn(token)
      }
  }
}