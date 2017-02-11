const assert = require('assert');
const icrawler = require('../../index');

function crawl(url, contentCheckFn, callback) {
  return new Promise((resolve, reject) => {
    icrawler.crawl(url).then(visited => {
      resolve(visited);
    })
  }).then((result) => {
    contentCheckFn(result);
    callback();
  });
}

function isValidUrlResultValid(result) {
  // check if we have at least one page
  assert.equal(true, result.length > 0);
  // dictionary to check for duplicate urls!
  const urlMap = {};
  // check that every element in the result has a url
  for (let n of result) {
    assert.equal(n.url && typeof n.url === 'string', true);

    if (!urlMap[n.url]) {
      urlMap[n.url] = 1;
    } else {
      // duplicate url, assert false!
      assert(false);
    }

    // check that every element that has asset contains protocol string
    if (n.assets.length > 0) {
      // dictionary to check for duplicate assets!
      const assetMap = {};
      for (let s of n.assets) {
        assert.equal(true, s.includes('http'));
        if (!assetMap[s]) {
          urlMap[s] = 1;
        } else {
          // duplicate url, assert false!
          assert(false);
        }
      }
    }
  }
}

function isInvalidUrlResultValid(result) {
  // check if we have at least one page
  assert.equal(0, result.length);
}

module.exports = {
  crawl,
  isValidUrlResultValid,
  isInvalidUrlResultValid,
}
