import { precacheAndRoute } from "workbox-precaching";
import { offlineFallback } from "workbox-recipes";
import { NetworkOnly } from "workbox-strategies";
import { registerRoute } from "workbox-routing";

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ url }) => url.pathname.startsWith("/page/"),
  new NetworkOnly()
);

offlineFallback({
  pageFallback: "/offline.html",
});
