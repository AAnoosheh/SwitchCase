
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == 'UP') {
            transformSelectedText(true);
        }
        else if (request.action == 'LO') {
            transformSelectedText(false);
        }
    });

function transformSelectedText(uppercase) {
    var sel, range, replacementText;
    if (window.getSelection) {
        sel = window.getSelection();
        if (uppercase) {
            replacementText = sel.toString().toUpperCase();
        } else {
            replacementText = sel.toString().toLowerCase();
        }
        var activeElement = document.activeElement;
        if (activeElement.nodeName == "TEXTAREA" || /*activeElement.isContentEditable ||*/
           (activeElement.nodeName == "INPUT" && activeElement.type.toLowerCase() == "text")) {
               var val = activeElement.value, start = activeElement.selectionStart, end = activeElement.selectionEnd;
               activeElement.value = val.slice(0, start) + replacementText + val.slice(end);
        } else {
          if (sel.rangeCount) {
              range = sel.getRangeAt(0);
              range.deleteContents();
              range.insertNode(document.createTextNode(replacementText));
          } else {
              sel.deleteFromDocument();
          }
        }
    } else if (document.selection && document.selection.createRange) {
        sel = document.selection;
        if (uppercase) {
            replacementText = sel.toString().toUpperCase();
        } else {
            replacementText = sel.toString().toLowerCase();
        }
        range = document.selection.createRange();
        range.text = replacementText;
    }
}