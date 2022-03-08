var self = this;
self.addEventListener('push', event => {
  console.log('event to show on browser', event);
  console.log('event content', event.data);
  console.log('self registration', self.registration);
  // const data = event.data.json()
  const data = event.data.json;
  console.log('New notification', data)
  // const options = {
  //   body: data,
  // }
  const options = {
    body: data.body,
  }
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
})