document.getElementById('test').keyup(function(event) {
    if (event.keyCode === 13) {
        document.getElementById('test').click();
    }
});

document.getElementById('test').onclick = function() {
  var audio = new Audio('bonnieclyde.mp3'); 
  audio.play();
};
