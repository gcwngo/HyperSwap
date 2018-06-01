chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    var redirects, pattern, orgUrl, replUrl, redirectedUrl;
    redirects = JSON.parse(localStorage.getItem('redirects') || '[]');
    for (var i=0; i<redirects.length; i++) {
      orgUrl = redirects[i][0];
      replUrl = redirects[i][1];
      try {
        pattern = new RegExp(orgUrl, 'ig');
      } catch(err) {
        continue;
      }
      match = details.url.match(pattern);
      if (match) {
        redirectUrl = details.url.replace(pattern, replUrl);
        if (redirectUrl != details.url) {
          return {redirectUrl: redirectUrl};
        }
      }
    }
    return {};
  },
  {
    urls: [
      "<all_urls>",
    ],
    types: ["main_frame"]
  },
  ["blocking"]
);
