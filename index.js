function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')
  ;
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

function addRegistration() {
  const key = document.getElementById('public-key').value
  if (!key || key.length === 0) {
    window.alert('A valid key has to be supplied')
  } else {
    navigator.serviceWorker.ready
      .then(async ({pushManager}) => {
        const oldSubscription = await pushManager.getSubscription()
        if (oldSubscription) {
          await oldSubscription.unsubscribe()
        }

        const subscribeOptions = {
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(key)
        }

        return pushManager.subscribe(subscribeOptions)
      })
      .then(function(pushSubscription) {
        console.log('Received PushSubscription: ', JSON.stringify(pushSubscription))
        document.getElementById("subscription").innerHTML = JSON.stringify(pushSubscription)
        return pushSubscription
      })
  }
}

navigator.serviceWorker.register('service-worker.js')
