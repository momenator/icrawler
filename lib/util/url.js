/**
 * Append hostname to given url if it is relative
 * @param  {String} url      current url, may be absolute or relative
 * @param  {String} hostname hostname of root url, including the protocol
 * @return {String}          formatted url
 */
function formatURL(url, hostname) {
  const protocol = hostname.replace(':', '').split('/')[0];
  const isAbsolute = new RegExp('^([a-z]+://|//)', 'i');
  if (isAbsolute.test(url)) {
    if (url.includes('http')) {
      return url;
    }
    return `${protocol}:${url}`;
  }
  const cleanedUrl = url[0] === '/' ? url.slice(1, url.length) : url;
  return `${hostname}/${cleanedUrl}`;
}

/**
 * Append protocol to url string if it is missing
 * @param  {String} urlString given url string
 * @return {String}           url string with protocol
 */
function appendMissingProtocol(urlString) {
  const protocol = 'http';
  if (!urlString.includes('http')) {
    return urlString.includes('localhost') ?
      `${protocol}://${urlString.replace('//', '')}` :
      `${protocol}s://${urlString.replace(':', '').replace('//', '')}`;
  }
  return urlString;
}

/**
 * check if protocol is https given a url string
 * @param  {String}  urlString given url string
 * @return {Boolean}
 */
function isProtocolHttps(urlString) {
  return urlString.replace(':', '').split('/')[0] === 'https';
}

/**
 * Extract hostname from a given url
 * @param  {String}  urlString given url string
 * @param  {Boolean} isHttps   does the root url have https?
 * @return {String}            Extracted hostname from the given url
 */
function extractHostname(urlString, isHttps) {
  let hostname;
  const protocol = isHttps ? 'https' : 'http';
  if (urlString.indexOf('//') > -1) {
    hostname = urlString.split('/')[2];
  } else {
    hostname = urlString.split('/')[0];
  }
  // add the protocol back to the
  hostname = `${protocol}://${hostname.split(':')[0]}`;
  return hostname;
}

export default {
  formatURL,
  extractHostname,
  appendMissingProtocol,
  isProtocolHttps,
};
