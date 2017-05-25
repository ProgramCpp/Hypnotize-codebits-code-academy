var w = screen.width;
var h = screen.height;

// Matter.js module aliases
var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Composite = Matter.Composite;
var Composites = Matter.Composites;
var MouseConstraint = Matter.MouseConstraint;

// create a Matter.js engine
var engine = Engine.create({
  render: {
    element: document.body,
    options: {
      width: w,
      height: h,
      wireframes: false,
      background: 'gray'
    }
  }
});

// add a mouse controlled constraint
var mouseConstraint = MouseConstraint.create(engine);
World.add(engine.world, mouseConstraint);

var addToWorld = [];

var ropeRenderStyle = {
  fillStyle: '#fff',
  strokeStyle: '#fff',
  lineWidth: 1
}

  var x = w / 2;
  var y = 0;

    var group = Body.nextGroup(true);

    var segments = 10;
    var string = Composites.stack(x, y , 1, segments, 20, 20, function(x, y) {
      return Bodies.rectangle(x, y , 4, 4, {
        collisionFilter: {
          group: group
        },
        render: ropeRenderStyle
      });
    });

    Composites.chain(string, 0.5, 0, -0.5, 0, {
      stiffness:1, // janani: lesser value for more elasticity
      length: 20,
      render: ropeRenderStyle
    });

    Matter.Body.setStatic(string.bodies[0], true)
    addToWorld.push(string);

    //Body.translate(string.bodies[string.bodies.length - 1], { x: -140, y: -100 });

    var sphere = Bodies.circle(string.bodies[string.bodies.length - 1].position.x, string.bodies[string.bodies.length - 1].position.y, /*radius */ 50, { density: 500, frictionAir: 0.005});

    addToWorld.push(sphere);



    sphere.collisionFilter.group = group;

    var connectA = Constraint.create({
      bodyA: sphere,
      bodyB: string.bodies[string.bodies.length - 1],
      pointB: {
        x: -2,
        y: 0
      },
      render: ropeRenderStyle,
      stiffness: 0.8
    });

    addToWorld.push(connectA);


// add all of the bodies to the world
World.add(engine.world, addToWorld);

// run the engine
runner = Engine.run(engine)

// force vectors
var swingRight = {x: 0.001,y: 0};
var swingLeft = {x: -0.001,y: 0};
/*
var changeRightDir = false;
function callSwingRight() {
    Matter.Body.applyForce(string.bodies[string.bodies.length - 1], {x: string.bodies[string.bodies.length - 1].position.x, y: string.bodies[string.bodies.length - 1].position.y}, swingRight);
    if(!changeRightDir) {
      setTimeout(callSwingRight, 500);
      changeRightDir = true;
   }
   else
   {
      setTimeout(callSwingLeft, 1000);
      changeRightDir = false;
    }
}*/

var changeLeftDir = false;
function callSwingLeft() {
   Matter.Body.applyForce(string.bodies[string.bodies.length - 1], {x: string.bodies[string.bodies.length - 1].position.x, y: string.bodies[string.bodies.length - 1].position.y}, swingLeft);
  /* if(!changeLeftDir) {
      setTimeout(callSwingLeft, 500);
      changeLeftDir = true;
   }
   else
   {*/
      setTimeout(callSwingLeft, 2500);
   //   changeLeftDir = false;
   // }
}

callSwingLeft();