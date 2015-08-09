module.exports = function (context, data) {
  var nodes = {}

  nodes.lfo = context.createOscillator()
  nodes.lfoGain = context.createGain()
  nodes.filter = context.createBiquadFilter()
  nodes.delay = context.createDelay(1.5)
  nodes.volume = context.createGain()
  nodes.analyser = context.createAnalyser()

  nodes.lfo.connect(nodes.lfoGain)
  nodes.lfoGain.connect(nodes.filter.frequency)
  nodes.filter.connect(nodes.delay)
  nodes.filter.connect(nodes.volume)
  node.delay.connect(nodes.volume)
  nodes.volume.connect(nodes.analyser)

  nodes.import = function(data){
    data = data || {}
    data.lfo = data.lfo || {}
    data.gain = data.gain || {}
    data.filter = data.filter || {}
    data.delay = data.delay || {}
    data.volume = data.volume || {}

    this.lfo.type = data.lfo.type || 'sine'
    this.lfo.frequency.value = data.lfo.frequency || 0.5
    this.lfo.detune.value = data.lfo.detune || 0

    this.lfoGain.gain.value = data.lfoGain.gain || 750

    this.filter.Q.value = data.filter.Q || 15
    this.filter.frequency.value = data.filter.frequency || 500
    this.filter.type = data.filter.type || 'lowpass'
    this.filter.detune = data.filter.detune || 0

    this.delay.delayTime.value = data.delay.delayTime || 0.25

    this.volume.gain.value = data.volume.gain || 0.5
  }

  nodes.export = function(){
    return {
      lfo: {
        type: this.lfo.type,
        frequency: this.lfo.frequency.value,
        detune: this.lfo.detune.value
      },
      filter: {
        Q: this.filter.q.value,
        frequency: this.filter.frequency.value,
        type: this.filter.type,
        detune: this.filter.detune.value
      },
      lfoGain: {
        gain: this.lfoGain.gain.vakue
      },
      delay: {
        delayTime: this.delay.delayTime.value
      },
      volume: {
        gain: this.volume.gain.value
      }
    }
  }

  nodes.connect = function(destination){
    this.analyser.connect(destination)
  }

  nodes.input = function(){
    return this.filter
  }

  nodes.start = function(){
    this.lfo.start()
  }

  nodes.stop = function(){
    this.lfo.stop()
  }

  nodes.keys = function(){
    return Object.keys(this).filter(function(k){
      return ['import', 'export', 'connect', 'start', 'stop', 'keys'].indexOf(k) === -1
    })
  }

  nodes.import(data)

  return nodes
}