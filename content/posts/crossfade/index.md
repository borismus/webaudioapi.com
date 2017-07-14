Crossfade
=========
posted: 2013-03-03
description: Equal-power crossfading to mix between two tracks.

<input type="button" onclick="sample.toggle();" value="Play/Pause">
Drums <input type="range" min="0" max="100" value="100" oninput="sample.crossfade(this);"> Organ

<script src="/static/js/shared.js"></script>
<script src="crossfade-sample.js"></script>
<script>
var sample = new CrossfadeSample();
</script>
