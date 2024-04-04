function locoScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locoScroll();


function startFunction(){
  var tl =gsap.timeline()
  
  tl.to("#start h4 span",{
    x:4,
    stagger:0.5,
    duration:1,
    // scrub:true,
    opacity:1,
    delay:1,
  })
  tl.to("#start",{
    duration:1,
    // scrub:3,
    opacity:0
  })
  tl.from("#page1-content h1 span",{
    y:100,
    duration:1,
    opacity:0,
    stagger:0.1,
    delay:1
  },"run")
  tl.from("nav h3,h4",{
    x:100,
    duration:1,
    // scrub:true
  },"run")
  tl.to("#start",{
    display:"none"
  })
}
startFunction()
function cursorEffect(page,cursor) {
  var page1Content = document.querySelector(page);
  var crsr = document.querySelector(cursor);

  page1Content.addEventListener("mousemove", function (dets) {
    //mousemove is a event
    // cursor.style.left=dets.x+"px"
    // cursor.style.top=dets.y+"px"
    gsap.to(crsr, {
      x: dets.x,
      y: dets.y,
    });
  });
  page1Content.addEventListener("mouseenter", function () {
    gsap.to(crsr, {
      scale: 1,
      opacity: 1,
    });
  });
  page1Content.addEventListener("mouseleave", function () {
    gsap.to(crsr, {
      scale: 0,
      opacity: 0,
    });
  });
}
cursorEffect("#page1-content","#cursor");
cursorEffect("#page4-circle","#cursor2");
function page2Animation() {
  var text = document.querySelector("#page2 .elem h1").textContent;
  var spl = text.split(" ");
  var clutter = "";
  spl.forEach(function (elem) {
    clutter += `<div><span>${elem}</span></div>` + " ";
  });
  document.querySelector("#page2 .elem h1").innerHTML = clutter;
  gsap.from("#page2-top h3,#page2-top h4,#page2 .elem div", {
    y: 100,
    duration: 1.5,
    opacity: 0,
    scrollTrigger: {
      trigger: "#page2",
      scroller: "#main",
      start: "top 60%",
      end: "top 60%",
      scrub: 3,
      onEnter: () => {
        gsap.from("#page2-top-border", {
          duration: 2.5,
          width: "0",
        });
      },
    },
  });
}
page2Animation();

function page3Animation() {
  gsap.from(
    "#page3-top h2",
    {
      y: 30,
      duration: 1,
      opacity: 0,
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#page3",
        scroller: "#main",
        start: "top 40%",
        end: "top 40%",
        scrub: 3,
      },
    },
    "same"
  );
  gsap.to(
    ".page3-border",
    {
      duration: 1,
      width: "100%",
      opacity: 1,
      scrollTrigger: {
        trigger: "#page3",
        scroller: "#main",
        start: "top 40%",
        end: "top 40%",
        scrub: 3,
      },
    },
    "same"
  );
  var images = document.querySelectorAll(".page3-image");
  images.forEach(function (elem) {
    elem.addEventListener("mouseenter", function (val) {
      val.currentTarget.childNodes[1].style.display = "none";
      val.currentTarget.childNodes[3].play();
    });
    elem.addEventListener("mouseleave", function (val) {
      val.currentTarget.childNodes[1].style.display = "block";
      val.currentTarget.childNodes[3].pause();
    });
  });
}
page3Animation();

function page4and5Animation(a,b,c,d,e,triggerd) {
  var text = document.querySelector(a).textContent;
  var spl = text.split(" ");
  var clutter = "";
  spl.forEach(function (elem) {
    clutter += `<div><span>${elem}</span></div>` + " ";
  });
  document.querySelector(a).innerHTML = clutter;
  gsap.from((b,c ,d), {
    y: 100,
    duration: 1.5,
    opacity: 0,
    scrollTrigger: {
      trigger: triggerd,
      scroller: "#main",
      start: "top 60%",
      end: "top 60%",
      scrub: 3,
      onEnter: () => {
        gsap.from(e, {
          duration: 2.5,
          width: "0",
        });
      },
    },
  });
}
page4and5Animation("#page4 .elem h1",".page4-top h3",".page4-top h4","#page4 .elem div",".page4-top-border","#page4");
page4and5Animation("#page5 .elem h1",".page5-top h3",".page5-top h4","#page5 .elem div",".page5-top-border","#page5");

function page6Animation(){
  gsap.from(".page6-border",{
    duration: 1,
      width: "0",
      opacity: 1,
      scrollTrigger: {
        trigger: "#page6",
        scroller: "#main",
        start: "top 40%",
        end: "top 40%",
        scrub: 3,
      },
  }) 

  gsap.from(".endElement-part3 h1 span",{
    y:-100,
    opacity:0,
    duration:1,
    stagger:.1,
    scrollTrigger:{
      trigger:".endElement-part3",
      scroller:"#main",
      start:"top 80%",
      end:"top 80%",
      scrub:3

    }
  })
}
page6Animation()

  // Get the reference to the circle element
  // var circle = document.getElementById('myCircle');
  
  // // Set the initial angle
  // var angle = 0;

  // // Define the center of rotation
  // var centerX = 50;
  // var centerY = 1;

  // // Define the radius of rotation
  // var radius = 1;

  // // Define the animation speed
  // var speed = 1; // Adjust this value to change the speed of rotation

  // // Function to update the position of the circle
  // function updateCirclePosition() {
  //   console.log("radius")
  //   // Calculate the new position based on the angle
  //   var newX = centerX + radius * Math.cos(angle * Math.PI / 180);
  //   var newY = centerY + radius * Math.sin(angle * Math.PI / 180);

  //   // Update the circle's position
  //   circle.setAttribute('cx', newX);
  //   circle.setAttribute('cy', newY);

  //   // Increment the angle
  //   angle += speed;

  //   // If the circle has completed a full rotation, reset the angle
  //   if (angle >= 360) {
  //     angle -= 360;
  //   }

  //   // Request the next animation frame
  //   // requestAnimationFrame(updateCirclePosition);
  // }
  
  
  var circle = document.getElementById('myCircle');

  function updateCirclePosition() {
    var angle = 0;
    var centerX = 50;
    var centerY = 50;
    var radius = 49;
    var speed = .5;
    function animate() {
      var newX = centerX + radius * Math.cos(angle * Math.PI / 180);
      var newY = centerY + radius * Math.sin(angle * Math.PI / 180);
      circle.setAttribute('cx', newX);
      circle.setAttribute('cy', newY);
      angle += speed;
      if (angle >= 360) {
        angle -= 360;
      }
      requestAnimationFrame(animate);
      var numbers = document.querySelector(".svgText-part1 h2")
      var i;
      for(i=9;i>=0;i--){
        numbers.textContent=i
        numbers.innerHTML=`<span>${i}</span>`
        console.log(numbers.textContent)
      }
    }
    animate();
  }

  gsap.to(circle, {
    duration:1,
    scrollTrigger: {
      trigger: "#myCircle",
      scroller: "#main",
      markers: true,
      start: "top 60%",
      end: "top 60%",
      ease:"none",
      loop:true,
      onEnter: function() {
        updateCirclePosition();
      }
    }
  });

