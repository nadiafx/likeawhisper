
window.onload = function() 
{
  var scene = new Canvas(document.body, 600, 400);
  var preventDefaultFn = function(e) { e.preventDefault(); };
  scene.when('keypressed', preventDefaultFn);
  scene.when('keydown', preventDefaultFn);
  scene.when('keyup', preventDefaultFn);

  var circle = new Circle(100, 
      {
        id: 'circle',
        x: scene.width / 3 * 2,  
        y: scene.height / 2, 
        stroke: 'red', 
        strokeWidth: 20,
        endAngle: Math.PI*2
      }
    );

  var circleCtrlListener = function(t, dt) {
    if ( this.root.keys.left )
      circle.x -= 10
    if ( this.root.keys.right )
      circle.x += 10
    if ( this.root.keys.up )
      circle.y -= 10
    if ( this.root.keys.down )
      circle.y += 10
  }
  scene.addFrameListener(circleCtrlListener);

  circle.addFrameListener(
      function(t, dt) 
      {
        this.scale = Math.cos(t / 1000);
      }
      );

  scene.append(circle);

  var hello = new ElementNode(E('h2', 'Hello, world!'), 
      {
        fontFamily: 'Arial, Sans-serif', 
        noScaling: true, 
        color: 'black',
        x: scene.width / 2, 
        y: scene.height / 2,
        align: 'center',
        valign: 'center'
      }
      );

  var image = new Image();
  image.src = 'mantest.png';
  var imageNode = new ImageNode(image);
  imageNode.sX = 0;
  imageNode.sY = 0;
  imageNode.sWidth = 160;
  imageNode.sHeight = 400;
  imageNode.dWidth = 120;
  imageNode.dHeight = 120;
  var imageAnim = new Timeline();
  imageAnim.repeat = true;
  for (var i = 0; i < 4; i++) {
    imageAnim.addKeyframe(i*500, { sX:160*i }, 'set');
  }
  imageNode.addTimeline(imageAnim);
  scene.append(imageNode);

  hello.every(1000, 
      function() 
      {
        this.color = 'magenta';
        this.after(200, 
          function() 
          {
          this.color = 'blue';
          }
          );
        },
        true
      );
  scene.append(hello);

};


