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
      

    $('#applyBtn').click(function(){

        chrome.storage.sync.set({
            token: $('#tokenInput').val(),
            domain: $('#domainInput').val(),
            region: $('#regionSelect').val()
          }, function() {
              alert('配置保存成功');
          });

    });

});