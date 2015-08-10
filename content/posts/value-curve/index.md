Tremolo with timing curves and oscillators
==========================================
posted: 2013-03-03
description: >
  Sets a sinusoidal value timing curve for a tremolo effect. Also does the
  same thing with an oscillator-based LFO.

<p>
  <input type="button" onclick="sample.toggle();" value="Play/Pause">
  <input type="button" onclick="sample.setValueCurve();" value="playbackRate setValueCurveAtTime">
  <input type="button" onclick="sample.setLFO();" value="playbackRate oscillator automation">
</p>

<script src="/static/js/shared.js"></script>
<script src="value-curve-sample.js"></script>
<script>
var sample = new ValueCurveSample();
</script>
