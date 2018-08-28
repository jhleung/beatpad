// todo: find a better fricking skrr
const sounds =  
  { 'q':'ayy', 'w':'damn', 'e':'loof', 'r':'raw', 't':'skrrr', 'y':'uhh', 'u':'woop'};


const context = new AudioContext();
var dest = context.createMediaStreamDestination();
var mediaRecorder = new MediaRecorder(dest.stream);

var chunks = [];

mediaRecorder.ondataavailable = function(e) {
  chunks.push(e.data);
};

mediaRecorder.onstop = function(e) {
  alert("fuck");
  var blob = new Blob(chunks);
  var fileReader = new FileReader();
  fileReader.onload = function(e) {
    alert("fuckkkk");
    context.decodeAudioData(new Uint8Array(fileReader.result))
    .then(buf => 
      {
        alert(buf);
        const source = context.createBufferSource();
        source.buffer = buf;
        source.connect(context.destination);
        source.start();
      });
  };
  fileReader.readAsArrayBuffer(blob);
  //var audioTag = document.createElement('audio');
  //document.querySelector("audio").src = URL.createObjectURL(blob);
};

export function wow(key) {
  var buffer = null;
  fetch('./assets/' + sounds[key] + '.mp3')
  // when we get the asynchronous response, convert to an ArrayBuffer
    .then(response => response.arrayBuffer())
    .then(buffer => context.decodeAudioData(buffer))
    .then(decoded => 
      {
        const source = context.createBufferSource();
        source.buffer = decoded;
        source.connect(context.destination);
        source.start();
      });
}

export function startRecord() {
  mediaRecorder.start();
}

export function stopRecord() {
  mediaRecorder.stop();
}

export function playback(key) {
  var buffer = null;
  fetch('./assets/' + sounds[key] + '.mp3')
  // when we get the asynchronous response, convert to an ArrayBuffer
    .then(response => response.arrayBuffer())
    .then(buffer => context.decodeAudioData(buffer))
    .then(decoded => 
      {
        const source = context.createBufferSource();
        source.buffer = decoded;
        source.connect(context.destination);
        source.start();
      });
}
