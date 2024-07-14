// Function to get query parameter by name
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Update the status message based on the query parameter
window.addEventListener('load', () => {
  const statusDiv = document.getElementById('status');
  const status = getQueryParam('status');

  if (statusDiv && status) {
    if (status === 'success') {
      statusDiv.innerHTML = 'Your message has been sent successfully!';
      statusDiv.style.color = 'green';
    } else if (status === 'failure') {
      statusDiv.innerHTML = 'There was an error sending your message. Please try again.';
      statusDiv.style.color = 'red';
    }
  }
});