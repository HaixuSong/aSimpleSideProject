### 1.Auto-login screen flashing

**Problem:** In-order to make this app with auto-login, due to the current situation(SPA), a ajax request needs to be sent to server to examine if this user is login(using cookies and session). But if async ajax request is using, the page will flash login-page since the map-page is rendered after the ajax respond came. 

**Solution:** A very simple solution is using sync ajax(xhr) instead of async axios or xhr. API just like this.

```javascript
var request = new XMLHttpRequest();
request.open('GET', 'http://www.mozilla.org/', false); //false means sync
request.send(null);
if (request.status === 200) {
  console.log(request.responseText);
}
//many xhr API are used only for async request so you can't use them here
//like: onload, onreadyStateChange, responseType......
```

### 2.CSS Style text-transform: capital doesn't work

**Problem:** I wrote this CSS style in HTML which means having a very high priority to cover other styles. It works well in all other cases. However, this CSS style shows in dev-tools but doesn't work when writing it after a choice selector.

**Solution:** After checking MDN docs, I found that capitalize are designed to make all words in a paragraph to start with a capital letter even if the word starts with characters like `-`, but excepts: this word starts with number. So I changed the choice selector value from number to string. This style finally works.

![001](.\docPic\001.png)![002](.\docPic\002.jpg)

