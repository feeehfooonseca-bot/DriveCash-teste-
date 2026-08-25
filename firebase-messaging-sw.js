/* DriveCash — Firebase Cloud Messaging Service Worker — TESTE v1.22.4 */
importScripts('https://www.gstatic.com/firebasejs/12.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.9.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:'AIzaSyD6K6hrkmJLEpD5_oMl0Bvl0yhY2jkztq8',
  authDomain:'drivecash-d094c.firebaseapp.com',
  projectId:'drivecash-d094c',
  storageBucket:'drivecash-d094c.firebasestorage.app',
  messagingSenderId:'716930122730',
  appId:'1:716930122730:web:74e836c0a545c4eea5e893',
  measurementId:'G-P72GPJZDHR'
});

const messaging=firebase.messaging();

const FALLBACK_URL=
'./DriveCash-CONSOLIDADO-v1.22.4-TESTE-COMPACTO.html?push=1#insights';

messaging.onBackgroundMessage(payload=>{
  if(payload && payload.notification) return;

  const data=(payload&&payload.data)||{};
  const title=data.title||'DriveCash Pro';
  const body=data.body||data.message||'Você recebeu um novo insight.';

  self.registration.showNotification(title,{
    body,
    tag:data.tag||'drivecash-insight',
    data:{url:data.url||FALLBACK_URL},
    renotify:false
  });
});

self.addEventListener('notificationclick',event=>{
  event.notification.close();

  const target=
    (event.notification &&
     event.notification.data &&
     event.notification.data.url)
    || FALLBACK_URL;

  event.waitUntil(
    clients.matchAll({
      type:'window',
      includeUncontrolled:true
    }).then(list=>{
      for(const client of list){
        if('focus' in client){
          try{ client.navigate(target); }catch{}
          return client.focus();
        }
      }

      return clients.openWindow
        ? clients.openWindow(target)
        : undefined;
    })
  );
});
