var wobbler = require('../')

document.getElementById('input').addEventListener('keyup', function (e) {
  document.getElementById('output').textContent = wobbler(document.getElementById('input').value)
})
