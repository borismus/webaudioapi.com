// Events
// init() once the page has finished loading.
window.onload = init;

var context;
var filter;
var frequency = 2000;
var resonance = 5;
var gain = 2;

var canvas;
var canvasContext;
var canvasWidth = 0;
var canvasHeight = 0;

var curveColor = "rgb(224,27,106)";
var playheadColor = "rgb(80, 100, 80)";
var gridColor = "rgb(100,100,100)";
var textColor = "rgb(81,127,207)";

var dbScale = 60;
var pixelsPerDb;
var width;
var height;

function dbToY(db) {
    var y = (0.5 * height) - pixelsPerDb * db;
    return y;
}

function drawCurve() {
    // draw center
    width = canvas.width;
    height = canvas.height;

    canvasContext.clearRect(0, 0, width, height);

    canvasContext.strokeStyle = curveColor;
    canvasContext.lineWidth = 3;
    canvasContext.beginPath();
    canvasContext.moveTo(0, 0);

    pixelsPerDb = (0.5 * height) / dbScale;
    
    var noctaves = 11;
    
    var frequencyHz = new Float32Array(width);
    var magResponse = new Float32Array(width);
    var phaseResponse = new Float32Array(width);
    var nyquist = 0.5 * context.sampleRate;
    // First get response.
    for (var i = 0; i < width; ++i) {
        var f = i / width;
        
        // Convert to log frequency scale (octaves).
        f = nyquist * Math.pow(2.0, noctaves * (f - 1.0));
        
        frequencyHz[i] = f;
    }

    filter.getFrequencyResponse(frequencyHz, magResponse, phaseResponse);

    
    for (var i = 0; i < width; ++i) {
        var f = magResponse[i];
        var response = magResponse[i];
        var dbResponse = 20.0 * Math.log(response) / Math.LN10;
        dbResponse *= 2; // simulate two chained Biquads (for 4-pole lowpass)
        
        var x = i;
        var y = dbToY(dbResponse);
        
        if ( i == 0 )
            canvasContext.moveTo(x,y);
        else
            canvasContext.lineTo(x, y);
    }
    canvasContext.stroke();
    canvasContext.beginPath();
    canvasContext.lineWidth = 1;
    canvasContext.strokeStyle = gridColor;
    
    // Draw frequency scale.
    for (var octave = 0; octave <= noctaves; octave++) {
        var x = octave * width / noctaves;
        
        canvasContext.strokeStyle = gridColor;
        canvasContext.moveTo(x, 30);
        canvasContext.lineTo(x, height);
        canvasContext.stroke();

        var f = nyquist * Math.pow(2.0, octave - noctaves);
        var value = f.toFixed(0);
        var unit = 'Hz';
        if (f > 1000) {
          unit = 'KHz';
          value = (f/1000).toFixed(1);
        }
        canvasContext.textAlign = "center";
        canvasContext.strokeStyle = textColor;
        canvasContext.strokeText(value + unit, x, 20);
    }

    // Draw 0dB line.
    canvasContext.beginPath();
    canvasContext.moveTo(0, 0.5 * height);
    canvasContext.lineTo(width, 0.5 * height);
    canvasContext.stroke();
    
    // Draw decibel scale.
    
    for (var db = -dbScale; db < dbScale - 10; db += 10) {
        var y = dbToY(db);
        canvasContext.strokeStyle = textColor;
        canvasContext.strokeText(db.toFixed(0) + "dB", width - 40, y);
        canvasContext.strokeStyle = gridColor;
        canvasContext.beginPath();
        canvasContext.moveTo(0, y);
        canvasContext.lineTo(width, y);
        canvasContext.stroke();
    }
}

function oldDrawCurve() {
    // draw center
    width = canvas.width;
    height = canvas.height;

    canvasContext.fillStyle = "rgb(0, 0, 0)";
    canvasContext.fillRect(0, 0, width, height);

    canvasContext.strokeStyle = curveColor;
    canvasContext.lineWidth = 3;

    canvasContext.beginPath();
    canvasContext.moveTo(0, 0);

    pixelsPerDb = (0.5 * height) / dbScale;
    
    var noctaves = 11;
    
    var frequencyHz = new Float32Array(width);
    var magResponse = new Float32Array(width);
    var phaseResponse = new Float32Array(width);
    var nyquist = 0.5 * context.sampleRate;
    // First get response.
    for (var i = 0; i < width; ++i) {
        var f = i / width;
        
        // Convert to log frequency scale (octaves).
        f = nyquist * Math.pow(2.0, noctaves * (f - 1.0));
        
        frequencyHz[i] = f;
    }

    filter.getFrequencyResponse(frequencyHz, magResponse, phaseResponse);

    
    for (var i = 0; i < width; ++i) {
        var f = magResponse[i];
        var response = magResponse[i];
        var dbResponse = 20.0 * Math.log(response) / Math.LN10;
dbResponse *= 2; // simulate two chained Biquads (for 4-pole lowpass)
        
        var x = i;
        var y = dbToY(dbResponse);
        
        canvasContext.lineTo(x, y);
    }
    canvasContext.stroke();
    
    canvasContext.beginPath();
    
    canvasContext.lineWidth = 1;
    
    canvasContext.strokeStyle = gridColor;
    
    
    
    // Draw frequency scale.
    for (var octave = 0; octave <= noctaves; octave++) {
        var x = octave * width / noctaves;
        
        canvasContext.strokeStyle = gridColor;
        canvasContext.moveTo(x, 30);
        canvasContext.lineTo(x, height);
        canvasContext.stroke();

        var f = nyquist * Math.pow(2.0, octave - noctaves);
        canvasContext.textAlign = "center";
        canvasContext.strokeStyle = curveColor;
        canvasContext.strokeText(f.toFixed(0) + "Hz", x, 20);
    }

    // Draw 0dB line.
    canvasContext.beginPath();
    canvasContext.moveTo(0, 0.5 * height);
    canvasContext.lineTo(width, 0.5 * height);
    canvasContext.stroke();
    
    // Draw decibel scale.
    
    for (var db = -dbScale; db < dbScale; db += 10) {
        var y = dbToY(db);
        canvasContext.strokeStyle = curveColor;
        canvasContext.strokeText(db.toFixed(0) + "dB", width - 40, y);
        canvasContext.strokeStyle = gridColor;
        canvasContext.beginPath();
        canvasContext.moveTo(0, y);
        canvasContext.lineTo(width, y);
        canvasContext.stroke();
    }
}

function frequencyHandler(event, ui) {
  var value = ui.value;
  var nyquist = context.sampleRate * 0.5;
  var noctaves = Math.log(nyquist / 10.0) / Math.LN2;
  var v2 = Math.pow(2.0, noctaves * (value - 1.0));
  var cutoff = v2*nyquist;
  
  var info = document.getElementById("frequency-value");
  info.innerHTML = "frequency = " + (Math.floor(cutoff*100)/100) + " Hz";

  filter.frequency.value = cutoff;
  drawCurve();
}

function resonanceHandler(event, ui) {
  var value = ui.value;

  var info = document.getElementById("Q-value");
  info.innerHTML = "Q = " + (Math.floor(value*100)/100) + " dB";
  
  filter.Q.value = value; // !! Q value not same as resonance...
  drawCurve();
}

function gainHandler(event, ui) {
  var value = ui.value;

  var info = document.getElementById("gain-value");
  info.innerHTML = "gain = " + (Math.floor(value*100)/100);
  
  filter.gain.value = value;
  drawCurve();
}


function initAudio() {
    context = new webkitAudioContext();
    filter = context.createBiquadFilter();
    filter.Q.value = 5;
    filter.frequency.value = 2000;
    filter.gain.value = 2;
    filter.connect(context.destination);
}

function init() {
    initAudio();
    
    canvas = document.getElementById('canvasID');
    canvasContext = canvas.getContext('2d');
    canvasWidth = parseFloat(window.getComputedStyle(canvas, null).width);
    canvasHeight = parseFloat(window.getComputedStyle(canvas, null).height);
        
    /*
    addSlider("frequency");
    addSlider("Q");
    addSlider("gain");
    */
    configureSlider("frequency", .68, 0, 1, frequencyHandler);
    configureSlider("Q", resonance, 0, 20, resonanceHandler);
    configureSlider("gain", gain, 0, 5, gainHandler);
    drawCurve();
}

function changeFilterType( value ) {
  filter.type = value;
  drawCurve();
}


