$(document).ready(function () {
  const fishElements = $(".fish");
  const aquarium = $(".aquarium");
  const controlledFish = $("#controlledFish");
  const fishes = [];

  fishElements.each(function () {
    const fish = $(this);
    //Get position and size
    const width = fish.width();
    const height = fish.height();
    const x = Math.random() * (aquarium.width() - width);
    const y = Math.random() * (aquarium.height() - height);

    fish.css({
      left: x + "px",
      top: y + "px",
    });

    const fishData = {
      element: fish,
      speedX: 1,
      speedY: 1,
      x: x,
      y: y,
      width: width,
      height: height,
      directionX: Math.random() > 0.5 ? 1 : -1,
      directionY: Math.random() > 0.5 ? 1 : -1,
    };

    if (fishData.directionX === -1) {
      fish.addClass("flip-horizontal");
    }

    fishes.push(fishData);

    setInterval(() => {
      createBubble(fish);
    }, 1000);
  });

  //   controlledFish.on("keydown", function (event) {
  //     const key = event.key;
  //     const fish = $(this);

  //     switch (key) {
  //       case "ArrowUp":
  //         fish.directionY = 1;
  //         // fish.css("top", fish.position().top - speed + "px");
  //         break;

  //     }
  //   });

  function createBubble(element) {
    const bubble = $("<div>").addClass("bubble");

    // CReate bubbles with random sizes
    const size = Math.floor(Math.random() * 10) + 8;
    bubble.css({
      width: size + "px",
      height: size + "px",
      right: "-20px",
      backgroundColor: "#fff",
      border: "1px solid #4aa3ff ",
      position: "absolute",
      bottom: "15px",
      borderRadius: "50%",
    });

    bubble.animate(
      {
        bottom: aquarium.height() + "px",
        opacity: 0.1,
      },
      5000,
      function () {
        bubble.remove();
      }
    );
    element.append(bubble);
  }

  function swim() {
    fishes.forEach((fish) => {
      fish.x += fish.speedX * fish.directionX;
      fish.y += fish.speedY * fish.directionY;

      if (fish.x <= 0) {
        fish.directionX = 1;
        fish.element.removeClass("flip-horizontal");
      } else if (fish.x + fish.width >= aquarium.width()) {
        fish.directionX = -1;
        fish.element.addClass("flip-horizontal");
      }
      if (fish.y <= 0) {
        fish.directionY = 1;
      } else if (fish.y + fish.height >= aquarium.height()) {
        fish.directionY = -1;
      }
      fish.element.css({
        left: fish.x + "px",
        top: fish.y + "px",
      });
    });
    requestAnimationFrame(swim);
  }
  function checkCollision() {
    //how to check if 2 or more objects collide with each other
  }
  swim();
});
