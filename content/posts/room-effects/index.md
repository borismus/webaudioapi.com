Room Effects
============
posted: 2013-03-03
description: >
  Using ConvolverNode and impulse response samples to illustrate various
  kinds of room effects.

<button onclick="sample.playPause();" disabled>Please wait, loading...</button>
<input type="radio" name="ir" value="0" class="effect" checked>Telephone</input>
<input type="radio" name="ir" value="1" class="effect">Muffler</input>
<input type="radio" name="ir" value="2" class="effect">Spring feedback</input>
<input type="radio" name="ir" value="3" class="effect">Crazy echo</input>

<script src="/static/js/shared.js"></script>
<script src="room-effects-sample.js"></script>
<script>
var sample = new RoomEffectsSample(document.querySelectorAll('input.effect'));
</script>
