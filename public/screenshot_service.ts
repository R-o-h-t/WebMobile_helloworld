// add a button "Open webcam" to the toolbar
const toolbarElement = document.getElementById("toolbar");
let stream: MediaStream | undefined = undefined;
let lastScreenshot: string | undefined = undefined;
let video: HTMLVideoElement | undefined = undefined;
if (toolbarElement) {
  const buttonWC = document.createElement("button");
  buttonWC.innerHTML = "Open webcam";
  buttonWC.onclick = () => {
    // open the webcam (Media Device API)
    navigator.mediaDevices.getUserMedia({ video: true }).then((strm) => {
      stream = strm;
      video = document.createElement("video");
      video.srcObject = stream;
      video.play();
      document.body.appendChild(video);
    });
    buttonWC.disabled = true;
    buttonTS.disabled = false;
    buttonDS.disabled = false;
    buttonCS.disabled = false;
  };

  toolbarElement.appendChild(buttonWC);

  // add a button "Take Screenshot" to the toolbar taking a screenshot of the webcam
  const buttonTS = document.createElement("button");
  buttonTS.disabled = true;
  buttonTS.innerHTML = "Take Screenshot";
  buttonTS.onclick = () => {
    // take a screenshot
    if (stream && video) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        lastScreenshot = canvas.toDataURL("image/png");
        console.log(lastScreenshot);
      }
    }
  };
  toolbarElement.appendChild(buttonTS);

  // add a button "Download Screenshot" to the toolbar
  const buttonDS = document.createElement("button");
  buttonDS.disabled = true;
  buttonDS.innerHTML = "Download Screenshot";
  buttonDS.onclick = () => {
    if (lastScreenshot) {
      const link = document.createElement("a");
      link.download = "screenshot.png";
      link.href = lastScreenshot;
      link.click();
    }
  };
  toolbarElement.appendChild(buttonDS);

  const buttonCS = document.createElement("button");
  buttonCS.innerHTML = "Close webcam";
  buttonCS.disabled = true;
  buttonCS.onclick = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      if (video) {
        video.remove();
      }
      buttonWC.disabled = false;
      buttonTS.disabled = true;
      buttonDS.disabled = true;
    }
  };
  toolbarElement.appendChild(buttonCS);
}
