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


function ValueCurveSample() {
  loadSounds(this, {
    buffer: 'sound.wav'
  });
  this.isPlaying = false;

  this.frequency = 2;
  this.duration = 2;
  this.scale = 0.4;
};

ValueCurveSample.prototype.play = function() {
  this.gainNode = context.createGain();
  this.source = context.createBufferSource();
  this.source.buffer = this.buffer;

  // Connect source to a gain node
  this.source.connect(this.gainNode);
  // Connect gain node to destination
  this.gainNode.connect(context.destination);
  this.gainNode.gain.value = 0.3;
  // Start playback in a loop
  this.source.loop = true;
  this.source[this.source.start ? 'start': 'noteOn'](0);
};

ValueCurveSample.prototype.setValueCurve = function(element) {
  // Split the time into valueCount discrete steps.
  var valueCount = 4096;
  // Create a random value curve.
  var values = new Float32Array(valueCount);
  for (var i = 0; i < valueCount; i++) {
    var percent = (i / valueCount) * this.duration*this.frequency;
    values[i] = 1 + (Math.sin(percent * 2*Math.PI) * this.scale);
    // Set the last value to one, to restore playbackRate to normal at the end.
    if (i == valueCount - 1) {
      values[i] = 1;
    }
  }
  // Apply it to the gain node immediately, and make it last for 2 seconds.
  this.gainNode.gain.setValueCurveAtTime(values, context.currentTime, this.duration);
};

ValueCurveSample.prototype.setLFO = function() {
  // Create oscillator.
  var osc = context.createOscillator();
  osc.frequency.value = this.frequency;
  var gain = context.createGain();
  gain.gain.value = this.scale;
  osc.connect(gain);
  gain.connect(this.gainNode.gain);
  //osc.connect(this.source.playbackRate);

  // Start immediately, and stop in 2 seconds.
  osc[osc.start ? 'start': 'noteOn'](0);
  osc[osc.stop ? 'stop': 'noteOff'](context.currentTime + this.duration);
};

ValueCurveSample.prototype.stop = function() {
  this.source[this.source.stop ? 'stop': 'noteOff'](0);
};

ValueCurveSample.prototype.toggle = function() {
  this.isPlaying ? this.stop() : this.play();
  this.isPlaying = !this.isPlaying;
};
