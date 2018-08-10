document.addEventListener('contextmenu', function(event) {
  console.debug(event);
  chrome.runtime.sendMessage({"command": "get_text"}, function(response){
    event.target.value += response.text;
  });
})
