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


var VOICE_COUNT = 10;

function WhiteNoiseScript() {
  this.node = context.createScriptProcessor(1024, 1, 2);
  this.node.onaudioprocess = this.process;
}

WhiteNoiseScript.prototype.process = function(e) {
  var L = e.outputBuffer.getChannelData(0);
  var R = e.outputBuffer.getChannelData(1);
  for (var i = 0; i < L.length; i++) {
    L[i] = ((Math.random() * 2) - 1);
    R[i] = L[i];
  }
};

WhiteNoiseScript.prototype.connect = function(dest) {
  this.node.connect(dest);
};


function WhiteNoiseGenerated(callback) {
  // Generate a 5 second white noise buffer.
  var lengthInSamples = 5 * context.sampleRate;
  var buffer = context.createBuffer(1, lengthInSamples, context.sampleRate);
  var data = buffer.getChannelData(0);

  for (var i = 0; i < lengthInSamples; i++) {
    data[i] = ((Math.random() * 2) - 1);
  }

  // Create a source node from the buffer.
  this.node = context.createBufferSource();
  this.node.buffer = buffer;
  this.node.loop = true;
  this.node[this.node.start ? 'start' : 'noteOn'](0);
}

WhiteNoiseGenerated.prototype.connect = function(dest) {
  this.node.connect(dest);
}



function Envelope() {
  this.node = context.createGain()
  this.node.gain.value = 0;
}

Envelope.prototype.addEventToQueue = function() {
  this.node.gain.linearRampToValueAtTime(0, context.currentTime);
  this.node.gain.linearRampToValueAtTime(1, context.currentTime + 0.001);
  this.node.gain.linearRampToValueAtTime(0.3, context.currentTime + 0.101);
  this.node.gain.linearRampToValueAtTime(0, context.currentTime + 0.500);
};

Envelope.prototype.connect = function(dest) {
  this.node.connect(dest);
};


function ProceduralSample() {
  this.voices = [];
  this.voiceIndex = 0;

  this.noise = new WhiteNoiseGenerated();
  this.onLoaded();
}

ProceduralSample.prototype.shoot = function() {
  this.voiceIndex = (this.voiceIndex + 1) % VOICE_COUNT;
  this.voices[this.voiceIndex].addEventToQueue()
};

ProceduralSample.prototype.onLoaded = function() {
  var filter = context.createBiquadFilter();
  filter.type = 0;
  filter.Q.value = 1;
  filter.frequency.value = 800;

  // Initialize multiple voices.
  for (var i = 0; i < VOICE_COUNT; i++) {
    var voice = new Envelope();
    this.noise.connect(voice.node);
    voice.connect(filter);
    this.voices.push(voice);
  }

  var gainMaster = context.createGain();
  gainMaster.gain.value = 5;
  filter.connect(gainMaster);

  gainMaster.connect(context.destination);
};

