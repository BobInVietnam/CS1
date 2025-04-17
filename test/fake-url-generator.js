const fs = require('fs');

function getRandomString(length) {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
  }
  return result;
}

// Function to generate a random URL
function generateRandomURL() {
  const protocols = ['http', 'https'];
  const domains = ['.com', '.org', '.net', '.io', '.dev'];
  const subdomain = getRandomString(8);
  const domain = getRandomString(5);
  const path = getRandomString(6);
  const protocol = protocols[Math.floor(Math.random() * protocols.length)];
  const tld = domains[Math.floor(Math.random() * domains.length)];
  return `${protocol}://${subdomain}.${domain}${tld}/${path}`;
}

// Generate a list of URLs
const numberOfUrls = 100000; // You can change this
const urls = [];

for (let i = 0; i < numberOfUrls; i++) {
  urls.push(generateRandomURL());
}

// Write URLs to a text file
fs.writeFile('random_urls.csv', urls.join('\n'), (err) => {
  if (err) throw err;
  console.log('random_urls.csv has been created with random URLs!');
});
