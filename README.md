# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: interactive-comment-section-kurni.vercel.app
- Live Site URL:  interactive-comment-section-kurni.vercel.app

## My process

### Built with
- [React](https://reactjs.org/) - JS library
- TypeScript
- TailwindCSS

### What I learned
From this project, i learned a lot about how does TypeScripts work and it's making me to be getting used to it. But the most important lesson that i learnt is how does a reference type variable works such and built a recursive function to manipulate the origin object.  

```js
export function deleteComment(comments: Comment[], id: number) {
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    if (comment.id === id) {
      comments.splice(i, 1);
      return true;
    }
    if (comment.replies && comment.replies.length > 0) {
      if (deleteComment(comment.replies, id)) {
        return true;
      }
    }
  }
  return false;
}
```

### Continued development
In the future, i would like to improve this project by making a backend for this project using MongoDB, ExpressJS, and NodeJS so it can store the comment that has been published. 

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author
- Frontend Mentor - [@kurniakun17](https://www.frontendmentor.io/profile/kurniakun17)
- Twitter - [@kurniaakharisma](https://www.twitter.com/kurniaakharisma)
