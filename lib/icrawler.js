/* eslint-disable no-await-in-loop, no-return-await, import/prefer-default-export, no-unused-vars */
import request from 'request';
import htmlparser from 'htmlparser2';
import Queue from './util/queue';
import urlUtils from './util/url';

const {
  formatURL,
  extractHostname,
  isProtocolHttps,
  appendMissingProtocol,
} = urlUtils;

const ACCEPTABLE_REL_TYPES = ['stylesheet', 'icon'];

/**
 * Given an array of visited url, check if a given url is in the array
 * @param  {String}  url     given url
 * @param  {Array}  visited  array of visited urls
 * @return {Boolean}         determines if given url has been visited
 */
function isPageVisited(url, visited) {
  for (let i = 0; i < visited.length; i += 1) {
    if (visited[i].url === url) {
      return true;
    }
  }
  return false;
}

/**
 * Parses html content and retrieve the links to the static assets and
 * links of urls to visit next.
 * @param  {String}  htmlContent html content from http request
 * @param  {Object}  queue       queue data structure that contains list of urls
 *                               to visit
 * @param  {String}  url         current url that we are visiting
 * @param  {Boolean} isUrlHttps  does url have https protocol?
 * @return {Object}              result from parsing current page and new queue
 */
function parseHTML(htmlContent, queue, url, isUrlHttps) {
  const node = {};
  node.url = url;
  node.assets = [];

  const parser = new htmlparser.Parser({
    onopentag: (name, n) => {
      const hostname = extractHostname(url, isUrlHttps);
      switch (name) {
        case 'script':
        case 'img':
          if (n.src && !node.assets.includes(n.src)) {
            const formattedUrl = formatURL(n.src, hostname);
            node.assets.push(formattedUrl);
          }
          break;
        case 'link':
          if (ACCEPTABLE_REL_TYPES.includes(n.rel)
            && !node.assets.includes(n.href)) {
            const formattedUrl = formatURL(n.href, hostname);
            node.assets.push(formattedUrl);
          }
          break;
        case 'a':
          if (n.href) {
            const formattedUrl = formatURL(n.href, hostname);
            // exclude subdomain
            if (formattedUrl.includes(url)
              && !formattedUrl.includes('mailto')
              && !queue.isElementExist(formattedUrl)) {
              queue.enq(formattedUrl);
            }
          }
          break;
        default:
          break;
      }
    },
  });

  parser.write(htmlContent);
  parser.end();
  return { node, queue };
}

/**
 * Mark current page in a website as 'visited' by putting it into the visited array
 * followed by parsing the html content
 * @param  {String}  url        Current url that we are visiting
 * @param  {Object}  queue      queue data structure that contains list of urls
 *                              to visit
 * @param  {Array}   visited    array of visited urls
 * @param  {Boolean} isUrlHttps does url have https protocol?
 * @return {Promise}            returns queue and visited when resolved
 */
function visitPage(url, queue, visited, isUrlHttps) {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        if (isPageVisited(url, visited)) {
          return resolve({ queue, visited });
        }
        const parsedHTMLoutput = parseHTML(body, queue, url, isUrlHttps);
        visited.push(parsedHTMLoutput.node);
        return resolve({ queue: parsedHTMLoutput.queue, visited });
      }
      return reject({ queue, visited });
    });
  })
  .then({ queue, visited })
  // suppress errors silently
  .catch(e => ({ queue, visited }));
}

/**
 * Crawl the given website url using BFS algorithm
 * @param  {String}    initUrl    url given by the user
 * @return {Promise}              returns array of visited urls when resolved
 */
async function crawl(initUrl) {
  const rootUrl = appendMissingProtocol(initUrl);
  // queue to implement BFS algorithm
  let queue = new Queue();
  let visited = [];
  const isUrlHttps = isProtocolHttps(rootUrl);

  queue.enq(rootUrl);

  while (queue.getQueue().length > 0) {
    const curr = queue.deq();
    const res = await visitPage(curr, queue, visited, isUrlHttps);
    queue = res.queue;
    visited = res.visited;
  }
  return await visited;
}

export { crawl };
