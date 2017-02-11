#icrawler
A simple web crawler that indexes a website's pages and lists down all of static
 assets of each page.

## Installation
You need nodejs version >= 4 and npm version >= 2. Then, download this module and then do ```npm install``` followed by ```npm run build```. You can try the module from a file called playground.js. Alternatively, you can use it in your own project by using ```npm link```. Run ```npm link``` on this module directory and then go to your project directory and run ```npm link icrawler```.

## Tests and QA
Make sure that you are in root directory of the project. To run tests do ```npm run test```
or to run lint do ```npm run lint```.

## Usage
```
const icrawler = require('icrawler');
const url = 'jquery.com';
const res = icrawler.crawl(url).then(result => {
  // do something with result, e.g print it out
  console.log(result);
});
```
Output from ```gocardless.com``` is available on ```output.txt```.

## Caveats
1. Will only work on html, won't work with any other type (json, xml, etc)
2. Does not check if url is valid or not. If url is invalid, or the domain of the url does not exist, it will return an empty array.
3. Might take a while if website is big or internet connection is slow.

## Notes
### What's needed for this library?
1. A library to make HTTP request - can use node http module
2. A library to parse HTML - can use htmlparser or htmlparser2
3. Algorithm to traverse the url

### Task checklist
1. Should not traverse other domains and subdomains - check
2. Make sure that the module does not loop forever when traversing the website - check
3. Get all static assets (images, stylesheets and js) on each page - check
4. Produce output in the specified format - check
5. Don't use web crawling framework - check
6. README with clear installation and running instructions - check
7. Module works as specified (functionality) - check
8. Structure the module nicely and put some comments (structure and clarity) - check
9. Check for edge cases (robustness) - check
10. Write tests (testing) - check
11. Linting - check
