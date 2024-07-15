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
        statusDiv.setAttribute('translate','form-status-success')
        statusDiv.style.color = 'green';
    } else if (status === 'failure') {
        statusDiv.setAttribute('translate','form-status-error')
        statusDiv.style.color = 'red';
    }
  }
});