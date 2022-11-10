"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // public/badge_service.ts
  var require_badge_service = __commonJS({
    "public/badge_service.ts"(exports) {
      setInterval(() => __async(exports, null, function* () {
        navigator.clearAppBadge().catch((err) => {
          console.log(err);
        });
        const randInt = yield fetch(
          "https://www.randomnumberapi.com/api/v1.0/random?min=1&max=99&count=1"
        ).then((response) => {
          return response.json().then((data) => {
            return data[0];
          });
        });
        console.log("randInt", randInt);
        navigator.setAppBadge(randInt).catch((err) => {
          console.log(err);
        }).then((result) => {
          console.log("result", result);
        });
      }), 5e3);
    }
  });
  require_badge_service();
})();
