Oscillator
==========
posted: 2013-03-03
description: Generating basic tones at various frequencies using the OscillatorNode.

<!-- Change between different Oscillator types. Also have a dragger
     thing for frequency and detune, and visualize the result. -->

<canvas style="background: white;"></canvas>

<div>
Frequency: <input id="frequency" type="range" min="0" max="1000"
step="1" value="440"
oninput="sample.changeFrequency(this.value);">
Detune: <input id="detune" type="range" min="-100" max="100" step="5" value="0"
oninput="sample.changeDetune(this.value);">
</div>

<div>
<input type="radio" name="ir" value="0" class="effect" checked
onclick="sample.changeType('sine')">Sine</input>
<input type="radio" name="ir" value="1" class="effect"
onclick="sample.changeType('square')">Square</input>
<input type="radio" name="ir" value="2" class="effect"
onclick="sample.changeType('sawtooth')">Sawtooth</input>
<input type="radio" name="ir" value="3" class="effect"
onclick="sample.changeType('triangle')">Triangle</input>
</div>

<button onclick="sample.toggle()">Play/pause</button>

<script src="/static/js/shared.js"></script>
<script src="oscillator-sample.js"></script>
<script>
var sample = new OscillatorSample();
</script>
