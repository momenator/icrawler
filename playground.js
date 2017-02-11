const icrawler = require('./index');

// sample url
const url = 'jquery.com';

const res = icrawler.crawl(url).then(visited => {
  // print the output
  console.log(visited);
});
