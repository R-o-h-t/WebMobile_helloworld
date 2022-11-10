// This service get a random number from the appendChild
// uses BadgeAPI https://developer.mozilla.org/en-US/docs/Web/API/Badging_API

interface Navigator {
  setAppBadge(content: number): Promise<void>;
  clearAppBadge(): Promise<void>;
}

// run every 5 seconds
setInterval(async () => {
  navigator.clearAppBadge().catch((err) => {
    console.log(err);
  });
  //   const randInt = Math.floor(Math.random() * 99) + 1;
  const randInt = await fetch(
    "https://www.randomnumberapi.com/api/v1.0/random?min=1&max=99&count=1"
  ).then((response) => {
    return response.json().then((data) => {
      return data[0];
    });
  });

  //log the randInt
  console.log("randInt", randInt);

  //set an app badge with the randInt as value
  navigator.setAppBadge(randInt).catch((err) => {
    console.log(err);
  });
}, 5000);
