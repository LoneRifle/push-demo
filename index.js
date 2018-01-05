function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')
  ;
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

navigator.serviceWorker.register('service-worker.js')

navigator.serviceWorker.ready
  .then(function(registration) {
    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        'BK-8sZRkdMcKuIitgPAjhcyztJfTg8iLEip7Jn_9QrrZzOW_eIZlUmtDkCwBRnTbSnxH-_0C6P9t3kr-zAoTLy4'
      )
    }

    return registration.pushManager.subscribe(subscribeOptions)
  })
  .then(function(pushSubscription) {
    console.log('Received PushSubscription: ', JSON.stringify(pushSubscription))
    document.getElementById("subscription").innerHTML = JSON.stringify(pushSubscription)
    return pushSubscription
  })
