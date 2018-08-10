let pending_request;

chrome.contextMenus.create({
    id: "insert-test-text",
    title: "Insert test text",
    contexts: ["editable"]

});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  switch (info.menuItemId) {
    case "insert-test-text":
      console.debug(pending_request);
      if (typeof pending_request !== undefined) {
        pending_request({"text": "test foo"});
      }
      console.debug(info);
      break;
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.command) {
    case "get_text":
      pending_request = sendResponse;
      console.debug(pending_request);
      break;
  }
  return true;
});
