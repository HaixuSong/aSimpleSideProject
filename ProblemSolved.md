### 1.Auto-login screen flashing

**Problem:** In-order to make this app with auto-login, due to the current situation(SPA), a ajax request needs to be sent to server to examine if this user is login(using cookies and session). But if async ajax request is using, the page will flash login-page since the map-page is rendered after the ajax respond came. 

**Solution:** A very simple solution is using sync ajax(xhr) instead of async axios or xhr. API just like this. This may cause a little lag while first-rendering the page, but solved the flashing problem. Definitely better.

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

### 3.@react-google-map/api keep requesting problem

**Problem: **while using @react-google-map component doing a request from google-map and then render the result (like what the official example code did), you may find that tens of requests are sent and the whole map is rendered tens of times. What happened is that when there's some component inside the map needs rendering, the whole google-map re-rendered, so the request is re-sent and result is re-get, new result is re-rendered , then the whole map is re-rendered, then the request is re-send....(endless loop)...... until google-map api stops you from doing this. It's quite dangerous since this kind of thing may cost you several buck in just few minutes.

**Solution:** use another load-script tag to do the request separately. Or just use the official google-map api instead of this library.

### 4.google-map api rendering directions using url api response.

**Problem: ** I think this is a popular problems with project using gmap. If you want to reduce cost of direction requests, you may want to store the respond from gmap into your database. However, when you try to get the direction response from you database and try to render it on map, there's problem that DirectionRenderer doesn't recognize it. The problem is that url direction api returns a json object, but DirectionRenderer needs an instance (with methods in it). Like LatLng instance is not the same with LatLng json object. 

**Solution: **As far as I know, DirectionRendered is the only one that can't render object result. So you can use other services. If you still wanna use it, you can either change the object into instance using the tools (like google.maps.LatLng()) in google.maps, or just request for a direction service once you need it (cost more). 

### 5.