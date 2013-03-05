Audio Tag
=========
posted: 2013-03-03
description: >
  Illustrates the use of MediaElementAudioSourceNode to wrap the audio
  tag.

A couple issues: `onload` is required <http://crbug.com/112368>. Also,
reassigning the `@src` attribute causes audio glitches
<http://crbug.com/162528>.

<input value="chrono.mp3" placeholder="URL to audio file...">
<button onclick="sample.play(document.querySelector('input').value)">Load URL</button>

<script src="/static/js/shared.js"></script>
<script src="audio-tag-sample.js"></script>
<script>
var input = document.querySelector('input');
var sample = new AudioTagSample();

sample.play(input.value);
</script>
