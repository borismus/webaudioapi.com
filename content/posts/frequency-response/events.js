function getElementCoordinates(element, event) {
    var c = getAbsolutePosition(element);
    c.x = event.x - c.x;
    c.y = event.y - c.y;
    
    var position = c;
    
    // This isn't the best, should abstract better.
    if (isNaN(c.y)) {
        var eventInfo = {event:event, element:element};
        position = getRelativeCoordinates(eventInfo);
    }    
    
    return position;
}

function getAbsolutePosition(element) {
  var r = { x: element.offsetLeft, y: element.offsetTop };
  if (element.offsetParent) {
    var tmp = getAbsolutePosition(element.offsetParent);
    r.x += tmp.x;
    r.y += tmp.y;
  }
  return r;
};


function getRelativeCoordinates(eventInfo, opt_reference) {
    var x, y;
    var event = eventInfo.event;
    var element = eventInfo.element;
    var reference = opt_reference || eventInfo.element;
    if (!window.opera && typeof event.offsetX != 'undefined') {
      // Use offset coordinates and find common offsetParent
      var pos = { x: event.offsetX, y: event.offsetY };
      // Send the coordinates upwards through the offsetParent chain.
      var e = element;
      while (e) {
        e.mouseX = pos.x;
        e.mouseY = pos.y;
        pos.x += e.offsetLeft;
        pos.y += e.offsetTop;
        e = e.offsetParent;
      }
      // Look for the coordinates starting from the reference element.
      var e = reference;
      var offset = { x: 0, y: 0 }
      while (e) {
        if (typeof e.mouseX != 'undefined') {
          x = e.mouseX - offset.x;
          y = e.mouseY - offset.y;
          break;
        }
        offset.x += e.offsetLeft;
        offset.y += e.offsetTop;
        e = e.offsetParent;
      }
      // Reset stored coordinates
      e = element;
      while (e) {
        e.mouseX = undefined;
        e.mouseY = undefined;
        e = e.offsetParent;
      }
    } else {
      // Use absolute coordinates
      var pos = getAbsolutePosition(reference);
      x = event.pageX - pos.x;
      y = event.pageY - pos.y;
    }
    // Subtract distance to middle
    return { x: x, y: y };
  };




  function addSlider(name) {
    var controls = document.getElementById("controls");

    var divName = name + "Slider";


    var sliderText = '<div> <input id="' + divName + '" '
     + 'type="range" min="0" max="1" step="0.01" value="0" style="height: 20px; width: 200px;"> <span id="'
     + name
     + '-value" style="position:relative; top:-5px;">'
     + name
     + '</span> </div> <br>  ';

    controls.innerHTML = controls.innerHTML + sliderText;
  }

  function configureSlider(name, value, min, max, handler) {
      // var controls = document.getElementById("controls");
      // 

      var divName = name + "Slider";

      var slider = document.getElementById(divName);

      slider.min = min;
      slider.max = max;
      slider.value = value;
      slider.onchange = function() { handler(0, this); };
  }
