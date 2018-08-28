// todo: find a better fricking skrr
const sounds =  
  { 'q':'ayy', 'w':'damn', 'e':'loof', 'r':'raw', 't':'skrrr', 'y':'uhh', 'u':'woop'};

const context = new AudioContext();

export function woah(key) {
  var a = new Audio('./assets/' + sounds[key] + '.mp3');
  a.play();
}

export function wow(key) {
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

export function roof(track) {
  var curr = 0.0;
  for (var i = 0; i < track.length; i++) {
    var a = new Audio('./assets/' + sounds[track[i][1]] + '.mp3');
    top(a, track[i][0]);
  }
}

function top(a, t) {
  setTimeout(function(){a.play();}, t);
}

export function playback(track) {
  var start = context.currentTime;
  var source = null;
  for (var i = 0; i < track.length; i++) {
    var key = track[i][1];
    fetch('./assets/' + sounds[key] + '.mp3')
      .then(response => response.arrayBuffer())
      .then(buffer => context.decodeAudioData(buffer))
      .then(decoded => 
        {
          source = context.createBufferSource();
          source.buffer = decoded;
          source.connect(context.destination);
          source.start(context.currentTime + i);
        });
  }
}


