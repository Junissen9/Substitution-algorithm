var fgimage = null;
var bgimage = null;
var can1 = null;
var can2 = null;

function loadForegroundImage(){
  can1 = document.getElementById("can1");
  var imgFile = document.getElementById("fgfile");
  fgimage = new SimpleImage(imgFile);
  fgimage.drawTo(can1);
}

function loadBackgroundImage(){
  can2 = document.getElementById("can2");
  var imgFile = document.getElementById("bgfile");
  bgimage = new SimpleImage(imgFile);
  bgimage.drawTo(can2);
}

function doGreenScreen(){
  if (fgimage==null || !fgimage.complete()) {
    alert("Foreground not loaded");
    return;
  }
  if (bgimage==null || !bgimage.complete()) {
    alert("Background not loaded");
    return;
  }
  clearCanvas();
  
  var output = new SimpleImage(fgimage.getWidth(), fgimage.getHeight());
  
  for (var pixel of fgimage.values()) {
    if (pixel.getGreen()> pixel.getRed() + pixel.getBlue()) {
      var x = pixel.getX();
      var y = pixel.getY();
      var bgpixel = bgimage.getPixel(x, y);
      output.setPixel(x, y, bgpixel);
    }
    else {
      output.setPixel(pixel.getX(), pixel.getY(), pixel);
    }
  }
  output.drawTo(can1);
}

function clearCanvas(){
  can1 = document.getElementById("can1");
  can2 = document.getElementById("can2");
  
  var context1 = can1.getContext("2d");
  var context2 = can2.getContext("2d");
  context1.clearRect(0,0,can1.width,can1.height);
  context2.clearRect(0,0,can2.width,can2.height);
}