const urlUtils = require('../build/util/url');
const assert = require('assert');
const {
  formatURL,
  extractHostname,
  appendMissingProtocol,
  isProtocolHttps,
} = urlUtils.default;

describe('util/url test suite', function() {
  describe('formatURL tests', function() {
    it('should append hostname if url is relative', function() {
      const formattedUrl = formatURL('/test/value', 'http://hello.com');
      assert.equal('http://hello.com/test/value', formattedUrl);
    });
    it('should not append hostname if url is absolute', function() {
      const formattedUrl = formatURL('http://hello.com', 'http://hello.com');
      assert.equal('http://hello.com', formattedUrl);
    });
    it('should append hostname protocol if url starts with //', function() {
      const formattedUrl = formatURL('//hello.com', 'https://hello.com');
      assert.equal('https://hello.com', formattedUrl);
    });
  });

  describe('extractHostname tests', function() {
    it('should extract hostname and append protocol correctly', function() {
      const formattedUrl1 = extractHostname('http://hello.com/test/value', false);
      const formattedUrl2 = extractHostname('http://hello.com/test/value', true);
      assert.equal('http://hello.com', formattedUrl1);
      assert.equal('https://hello.com', formattedUrl2);
    });
  });

  describe('appendMissingProtocol tests', function() {
    it('should should append https protocol to url if protocol is missing', function() {
      const formattedUrl = appendMissingProtocol('hello.com');
      assert.equal('https://hello.com', formattedUrl);
    });
    it('should should append http protocol to url is localhost', function() {
      const formattedUrl = appendMissingProtocol('localhost:3000');
      assert.equal('http://localhost:3000', formattedUrl);
    });
  });

  describe('isProtocolHttps tests', function() {
    it('should return true if a url has https', function() {
      const outcome = isProtocolHttps('https://hello.com');
      assert.equal(true, outcome);
    });
    it('should return false if a url has http', function() {
      const outcome = isProtocolHttps('http://hello.com');
      assert.equal(false, outcome);
    });
  });
});
