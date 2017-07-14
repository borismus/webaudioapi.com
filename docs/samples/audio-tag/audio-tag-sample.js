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

function AudioTagSample() {
  // Create a new <audio> tag.
  this.audio = new Audio();

  // Note: the audio graph must be connected after the page is loaded.
  // Otherwise, the Audio tag just plays normally and ignores the audio
  // context. More info: crbug.com/112368
  window.addEventListener('load', this.onload.bind(this), false);
}

AudioTagSample.prototype.onload = function() {
  // Create the audio nodes.
  this.source = context.createMediaElementSource(this.audio);
  this.filter = context.createBiquadFilter();
  this.filter.type = this.filter.LOWPASS;
  this.filter.frequency.value = 500;

  // Connect the audio graph.
  this.source.connect(this.filter);
  this.filter.connect(context.destination);
};

AudioTagSample.prototype.play = function(url) {
  this.audio.src = url;
  this.audio.play();
};
