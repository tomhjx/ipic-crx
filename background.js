var handlers = {};

handlers['scanimgOnClickHandler'] = function(info, tab) {
    console.log("info: " + JSON.stringify(info));
    console.log(info.srcUrl);
};

handlers['copyimgOnClickHandler'] = function(info, tab) {
    var doc = window.document;
    const input = doc.createElement('textarea');
    input.style.position = 'fixed';
    input.style.opacity = 0;
    input.value = info.srcUrl;
    doc.body.appendChild(input);
    input.select();
    doc.execCommand('Copy');
    doc.body.removeChild(input);
};

function onClickHandler(info, tab) {
    if ('function' !== typeof(handlers[info.menuItemId+'OnClickHandler'])) {
        console.log('menu item '+info.menuItemId+' no action.');
        return;
    }
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
        "title": "复制图片地址",
        "parentId": "p",
        "contexts": ['image']
        });

chrome.contextMenus.onClicked.addListener(onClickHandler);