console.log('set up content.js');
chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
    console.log("Got message from background page: ");
    console.log(msg);    

    var doc = window.document;
    const input = doc.createElement('textarea');
    input.style.position = 'fixed';
    input.style.opacity = 0;
    input.value = msg.picSrcUrl;
    doc.body.appendChild(input);
    input.select();
    doc.execCommand('Copy');
    doc.body.removeChild(input);

  });
console.log('content.js is ok');