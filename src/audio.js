// todo: find a better fricking skrr
const sounds =  
  { 'q':'ayy', 'w':'damn', 'e':'loof', 'r':'raw', 't':'skrrr', 'y':'uhh', 'u':'woop'};

export function wow(key) {
  const context = new AudioContext();
  var buffer = null;
  fetch('./assets/' + sounds[key] + '.mp3')
  // when we get the asynchronous response, convert to an ArrayBuffer
    .then(response => response.arrayBuffer())
    .then(buffer => context.decodeAudioData(buffer))
    .then(decoded => 
      {
        buffer = decoded;
        const source = context.createBufferSource();
        // set the buffer to the appropriate index
        source.buffer = buffer;
        // connect the buffer node to the destination
        source.connect(context.destination);
        // start playing the sound
        source.start();
      });
}
