Spatialized audio in 2D
=======================
posted: 2013-03-03
description: >
  Pick direction and position of the sound source relative to the listener.

Moving the mouse positions the sound source. Mousewheel or keyboard
arrows change the direction of the source.

<style>canvas { background: white; }</style>
<div id="panner"></div>

<script src="/static/js/shared.js"></script>
<script src="spatialized-sample.js"></script>
<script>sample = new SpatializedSample(document.querySelector('#panner'));</script>
