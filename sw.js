/* Version 7.2: network-only medical calculator. No offline clinical results. */
self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 event.respondWith(fetch(event.request,{cache:'no-store'}).catch(()=>{
  if(event.request.mode==='navigate')return new Response('<!doctype html><html><meta charset="utf-8"><title>Connection required</title><body><h1>Connection required</h1><p>This research dosing tool does not serve a cached clinical calculator offline. Reconnect and reload.</p></body></html>',{status:503,headers:{'Content-Type':'text/html; charset=utf-8'}});
  return Response.error();
 }));
});
