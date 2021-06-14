$(function(){

    chrome.storage.sync.get({
        token: '',
        domain: '',
        region: ''
      }, function(items) {
        $('#tokenInput').val(items.token);
        $('#domainInput').val(items.domain);
        $('#regionSelect').val(items.region);
        console.log(items);
      });

    function save(cb) {

      chrome.storage.sync.set({
        token: $('#tokenInput').val(),
        domain: $('#domainInput').val(),
        region: $('#regionSelect').val()
      }, cb);

    }      

    $('#applyBtn').click(function(){
      save(function() {
            alert('配置保存成功');
        });
    });

    $('#keepBtn').click(function(){
      save(function() {
        window.close();
        });
    });


});