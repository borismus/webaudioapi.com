Volume Control
==============
posted: 2013-03-03
description: >
  A very simple example that lets you change the volume using a `GainNode`.

<button style="display: block" disabled="true" onclick="sample.toggle();">Please wait, loading...</button>

<input type="range" min="0" max="100" value="100" onchange="sample.changeVolume(this);"> Volume

<script src="/static/js/shared.js"></script>
<script src="volume-sample.js"></script>
<script>
var sample = new VolumeSample();
</script>
