var handlers = {};

handlers['scanimg'] = function(info, tab) {
    console.log("info: " + JSON.stringify(info));
    console.log(info.srcUrl);
};

handlers['copyimg4markdown'] = function(info, tab) {
    console.log('sent message...');
    chrome.tabs.sendMessage(tab.id, {c:'copyimg2markdown', p: info.srcUrl});
    console.log(tab.id);
    console.log(info.srcUrl);
};

function onClickHandler(info, tab) {
    if ('function' !== typeof(handlers[info.menuItemId])) {
        console.log('menu item '+info.menuItemId+' no action.');
        return;
    }
    console.log('menu item '+info.menuItemId+' action.');
    handlers[info.menuItemId](info, tab);
};


// Create a parent item and two children.
chrome.contextMenus.create(
    {
        "title": "Pictures Hunter", 
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
        "id": "copyimg4markdown",
        "title": "转存图片并拷贝为Markdown",
        "parentId": "p",
        "contexts": ['image']
        });

chrome.contextMenus.onClicked.addListener(onClickHandler);