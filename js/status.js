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
        statusDiv.classList.add("bg-green-200", "dark:bg-green-300", "text-green-900", "p-2", "rounded-lg", "my-4", "max-w-fit", "mx-auto");
    } else if (status === 'failure') {
        statusDiv.setAttribute('translate','form-status-error')
        statusDiv.classList.add("bg-red-200", "dark:bg-red-300", "text-red-900", "p-2", "rounded-lg", "my-4", "max-w-fit", "mx-auto");
    }
  }
});