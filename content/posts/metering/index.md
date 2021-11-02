Metering
========
posted: 2013-03-03
description: Lets you adjust gain and show when clipping happens.

<style>
  #meter {width: 36px; height: 36px; display: inline-block; border: 1px solid black;}
  .clip {background: #FF6600;}
  .noclip {background: #00FF66;}
</style>

<button>Play/pause</button>
<span id="sample-controls" style="display: none">
Master gain: <input type="range" min="0" step="0.1" max="10" oninput="sample.gainRangeChanged(this)">
Meter level: <span id="meter"></span>
</span>

<script src="/static/js/shared.js"></script>
<script src="metering-sample.js"></script>
<script>
sample = new MeteringSample(document.querySelector('#meter'));

document.querySelector('button').addEventListener('click', function() {
  sample.playPause();
  document.querySelector('#sample-controls').style.display = '';
});
</script>
