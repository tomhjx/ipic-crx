var handlers = {};

handlers['scanimgOnClickHandler'] = function(info, tab) {
    console.log("info: " + JSON.stringify(info));
    console.log(info.srcUrl);
};

handlers['copyimgOnClickHandler'] = function(info, tab) {
    // var doc = window.document;
    // const input = doc.createElement('textarea');
    // input.style.position = 'fixed';
    // input.style.opacity = 0;
    // input.value = info.srcUrl;
    // doc.body.appendChild(input);
    // input.select();
    // doc.execCommand('Copy');
    // doc.body.removeChild(input);
    console.log('sent message...');
    chrome.tabs.sendMessage(tab.id, {c:'copyimg2markdown', p: info.srcUrl});
    console.log(tab.id);
    console.log(info.srcUrl);
};

function onClickHandler(info, tab) {
    if ('function' !== typeof(handlers[info.menuItemId+'OnClickHandler'])) {
        console.log('menu item '+info.menuItemId+' no action.');
        return;
    }
    console.log('menu item '+info.menuItemId+' action.');
    handlers[info.menuItemId+'OnClickHandler'](info, tab);
};


// Create a parent item and two children.
chrome.contextMenus.create(
    {
        "title": "ipic", 
        "id": "p",
        "contexts": ['image']
    });
chrome.contextMenus.create(
    {
        "id": "scanimg",
        "title": "查看图片信息",
        "parentId": "p",
        "contexts": ['image']
    });
chrome.contextMenus.create(
    {
        "id": "copyimg",
        "title": "转存图片并拷贝(markdown)",
        "parentId": "p",
        "contexts": ['image']
        });

chrome.contextMenus.onClicked.addListener(onClickHandler);