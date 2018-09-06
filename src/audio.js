// todo: find a better fricking skrr
const sounds =  
  { 'q':'ayy', 'w':'damn', 'e':'loof', 'r':'raw', 't':'skrrr', 'y':'uhh', 'u':'woop'};

const context = new AudioContext();

// calling fetch and decoding mp3 here and raindrop, needa figure a way to cache but fetch is async
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

export function playback(layer) {
  var sources = []; 
    for (var i = 0; i < layer.length; i++) {
      var key = layer[i][1];
      var timeElapsed = layer[i][0];
      var source = raindrop(key, timeElapsed/1000);
      sources.push(source);
    }
  return sources;
}

function raindrop(key, startTime, bar) {
  var src = fetch('./assets/' + sounds[key] + '.mp3')
    .then(response => response.arrayBuffer())
    .then(buffer => context.decodeAudioData(buffer))
    .then(decoded => 
      {
        var source = context.createBufferSource();
        source.buffer = decoded;
        source.connect(context.destination);
        source.start(context.currentTime + startTime);
        return source;
      });
  return src;
  }

