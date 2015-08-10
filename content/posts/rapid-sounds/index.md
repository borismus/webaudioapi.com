Rapidly played sounds
=====================
posted: 2013-03-03
description: >
  Many sound effects playing nearly simultaneously. Illustrates pitch and
  temporal randomness.

<button onclick="sample.shootRound(0, 3, 0.1);">Short burst M4A1</button>
<button onclick="sample.shootRound(1, 3, 0.1);">Short burst M1 Garand</button><br/>
<button onclick="sample.shootRound(0, 10, 0.05);">Long burst M4A1</button><br/>
<button onclick="sample.shootRound(0, 10, 0.08, 0.03);">Time-randomized M4A1</button>
<button onclick="sample.shootRound(1, 10, 0.08, 0, 1);">Pitch-randomized Garand</button>
<button onclick="sample.shootRound(1, 100, 0.002);">Compression performance issue</button>

<p>
<input type="checkbox" id="c1" checked="false" onchange="sample.toggleCompressor(this);">
<label for="c1"><span></span>Enable compressor</label>
</p>

<script src="/static/js/shared.js"></script>
<script src="rapid-sounds-sample.js"></script>
<script>sample = new RapidSoundsSample(context);</script>
