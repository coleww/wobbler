var mapRange = require('range-fit')
var makeWobbler = require('../')
var makeDrone = require('drone-e-o-synth')
var context = new (window.AudioContext || window.webkitAudioContext)()

var wobbler = makeWobbler(context)
var drone = makeDrone(context)

drone.connect(wobbler.input())
wobbler.connect(context.destination)
drone.start()
wobbler.start()

drone.filter.type = "lowpass"
drone.lowFilter.type = "lowpass"

drone.filter.Q.value = 15
drone.lowFilter.Q.value = 12

document.getElementById("foo").textContent ="1010101010"

function tapStart (x, y, force) {
  force = force !== undefined ? force : 0.5
  if(Math.random() < force){
    wobbler.delay.delayTime.value = 0.25 * force
  }
}

function dragChange (x, y, force) {
  drone.lowFilter.frequency.value = y * 1250 + 100
  wobbler.lfoGain.gain.value = 1500 * x
}

function tapEnd (x, y, force) {
  wobbler.lfo.frequency.value = x * 5
  drone.filter.frequency.value = y * 1000 + 100
}

function redraw (x, y, force) {
  var ping = document.getElementById('ping')
  ping.style.top = (x * window.innerHeight) + 'px'
  ping.style.left = (y * window.innerWidth) + 'px'

  force = force !== undefined ? force : 0.5
  ping.style.width = force * 250 + 'px'
  ping.style.height = force * 250 + 'px'

}

var notes = ['146.83', '174.61', '220.0', '261.63', '293.67', '349.23', '440.0']
var colors = ['red', 'lightgreen', 'blue', 'orange', 'yellow', 'magenta', 'pink']
var backs = ['green', 'lightblue', 'plum', 'maroon', 'beige', 'brown', 'black']
window.setInterval(function () {
  var note = notes[~~(Math.random() * notes.length)]
  drone.source.frequency.value = note


  var pairs = [mapRange(wobbler.delay.delayTime.value, 0, 0.25, 0, 1),
  mapRange(drone.lowFilter.frequency.value, 0, 1000, 0, 1),

  mapRange(wobbler.lfoGain.gain.value, 0, 1000, 0, 1),
  mapRange(drone.filter.frequency.value, 0, 1000, 0, 1),

  mapRange(wobbler.lfo.frequency.value, 0, 5, 0, 1),
  mapRange(wobbler.delay.delayTime.value, 0, 0.25, 0, 1),

  mapRange(drone.lowFilter.frequency.value, 0, 1000, 0, 1),
  mapRange(drone.filter.frequency.value, 0, 1000, 0, 1),

  mapRange(wobbler.lfo.frequency.value, 0, 5, 0, 1),
  mapRange(wobbler.lfoGain.gain.value, 0, 1000, 0, 1),



  mapRange(drone.lowFilter.frequency.value, 0, 1000, 0, 1),
  mapRange(wobbler.delay.delayTime.value, 0, 0.25, 0, 1),


  mapRange(drone.filter.frequency.value, 0, 1000, 0, 1),
  mapRange(wobbler.lfoGain.gain.value, 0, 1000, 0, 1),


  mapRange(wobbler.delay.delayTime.value, 0, 0.25, 0, 1),
  mapRange(wobbler.lfo.frequency.value, 0, 5, 0, 1),


  mapRange(wobbler.lfo.frequency.value, 0, 5, 0, 1),
  mapRange(drone.lowFilter.frequency.value, 0, 1000, 0, 1),

  mapRange(drone.filter.frequency.value, 0, 1000, 0, 1),
  mapRange(wobbler.lfoGain.gain.value, 0, 1000, 0, 1),


  mapRange(drone.filter.frequency.value, 0, 1000, 0, 1),
  mapRange(drone.lowFilter.frequency.value, 0, 1000, 0, 1),


  mapRange(drone.filter.frequency.value, 0, 1000, 0, 1),
  mapRange(wobbler.lfoGain.gain.value, 0, 1000, 0, 1),

  mapRange(wobbler.lfo.frequency.value, 0, 5, 0, 1),
  mapRange(wobbler.delay.delayTime.value, 0, 0.25, 0, 1),

  mapRange(drone.lowFilter.frequency.value, 0, 1000, 0, 1),
  mapRange(drone.filter.frequency.value, 0, 1000, 0, 1),

  mapRange(wobbler.lfo.frequency.value, 0, 5, 0, 1),
  mapRange(wobbler.lfoGain.gain.value, 0, 1000, 0, 1),

  mapRange(drone.lowFilter.frequency.value, 0, 1000, 0, 1),
  mapRange(drone.filter.frequency.value, 0, 1000, 0, 1),

  mapRange(wobbler.lfo.frequency.value, 0, 5, 0, 1),
  mapRange(wobbler.delay.delayTime.value, 0, 0.25, 0, 1),

  mapRange(wobbler.lfoGain.gain.value, 0, 1000, 0, 1),
  mapRange(wobbler.delay.delayTime.value, 0, 0.25, 0, 1),


  mapRange(drone.filter.frequency.value, 0, 1000, 0, 1),
  mapRange(wobbler.lfo.frequency.value, 0, 5, 0, 1),

  mapRange(wobbler.lfoGain.gain.value, 0, 1000, 0, 1),
  mapRange(drone.lowFilter.frequency.value, 0, 1000, 0, 1)
]

  var pieces = document.querySelectorAll(".piece")
  for(var i = 0; i < pieces.length - 1; i++){
    console.log(pairs[i * 2], notes.indexOf(note))
    pieces[i].style.top = (pairs[(i * 2) + 1] * window.innerHeight / 2.5) + 'px'
    pieces[i].style.left = (pairs[(i * 2)] * window.innerWidth / 25) + 'px'
    pieces[i].style.backgroundColor = colors[(notes.indexOf(note) + i) % colors.length]
  }
  document.getElementById("bar").style.backgroundColor = backs[(notes.indexOf(note) + pieces.length) % colors.length]
  // use the values of all the variable things to draw something?
}, 2000)

if ('ontouchstart' in document.documentElement) {
  document.getElementById("foo").addEventListener('touchstart', function (e) {
    var touch = e.touches.item(0)
    redraw(mapRange(touch.clientX, 0, window.innerWidth, 0, 1), mapRange(touch.clientY, 0, window.innerHeight, 0, 1), touch.force)
    tapStart(mapRange(touch.clientX, 0, window.innerWidth, 0, 1), mapRange(touch.clientY, 0, window.innerHeight, 0, 1), touch.force)
  }, false)

  document.getElementById("foo").addEventListener('touchmove', function (e) {
    var touch = e.touches.item(0)
    redraw(mapRange(touch.clientX, 0, window.innerWidth, 0, 1), mapRange(touch.clientY, 0, window.innerHeight, 0, 1), touch.force)
    dragChange(mapRange(touch.clientX, 0, window.innerWidth, 0, 1), mapRange(touch.clientY, 0, window.innerHeight, 0, 1), touch.force)
  }, false)

  document.getElementById("foo").addEventListener('touchend', function (e) {
    var touch = e.touches.item(0)
    redraw(mapRange(touch.clientX, 0, window.innerWidth, 0, 1), mapRange(touch.clientY, 0, window.innerHeight, 0, 1), touch.force)
    tapEnd(mapRange(touch.clientX, 0, window.innerWidth, 0, 1), mapRange(touch.clientY, 0, window.innerHeight, 0, 1), touch.force)
  }, false)
} else {
  document.getElementById("foo").textContent = "FAIL"
}
