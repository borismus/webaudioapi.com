/*
 * Copyright 2013 Boris Smus. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var CrossfadePlaylistSample = function() {
  this.FADE_TIME = 1; // Seconds
  this.isPlaying = false;
  loadSounds(this, {
    jam: 'jam.wav',
    crowd: 'crowd.wav'
  });
};

CrossfadePlaylistSample.prototype.play = function() {
  var ctx = this;
  playHelper([this.jam, this.crowd], 4, 1);

  function createSource(buffer) {
    var source = context.createBufferSource();
    var gainNode = context.createGain();
    source.buffer = buffer;
    // Connect source to gain.
    source.connect(gainNode);
    // Connect gain to destination.
    gainNode.connect(context.destination);

    return {
      source: source,
      gainNode: gainNode
    };
  }

  /**
   * Plays back a playlist of buffers, automatically crossfading between them.
   * Iterations specifies the number of times to play through the playlist.
   */
  function playHelper(buffers, iterations, fadeTime) {
    var currTime = context.currentTime;
    for (var i = 0; i < iterations; i++) {
      // For each buffer, schedule its playback in the future.
      for (var j = 0; j < buffers.length; j++) {
        var buffer = buffers[j];
        var duration = buffer.duration;
        var info = createSource(buffer);
        var source = info.source;
        var gainNode = info.gainNode;
        // Fade it in.
        gainNode.gain.linearRampToValueAtTime(0, currTime);
        gainNode.gain.linearRampToValueAtTime(1, currTime + fadeTime);
        // Then fade it out.
        gainNode.gain.linearRampToValueAtTime(1, currTime + duration-fadeTime);
        gainNode.gain.linearRampToValueAtTime(0, currTime + duration);

        // Play the track now.
        source[source.start ? 'start' : 'noteOn'](currTime);

        // Increment time for the next iteration.
        currTime += duration - fadeTime;
      }
    }
  }

};
