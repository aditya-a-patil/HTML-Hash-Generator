
var htmlSource = "";
var htmlHash = "0";

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {

    htmlSource = request.source;
    htmlHash = SHA256_hash(htmlSource);
    console.log(htmlHash);
    message.innerText = htmlHash;
  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "js/getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error computing hash : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;


document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('refreshHash');
    // onClick's logic below:
    link.addEventListener('click', function() {
        onWindowLoad();
    });
});


document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('copyHash');
    // onClick's logic below:
    link.addEventListener('click', function() {
        copyTextToClipboard(htmlHash);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('copySource');
    // onClick's logic below:
    link.addEventListener('click', function() {
        copyTextToClipboard(htmlSource);
    });
});


function copyTextToClipboard(text) {
    var copyFrom = $('<textarea/>');
    copyFrom.text(text);
    $('body').append(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.remove();
}
