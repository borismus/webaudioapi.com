Frequency Response
==================
posted: 2013-03-03
description: 
  A sample showing the frequency response graphs of various kinds of
  BiquadFilterNodes.

<!-- Slider stuff -->
<script type="text/javascript" src="events.js"></script>
<style type="text/css"></style>
<style type="text/css">
  #slider { margin: 10px; }
</style>

<script src="/static/js/shared.js"></script>
<script type="text/javascript" src="frequency-response-sample.js"></script>


<div id="info">
</div>

<canvas id="canvasID" width="500" height="250" style="float: left;">
</canvas>

<br><br>

<!-- Sliders and other controls will be added here -->
<div style="display: inline-block; margin-left: 10px;" id="controls"> 
<select onchange="changeFilterType(this.value);">
    <option value="lowpass">LowPass</option>
    <option value="highpass">HighPass</option>
    <option value="bandpass">BandPass</option>
    <option value="lowshelf">LowShelf</option>
    <option value="highshelf">HighShelf</option>
    <option value="peaking">Peaking</option>
    <option value="notch">Notch</option>
    <option value="allpass">AllPass</option>
</select>
<div>
  <input id="frequencySlider" type="range" min="0" max="1" step="0.01" value="0" style="height: 20px; width: 200px;">
  <span id="frequency-value" style="position:relative; top:-5px;">frequency = 1277.46 Hz</span>
</div><br>
<div>
  <input id="QSlider" type="range" min="0" max="20" step="0.01" value="0" style="height: 20px; width: 200px;">
  <span id="Q-value" style="position:relative; top:-5px;">Q = 8.59 dB</span>
</div><br>
<div>
  <input id="gainSlider" type="range" min="0" max="5" step="0.01" value="0" style="height: 20px; width: 200px;">
  <span id="gain-value" style="position:relative; top:-5px;">gain = 3.12</span>
</div><br>
</div>

<div style="clear: both">Written by <a href="http://chromium.googlecode.com/svn/trunk/samples/audio/frequency-response.html">Chris Rogers</a> with modifications by <a href="http://webaudio-io2012.appspot.com/#34">Chris Wilson</a>.


