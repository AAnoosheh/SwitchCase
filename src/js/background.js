function sendUppercaseMsg() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "UP"});
    });
}
function sendLowercaseMsg() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "LO"});
    });
}

var upCase = "Switch to Uppercase";
var loCase = "Switch to Lowercase";
chrome.contextMenus.create({"title": upCase, "contexts":['selection'], "onclick": sendUppercaseMsg});
chrome.contextMenus.create({"title": loCase, "contexts":['selection'], "onclick": sendLowercaseMsg});