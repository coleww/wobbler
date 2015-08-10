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
  drone.lowFilter.frequency.value = y * 2000 + 100
}

function tapEnd (x, y, force) {
  wobbler.lfo.frequency.value = x * 5
  drone.filter.frequency.value = y * 1500 + 100
}

var notes = ['146.83', '174.61', '220.0', '261.63', '293.67', '349.23', '440.0', '587.33']

window.setInterval(function () {
  drone.source.frequency.value = notes[~~(Math.random() * notes.length)]
}, 1000)

if ('ontouchstart' in document.documentElement) {
  document.getElementById("foo").addEventListener('touchstart', function (e) {
    e.changedTouches.forEach(function (touch) {
      document.getElementById("foo").textContent = "start" + e.changedTouches[0].clientX + "|" + e.changedTouches[0].clientY + "|" + window.innerWidth + "," + window.innerHeight + "||||" + mapRange(touch.clientX, 0, window.innerWidth, 0, 1) + ">>>" + mapRange(touch.clientY, 0, window.innerHeight, 0, 1)

      tapStart(mapRange(touch.clientX, 0, window.innerWidth, 0, 1), mapRange(touch.clientY, 0, window.innerHeight, 0, 1), touch.force)
    })
  }, false)

  document.getElementById("foo").addEventListener('touchmove', function (e) {
    e.changedTouches.forEach(function (touch) {
      document.getElementById("foo").textContent = "move" + e.changedTouches[0].clientX + "|" + e.changedTouches[0].clientY + "|" + window.innerWidth + "," + window.innerHeight + "||||" + mapRange(touch.clientX, 0, window.innerWidth, 0, 1) + ">>>" + mapRange(touch.clientY, 0, window.innerHeight, 0, 1)

      dragChange(mapRange(touch.clientX, 0, window.innerWidth, 0, 1), mapRange(touch.clientY, 0, window.innerHeight, 0, 1), touch.force)
    })
  }, false)

  document.getElementById("foo").addEventListener('touchend', function (e) {
    e.changedTouches.forEach(function (touch) {
      document.getElementById("foo").textContent = "end" + e.changedTouches[0].clientX + "|" + e.changedTouches[0].clientY + "|" + window.innerWidth + "," + window.innerHeight + "||||" + mapRange(touch.clientX, 0, window.innerWidth, 0, 1) + ">>>" + mapRange(touch.clientY, 0, window.innerHeight, 0, 1)

      tapEnd(mapRange(touch.clientX, 0, window.innerWidth, 0, 1), mapRange(touch.clientY, 0, window.innerHeight, 0, 1), touch.force)
    })
  }, false)
} else {
  document.body.textContent = "FAIL"
}
