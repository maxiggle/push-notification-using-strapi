var self = this;
self.addEventListener('push', event => {
  console.log('event to show on browser', event);
  console.log('event content', event.data);
  console.log('self registration', self.registration);
  let data;
  if(event.data){
    data = event.data.json();
  }
  console.log('New notification', data)
  const options = {
    body: data.message || "new notification",
  }
  event.waitUntil(
    self.registration.showNotification("new notification", options)
  );
})

// self.addEventListener("push", (event) => {
//   if (event.data) {
//     try {
//       const data = JSON.parse(event.data.json());
//       event.waitUntil(
//         self.registration.showNotification('new notification has been added', {
//           body: data.message || "new notification",
//         })
//       );
//     } catch (e) {
//       console.error('push event data parse fail');
//     }
//   }
// });