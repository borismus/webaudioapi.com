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


var NOISE_FACTOR = 0.05;

function ScriptSample() {
  this.BUFFER_SIZE = 2048;

  this.isPlaying = false;
  this.isNoise = true;
  this.isChannelFlip = false;
  // Load a sound.
  loadSounds(this, {
    buffer: 'chrono.mp3'
  });
}

ScriptSample.prototype.play = function() {
  var source = context.createBufferSource();
  source.buffer = this.buffer;

  // Hook it up to a ScriptProcessorNode.
  var processor = context.createScriptProcessor(this.BUFFER_SIZE);
  processor.onaudioprocess = this.onProcess;

  source.connect(processor);
  processor.connect(context.destination);

  console.log('start');
  source[source.start ? 'start': 'noteOn'](0);
  this.source = source;
};

ScriptSample.prototype.stop = function() {
  console.log('stop');
  this.source[this.source.stop ? 'stop': 'noteOff'](0);
};

ScriptSample.prototype.onProcess = function(e) {
  var leftIn = e.inputBuffer.getChannelData(0);
  var rightIn = e.inputBuffer.getChannelData(1);
  var leftOut = e.outputBuffer.getChannelData(0);
  var rightOut = e.outputBuffer.getChannelData(1);

  for (var i = 0; i < leftIn.length; i++) {
    // Flip left and right channels.
    if (this.isChannelFlip) {
      leftOut[i] = rightIn[i];
      rightOut[i] = leftIn[i];
    } else {
      leftOut[i] = leftIn[i];
      rightOut[i] = rightIn[i];
    }

    // Add some noise
    if (true) {
      leftOut[i] += (Math.random() - 0.5) * NOISE_FACTOR;
      rightOut[i] += (Math.random() - 0.5) * NOISE_FACTOR;
    }

  }
};

ScriptSample.prototype.toggle = function() {
  (this.isPlaying ? this.stop() : this.play());
  this.isPlaying = !this.isPlaying;
};
