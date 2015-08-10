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

function tapStart (x, y, force) {

  force = force !== undefined ? force : 0.5
  wobbler.delay.delayTime.value = 1.5 * force
}

function dragChange (x, y, force) {
  drone.filter.frequency.value = x * 7500 + 100
  drone.lowFilter.frequency.value = y * 10000 + 100
}

function tapEnd (x, y, force) {
  wobbler.lfo.frequency.value = x * 10
  wobbler.filter.frequency.value = y * 9000 + 100
}

var notes = ['146.83', '174.61', '220.0', '261.63', '293.67', '349.23', '440.0', '587.33']

window.setInterval(function () {
  drone.source.frequency.value = notes[~~(Math.random() * notes.length)]
}, 1000)

if ('ontouchstart' in document.documentElement) {
  document.getElementById("foo").addEventListener('touchstart', function (e) {
    document.getElementById("foo").textContent = "start" + e.changedTouches[0].clientX + "|" + e.changedTouches[0].clientY
    e.changedTouches.forEach(function (touch) {
      tapStart(mapRange(touch.clientX, 0, window.innerWidth, 0, 1), mapRange(touch.clientY, 0, window.innerHeight, 0, 1), touch.force)
    })
  }, false)

  document.getElementById("foo").addEventListener('touchmove', function (e) {
    document.getElementById("foo").textContent = "move" + e.changedTouches[0].clientX + "|" + e.changedTouches[0].clientY
    e.changedTouches.forEach(function (touch) {
      dragChange(mapRange(touch.clientX, 0, window.innerWidth, 0, 1), mapRange(touch.clientY, 0, window.innerHeight, 0, 1), touch.force)
    })
  }, false)

  document.getElementById("foo").addEventListener('touchend', function (e) {
    document.getElementById("foo").textContent = "end" + e.changedTouches[0].clientX + "|" + e.changedTouches[0].clientY
    e.changedTouches.forEach(function (touch) {
      tapEnd(mapRange(touch.clientX, 0, window.innerWidth, 0, 1), mapRange(touch.clientY, 0, window.innerHeight, 0, 1), touch.force)
    })
  }, false)
} else {
  document.body.textContent = "FAIL"
}
