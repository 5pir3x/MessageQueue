const urlasd = 'http://localhost:8081'; // Replace with the actual URL you want to POST to

// Create an object to configure the POST request with the headers you provided and the body "123"
var requestOptionsss = {
  method: 'POST',
  body:  '{ "body" : "ghj124"}' // Specify the request body
};
 requestOptionsss.body = '{ "body" : "ghj1jhk254"}';
// Make the POST request with the specified headers and body
fetch(urlasd, requestOptionsss)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text(); // Parse response body as text or use other methods based on response content type
  })
  .then(data => {
    console.log('Response from server:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });