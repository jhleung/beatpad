An in browser beatpad(?) if you want to make beats and don't wanna/care enough to learn how to use an audio editing software. 
mostly comprised of trap sounds because that's all my brain can handle at the moment so if you're a doom metal enthusiast - this is not for you. actually i'm not sure why this even exists if it doesn't have user-defined mappings.


my notes 
sounds: mainly trap sounds for w/e reason so if ur a doom metal enthusiast this is not for you
	- hats, 808s, kicks, claps, snaps, snare, rim, guns, ???
	- those minor key chords, guitar(?), choir, idk man
	- adlibs, pref from migos actually migos is the only trap music i listen to
		- learn how to chop/isolate vocals
		- google soundpacks
		- youtube acapellas
		- record my own LOL
		- the last 3 rows lined up perfectly and thats amazing
stuff to do
	button/keypress
		- navigate to path
			- server filesys
			- s3 bucket LOL
		- open file
			- fetch api
		play sound
			- web audio api: setup audio context, decode audio into a buffer, play??
				- https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API#Web_audio_concepts_and_usage
				- https://web-audio-api.firebaseapp.com/audio-buffer-source-node
				- https://www.html5rocks.com/en/tutorials/webaudio/intro/#toc-load
		- some visual effect to show button got pressed
	keyhold
		- open and play sound until lifted
	metronome/time
		- bpm settings
		- bars
		- time sig
		- metronome sound...something easy on the ears srsly wtf are thsoe metronomes out there with the most jarring clicks
	layers
		- record
			- record in browser audio. no scheduling of sounds involved since we're using a metronome so its on you if you mess up the rythm
		- playback
			- loop the same number of times the user pressed the button
				- involves opening file over and over, unless all soundsdecoded into buffer before hand
				- looks like i can just use the api for this
		- deleting layers
		- mute layers
	record mic from computer
	save file


