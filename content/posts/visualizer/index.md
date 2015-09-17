Visualizer
==========
posted: 2013-03-03
description: >
  Using the AnalyserNode and some Canvas 2D visualizations to show both
  time- and frequency- domain.

<button style="display: block" disabled="true">Please wait, loading...</button>
<canvas></canvas>

<script src="/static/js/shared.js"></script>
<script src="visualizer-sample.js"></script>
<script>
var sample = new VisualizerSample();
document.querySelector('button').addEventListener('click', function() {
  sample.togglePlayback()
});
</script>
