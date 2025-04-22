$(document).ready(function () {
  // Select the fish elements and aquarium container
  const fishElements = $(".fish");
  const aquarium = $(".aquarium");
  const fishes = [];

  // Select the control buttons
  const controls = {
    up: $("#up"),
    down: $("#down"),
    left: $("#left"),
    right: $("#right"),
  };

  fishElements.each(function () {
    const fish = $(this);

    // Set random position for each fish
    const width = fish.width();
    const height = fish.height();
    const x = Math.random() * (aquarium.width() - width);
    const y = Math.random() * (aquarium.height() - height);

    // Set default position for the fish
    fish.css({
      left: x + "px",
      top: y + "px",
    });

    // Set random speed and direction for each fish
    const fishData = {
      element: fish,
      x: x,
      y: y,
      width: width,
      height: height,
      directionX: Math.random() > 0.5 ? 1 : -1,
      directionY: Math.random() > 0.5 ? 1 : -1,
      isControlled: fish.attr("id") === "controlledFish",
    };
    fishes.push(fishData);

    // Flip the fish if it is moving left
    if (fishData.directionX === -1) {
      fish.addClass("flipped");
    }

    // Create a bubble every second for every fish
    setInterval(() => {
      createBubble(fish);
    }, 1000);
  });

  controls.up.on("click", function () {
    changeDirection("up");
  });

  controls.down.on("click", function () {
    changeDirection("down");
  });

  controls.left.on("click", function () {
    changeDirection("left");
  });

  controls.right.on("click", function () {
    changeDirection("right");
  });

  // Change the direction of the controlled fish based on button clicks
  function changeDirection(direction) {
    const controlledFish = fishes.find((fish) => fish.isControlled);
    if (!controlledFish) return;

    switch (direction) {
      case "up":
        controlledFish.directionY = -1;
        break;
      case "down":
        controlledFish.directionY = 1;
        break;
      case "left":
        controlledFish.directionX = -1;
        controlledFish.element.addClass("flipped");
        break;
      case "right":
        controlledFish.directionX = 1;
        controlledFish.element.removeClass("flipped");
        break;
    }
  }

  // Create a bubble every second for every fish
  function createBubble(element) {
    const bubble = $("<div>").addClass("bubble");

    // Create bubbles with random sizes
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

  // Function to animate the fish swimming in the aquarium
  function swim() {
    fishes.forEach((fish) => {
      fish.x += fish.directionX;
      fish.y += fish.directionY;

      //Set direction vertically
      if (fish.x <= 0) {
        fish.directionX = 1;
        fish.element.removeClass("flipped");
      } else if (fish.x + fish.width >= aquarium.width()) {
        fish.directionX = -1;
        fish.element.addClass("flipped");
      }

      //Set direction horizontally
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

  // Check collisions between fish

  function checkCollision() {
    for (let i = 0; i < fishes.length; i++) {
      for (let j = i + 1; j < fishes.length; j++) {
        const fish1 = fishes[i];
        const fish2 = fishes[j];

        if (
          fish1.x < fish2.x + fish2.width &&
          fish1.x + fish1.width > fish2.x &&
          fish1.y < fish2.y + fish2.height &&
          fish1.y + fish1.height > fish2.y
        ) {
          fish1.directionX *= -1;
          fish1.directionY *= -1;
          fish2.directionX *= -1;
          fish2.directionY *= -1;

          if (fish1.directionX === -1) {
            fish1.element.addClass("flipped");
          } else {
            fish1.element.removeClass("flipped");
          }

          if (fish2.directionX === -1) {
            fish2.element.addClass("flipped");
          } else {
            fish2.element.removeClass("flipped");
          }
        }
      }
    }
    requestAnimationFrame(checkCollision);
  }

  checkCollision();
  swim();
});
