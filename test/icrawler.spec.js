const assert = require('assert');
const icrawler = require('../index');
const helper = require('./helpers');

const { crawl, isValidUrlResultValid, isInvalidUrlResultValid } = helper;
const VALID_URL = 'http://www.jquery.com';
const VALID_SECURE_URL = 'https://www.jquery.com';
const INVALID_URL = 'thisisnotaurl';
const INCOMPLETE_URL = 'jquery.com';
const NONEXISTENT_DOMAIN = 'http://walafdsafasddsafsadfds.com/';
const LONG_TIMEOUT = 10000; // 10 seconds
const MID_TIMEOUT = 5000;

// This test may fail if the internet is slow and the website
// is huge
describe('icrawler test suite', () => {
  describe(`crawling a valid url (${VALID_URL})`, function() {
    it('should return the contents based on the spec', function(done) {
      this.timeout(LONG_TIMEOUT);
      crawl(VALID_URL, isValidUrlResultValid, done);
    });
  });

  describe(`crawling a valid secure url (${VALID_SECURE_URL})`, function() {
    it('should return the contents based on the spec', function(done) {
      this.timeout(LONG_TIMEOUT);
      crawl(VALID_SECURE_URL, isValidUrlResultValid, done);
    });
  });

  describe(`crawling an incomplete url (${INCOMPLETE_URL})`, function() {
    it('should return the contents based on the spec', function(done) {
      this.timeout(LONG_TIMEOUT);
      crawl(INCOMPLETE_URL, isValidUrlResultValid, done);
    });
  });

  describe(`crawling an invalid url (${INVALID_URL})`, function() {
    it('should return an empty array', function(done) {
      this.timeout(MID_TIMEOUT);
      crawl(INVALID_URL, isInvalidUrlResultValid, done);
    });
  });

  describe(`crawling a invalid url (a nonexistent domain ${NONEXISTENT_DOMAIN})`, function() {
    it('should return an empty array', function(done) {
      this.timeout(MID_TIMEOUT);
      crawl(NONEXISTENT_DOMAIN, isInvalidUrlResultValid, done);
    });
  });
});
