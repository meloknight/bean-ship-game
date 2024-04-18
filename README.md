Bean Ship. Name origin: ship shaped kind of like a bean and bean dip is good :)

This mini-game is built with React.js and TypeScript.

I have always loved flying around in asteroids and thought it would be fun to try building a small asteroids-like game in React to learn more about how React works.

Currently, the gameplay instructions are on the right side of the screen.

I will likely continue working on this game over time to add a proper gameplay loop, but for now (as of April 18, 2024) I wanted to keep the scope small so I could learn some cool stuff and then move along!

This little project took about 3 days of work and some of the biggest lessons learned were:
-how to work with requestAnimationFrame to create a game loop (this game loop caused a number of issues with React re-renders)
-how to work with a variety of hooks in React. I had to try a number of methods before I could appropriately update the ship how I wanted to.
-that if I were to redo this project, I would likely aim to have the React components and most logic as seperate as I can have them so that component state and game logic don't get too tangled.
-I think React is certainly much better at event based games (basically no game loop required) like a card game or tile based adventure game. This is mainly because React's ability to track state would be very helpful in those games and a re-render upon state update would be great.
