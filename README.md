wobbler
----------------

[![NPM](https://nodei.co/npm/wobbler.png)](https://nodei.co/npm/wobbler/) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard) 

A WOBBLE SYNTHESIZER EFFECT!

BASIC WOBBLE: a lowpass filter, with the frequency being controlled by an LFO.
NICE DUBSTEP: modulate the LFO speed/frequency on the beat!

### EXAMPLE

```
var makeWobbles = require('wobbler')
var context = new (window.AudioContext || window.webkitAudioContext)()
var wobbler = makeWobbles(context)
var osc = context.createOscillator()
osc.connect(wobbler.input())
wobbler.connect(context.destination)
osc.start()
wobbler.start()
```

A key step to getting a good wub wub going is to radically alter the LFO frequency in time with the rhythm. Lets say you have set an interval at 120bpm (or thereabouts i know setInerval is not reliable, get off me):

```
window.setInterval(function(){
  // probably update the frequency of the oscillator here somewhere I guess, unless this is some of that "drone" music that I have been hearing so much about

  var freq = [0.25, 0.5, 0.75, 1, 2, 3, 5][~~(Math.random() * 7)]
  wobbler.lfo.frequency.setValueAtTime(freq, context.currentTime)
  // the wubbles are really wobbing now! 


  // the wobbler has a short 1.5 second delay built in, and if we mess with the delay time it will cause weird sounds to happen! that's awesome like skrillex! lets doo that too!
  if(Math.random() < 0.33){
    var time = [0.25, 0.5, 0.75, 1, 1.25][~~(Math.random() * 5 )]
    wobbler.delay.delayTime.setValueAtTime(time, context.currentTime)
  }

}, 500)

```

### API

- `keys()` => Returns an array of string keys to audioNodes. `['lfo', 'lfoGain', 'filter', 'delay', 'volume', 'analyser']`
- `input()` => returns the input node for the synth, so you can do like `oscillator.connect(wobbler.input())`.
- `connect(destination)` => Connects the output of the filter to a destination or other node.
- `start()` => Calls start() on the LFO. 
- `stop()` => Calls stop() on the LFO. Shhhhhh. (maybe it should disconnect itself too? "cleanup()"? NOMEMORYLEAKS2016)
- `export()` => Returns JSON respresentation of the instrument. For easily saving settings between browser sessions.
- `import(data)` => Loads JSON data, or use default values if no data is passed.

