export default {
  hasPermission() {
    return Notification.permission === 'granted';
  },
  newNotification(title, subtext) {
    const options = {
      body: subtext,
    }
    const noti = new Notification(title, options);
    return noti;
  },
}