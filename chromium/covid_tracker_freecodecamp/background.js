


chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: "My Extra Option",
    contexts: ["page", "selection", "link", "editable", "image", "video", "audio"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "myExtraOption") {
    chrome.tabs.executeScript({
      code: 'window.getSelection().toString();'
    }, function(selection) {
      var text = selection[0];
      var filename = "mytextfile.txt";
      var blob = new Blob([text], { type: 'text/plain' });
      var url = URL.createObjectURL(blob);
      chrome.downloads.download({
        url: url,
        filename: filename
      });
    });
  }
});

