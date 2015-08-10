Drumkit Rhythm
==============
posted: 2013-03-03
description: >
  Illustrating the API's precise timing model by playing back a simple
  rhythm.

<button style="display: block">Play/pause</button>

<script src="/static/js/shared.js"></script>
<script src="rhythm-sample.js"></script>
<script>
var sample = new RhythmSample();
document.querySelector('button').addEventListener('click', function() {
  sample.play();
});
</script>
