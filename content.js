console.log('set up content.js');

var ipic = function() {
  var me = this;

  function _upload(src, options, cb) {
  
    var image_buffer = document.createElement('img');
    image_buffer.setAttribute("crossOrigin",'Anonymous')
    image_buffer.src = src;
    image_buffer.onload = function() {
        var pic = _getBase64Image(image_buffer);
        var domain = 'https://'+options.domain;
        var token = options.token;
        console.log(token);
        var url = 'https://upload-'+options.region+'.qiniup.com/putb64/-1';
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange=function(){
          if (xhr.readyState!=4){
            return;
          }
          console.log(xhr.response);
          var d = xhr.response;
          var returl = domain+'/'+d.key;
          console.log(returl);
          cb(returl);
        }
        xhr.open("POST", url, true);
        xhr.responseType = 'json';
        xhr.setRequestHeader("Content-Type", "application/octet-stream");
        xhr.setRequestHeader("Authorization", "UpToken "+token);
        xhr.send(pic);
    } 
  }

  function _boot(cb) {
    chrome.storage.sync.get({
      token: '',
      domain: '',
      region: ''
    }, function(options) {
      cb(options);
    });
  }

  function _getBase64Image(img) {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL('image/png');
    return dataURL.replace(/data:image\/png;base64,/, '');
 }

  function _clipboard(t) {
      var doc = window.document;
      const input = doc.createElement('textarea');
      input.style.position = 'fixed';
      input.style.opacity = 0;
      input.value = t;
      doc.body.appendChild(input);
      input.select();
      doc.execCommand('Copy');
      doc.body.removeChild(input);
  }

  function _formatMarkDown(url) {
    return '![]('+url+')';
  }



  me.upload = function(src, cb) {
    _boot(function(options){
      _upload(src, options, cb); 
    });
  };

  me.upload4MarkDown = function(src) {

    _boot(function(options){
      _upload(src, options, function(url){
        _clipboard(_formatMarkDown(url));
      }); 
    });

  };

  return me;
};


var msgHandlers = {};

msgHandlers['copyimg2markdown'] = function(msg) {
  ipic().upload4MarkDown(msg.p);
};


chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
    console.log("Got message from background page: ");
    console.log(msg);   
    if ('function' !== typeof(msgHandlers[msg.c])) {
      console.log('msg handlers '+msg.c+' no action.');
      return;
    }
    console.log('msg handlers '+msg.c+' action.');
    msgHandlers[msg.c](msg);
});
console.log('content.js is ok');