"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) =>
    function __require() {
      return (
        mod ||
          (0, cb[__getOwnPropNames(cb)[0]])(
            (mod = { exports: {} }).exports,
            mod
          ),
        mod.exports
      );
    };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) =>
        x.done
          ? resolve(x.value)
          : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // public/sw.ts
  var require_sw = __commonJS({
    "public/sw.ts"(exports) {
      console.log("Hello from Service Worker!");
      self.addEventListener("install", (e) =>
        __async(exports, null, function* () {
          console.log("Service Worker Installed");
          const cache = yield caches.open("static-cache");
          cache
            .addAll([
              "./",
              "./index.html",
              "./sw.ts",
              "./assets/coda_sign.png",
              "offline.html",
            ])
            .then(function () {
              console.log("Cached all files");
            });
        })
      );
      self.addEventListener("activate", (e) =>
        __async(exports, null, function* () {
          console.log("Service Worker Activated");
        })
      );
      self.addEventListener("fetch", (e) =>
        __async(exports, null, function* () {
          console.log("Fetch Event");
          const req = e.request;
          const url = new URL(req.url);
          if (url.origin === location.origin) {
            console.log("Fetch Event: Cache First");
            e.respondWith(cacheFirst(req));
          } else {
            console.log("Fetch Event: Network First");
            e.respondWith(networkFirst(req));
          }
        })
      );
      function cacheFirst(req) {
        return __async(this, null, function* () {
          const cache = yield caches.open("static-cache");
          const cached = yield cache.match(req);
          return (
            cached ||
            fetch(req).catch((e) => {
              console.log("Error: ", e);
              return caches.match("offline.html").then((res) => {
                return res || new Response("Offline");
              });
            })
          );
        });
      }
      function networkFirst(req) {
        return __async(this, null, function* () {
          const cache = yield caches.open("static-cache");
          try {
            const fresh = yield fetch(req);
            return fresh;
          } catch (e) {
            const cached = yield cache.match(req);
            return cached || new Response("Not Found");
          }
        });
      }
    },
  });
  require_sw();
})();
