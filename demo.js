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

function dragChange (x, y, force) {
  drone.lowFilter.frequency.setValueAtTime(y * 1050 + 100, context.currentTime)
  wobbler.lfoGain.gain.setValueAtTime(500 * x, context.currentTime)
  // console.log(wobbler.lfoGain.gain.value, drone.lowFilter.frequency.value)
}

function tapEnd (x, y, force) {
  wobbler.lfo.frequency.setValueAtTime(x * 3, context.currentTime)
  drone.filter.frequency.setValueAtTime(y * 500 + 100, context.currentTime)
  // console.log(drone.filter.frequency.value, wobbler.lfo.frequency.value)
}



var notes = ['146.83', '174.61', '220.0', '261.63', '293.67', '349.23', '440.0']
var colors = ['red', 'lightgreen', 'crimson', 'orange', 'yellow', 'magenta', 'pink']
var backs = ['blue', 'lightblue', 'aqua', 'cyan', 'dodgerBlue', 'cornFlowerBlue', 'royalBlue']
var note // awful
window.setInterval(function () {
  note = notes[~~(Math.random() * notes.length)]
  drone.source.frequency.setValueAtTime(note, context.currentTime)

}, 2000)

window.setInterval(function () {

    var pairs = [
    mapRange(drone.lowFilter.frequency.value, 0, 2500, 0, 1),

    mapRange(wobbler.lfoGain.gain.value, 0, 2500, 0, 1),
    mapRange(drone.filter.frequency.value, 0, 2500, 0, 1),

    mapRange(wobbler.lfo.frequency.value, 0, 15, 0, 1),

    mapRange(drone.lowFilter.frequency.value, 0, 2500, 0, 1),
    mapRange(drone.filter.frequency.value, 0, 2500, 0, 1),

    mapRange(wobbler.lfo.frequency.value, 0, 15, 0, 1),
    mapRange(wobbler.lfoGain.gain.value, 0, 2500, 0, 1),



    mapRange(drone.lowFilter.frequency.value, 0, 2500, 0, 1),


    mapRange(drone.filter.frequency.value, 0, 2500, 0, 1),
    mapRange(wobbler.lfoGain.gain.value, 0, 2500, 0, 1),


    mapRange(wobbler.lfo.frequency.value, 0, 15, 0, 1),


    mapRange(wobbler.lfo.frequency.value, 0, 15, 0, 1),
    mapRange(drone.lowFilter.frequency.value, 0, 2500, 0, 1),

    mapRange(drone.filter.frequency.value, 0, 2500, 0, 1),
    mapRange(wobbler.lfoGain.gain.value, 0, 2500, 0, 1),


    mapRange(drone.filter.frequency.value, 0, 2500, 0, 1),
    mapRange(drone.lowFilter.frequency.value, 0, 2500, 0, 1),


    mapRange(drone.filter.frequency.value, 0, 2500, 0, 1),
    mapRange(wobbler.lfoGain.gain.value, 0, 2500, 0, 1),

    mapRange(wobbler.lfo.frequency.value, 0, 15, 0, 1),

    mapRange(drone.lowFilter.frequency.value, 0, 2500, 0, 1),
    mapRange(drone.filter.frequency.value, 0, 2500, 0, 1),

    mapRange(wobbler.lfo.frequency.value, 0, 15, 0, 1),
    mapRange(wobbler.lfoGain.gain.value, 0, 2500, 0, 1),

    mapRange(drone.lowFilter.frequency.value, 0, 2500, 0, 1),
    mapRange(drone.filter.frequency.value, 0, 2500, 0, 1),

    mapRange(wobbler.lfo.frequency.value, 0, 15, 0, 1),

    mapRange(wobbler.lfoGain.gain.value, 0, 2500, 0, 1),


    mapRange(drone.filter.frequency.value, 0, 2500, 0, 1),
    mapRange(wobbler.lfo.frequency.value, 0, 15, 0, 1),

    mapRange(wobbler.lfoGain.gain.value, 0, 2500, 0, 1),
    mapRange(drone.lowFilter.frequency.value, 0, 2500, 0, 1)
  ]

    var pieces = document.querySelectorAll(".piece")
    for(var i = 0; i < pieces.length; i++){
      pieces[i].style.top = (pairs[(i * 2) + 1] * window.innerHeight ) + 'px'
      pieces[i].style.left = (pairs[(i * 2)] * window.innerWidth ) + 'px'
      pieces[i].style.backgroundColor = colors[(notes.indexOf(note) + i) % colors.length]
    }
    // use the values of all the variable things to draw something?
  }, 500)

window.setInterval(function () {
  document.getElementById("bar").style.backgroundColor = backs[(notes.indexOf(note) + 20) % colors.length]

}, 1000)

if ('ontouchstart' in document.documentElement) {
  document.getElementById("foo").addEventListener('touchstart', function (e) {
    var touch = e.touches.item(0)
    if(touch){
      tapEnd(mapRange(touch.clientX, 0, window.innerWidth, 0, 1), mapRange(touch.clientY, 0, window.innerHeight, 0, 1), touch.force)
    }
  }, false)

  document.getElementById("foo").addEventListener('touchmove', function (e) {
    var touch = e.touches.item(0)
    if(touch){
      dragChange(mapRange(touch.clientX, 0, window.innerWidth, 0, 1), mapRange(touch.clientY, 0, window.innerHeight, 0, 1), touch.force)
    }
  }, false)

  document.getElementById("foo").addEventListener('touchend', function (e) {
    var touch = e.touches.item(0)
    if(touch){
      tapEnd(mapRange(touch.clientX, 0, window.innerWidth, 0, 1), mapRange(touch.clientY, 0, window.innerHeight, 0, 1), touch.force)
    }
  }, false)
} else {
  document.getElementById("foo").addEventListener('click', function (e) {

      var x = e.clientX
      var y = e.clientY
      // console.log(x, y)
      console.log(mapRange(x, 0, window.innerWidth, 0, 1), mapRange(y, 0, window.innerHeight, 0, 1))
      // tapStart(mapRange(x, 0, window.innerWidth, 0, 1), mapRange(y, 0, window.innerHeight, 0, 1))
      dragChange(mapRange(x, 0, window.innerWidth, 0, 1), mapRange(y, 0, window.innerHeight, 0, 1), Math.random())
      tapEnd(mapRange(x, 0, window.innerWidth, 0, 1), mapRange(y, 0, window.innerHeight, 0, 1), Math.random())
  }, false)

}
