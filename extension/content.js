// Content script - reads webpage content

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPageContent') {
    // Get all text from the page
    const content = document.body.innerText || document.body.textContent;
    sendResponse({
      content: content,
      title: document.title,
      url: window.location.href
    });
  }
});
