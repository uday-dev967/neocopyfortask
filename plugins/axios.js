export default function ({ isDev, $axios, store }) {
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      localStorage.clear();
      if(window.self == window.top)
      window.location.replace('/')
      else
      window.location.replace('/noAuth')
    } else if (code === 403) {
        window.location.href = window.location.origin + '/access-denied'
    }
  })
  if (isDev) {
    const log = function log(level) {
      let _console;
    
      for (var _len = arguments.length, messages = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        messages[_key - 1] = arguments[_key];
      }
    
      return (_console = console)[level].apply(_console, ['[Axios]'].concat(messages));
    };
    // request
    $axios.onRequestError(function (error) {
      log('error', 'Request error:', error);
    });

    // response
    $axios.onResponseError(function (error) {
      log('error', 'Response error:', error);
    });
    $axios.onResponse(function (res) {
      log('info', '[' + (res.status + ' ' + res.statusText) + ']', '[' + res.config.method.toUpperCase() + ']', res.config.url);

      // if (process.browser) {
      // } else {
      // }

      return res;
    });
  }
}
