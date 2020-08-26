# Further Optimization(0~5)

### 1. Separate Login-page and other-pages(Importance: 5)

**Current Problem**: Current method to solve the login and stay-logged-in problem is by using cookie-session and redux. Redux is used to store `logged-in` status which is received from back-end by async event. This may cause security problem since cookies needs to be sent by axios by http. 

**Solution**: Separate login-page and other-pages can leave the login-certification to the back-end server. Sever may respond different pages due to those cookies within the html request. 

### 2.Map-page filter-button component(Importance:2)

**Current Problem**: Current filter-button component can't solve the on-blur event, which means the detail-panel can't keep displaying while having clicking event on it. That's because if on-blur event is added on filter-button, clicking on every other things will make that event happen. 

**Solution**: Not having a good one yet. Maybe: All other component in map-page adds a clicking-event which changes the redux state. This may work but not good enough. Maybe: I heard that there's multiple-dom-focusing exists. If it really does, there's hope.

