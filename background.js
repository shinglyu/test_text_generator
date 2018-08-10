let pendingSendResponse;

// Top level menu item
chrome.contextMenus.create({
    id: "insert-test-text",
    title: "Insert test text",
    contexts: ["editable"]

});

// First level child item
chrome.contextMenus.create({
    id: "insert-timestamp",
    title: "Timestamp",
    contexts: ["editable"],
    parentId: "insert-test-text"
});

chrome.contextMenus.create({
    id: "insert-lorem-ipsum",
    title: "Lorem Ipsum (50 words)",
    contexts: ["editable"],
    parentId: "insert-test-text"
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  switch (info.menuItemId) {
    case "insert-test-text":
      // Top level menu, nothing to do
      break;
    case "insert-timestamp":
      if (typeof pendingSendResponse === 'function') {
        pendingSendResponse({"text": (new Date()).toISOString()});
      }
      break;
    case "insert-lorem-ipsum":
      if (typeof pendingSendResponse === 'function') {
        pendingSendResponse({"text": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."});
      }
      break;
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.command) {
    case "get_text":
      pendingSendResponse = sendResponse;
      console.debug(pendingSendResponse);
      break;
  }
  return true;
});
