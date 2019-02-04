## Recap 1/30/2019

This demo was created by Justin Wilkerson an organizer at [The Long Island JavaScript Group Meetup](https://www.meetup.com/long-island-javascript-group/)

### React Hooks

Documentation: [React Hooks](https://reactjs.org/docs/hooks-intro.html#motivation)

Hooks are an upcoming feature that lets the developer use state and other React features without writing a class. They are functions that let you "hook" into React state and lifecycle features from function components. Hooks do not work inside classes. React provides some pre-built Hooks but you may also create custom ones as well.

Since Hooks are in alpha please pay attention to your package.json setup. For this example, we had to use `"next"` as the value for `"react"` and `"react-dom"` within `"dependencies"`. You can also set it equal to the latest alpha React version.

Here are some notes about Hooks:

- Changes React's programming paradigm from one centered around classes and OOP to one based on functional programming.
- Reuse stateful logic without changing your component hierarchy.
- 100% backwards compatible, so they don't contain any breaking changes.
- Works side-by-side with existing code so you can adopt them gradually.

Here is a stripped down version of our Form component with Hook functions.

```javascript
import React, { useState, useEffect } from "react";
import { validateEmail } from "./utils";

import "./App.css";

function Form() {
  // useState is a React built-in Hook
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // useEffect is React built-in Hook
  useEffect(() => {
    if (!email || validateEmail(email)) {
      setEmailError("");
    } else {
      setEmailError("Please enter a valid email.");
    }
  }, [email]);

  return (
    <div>
      <form>
        <h3>Please sign up</h3>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <div className="error">{emailError}</div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
```

#### useState

You'll notice we use array destructuring to give us different names for the state variables declared when we called `useState`.

##### Array Destructuring Example

```javascript
const [x, y] = [1, 2];
console.log(x); // 1
console.log(y); // 2

function primeColors() {
  return ["red", "blue", "green"];
}

const [r, b, g] = primeColors();
console.log(r); // 'red'
console.log(b); // 'blue'
console.log(g); // 'green'
```

`useState` is called within a function component to add local state to it. React maintains this state between renders. `useState` will return the current state value and a function that lets you update it.

In our code above:

```javascript
const [email, setEmail] = useState("");
```

`email` is the current state value and `setEmail` is the function used to change it. You can see this happen where we attach `setEmail` to `onChange` in our `input` tag.

The empty tags passed into `useState` are the initial state of the function. You can pass any data type you'd like, just like state in a class component. If you initialize the state with an object literal `{}` understand when you update it you must account for every property in the object.

This is different from your typical `this.setState()` method where you only have to pass in the property you changed. Leverage the rest operator, `...`, to help with this.

We could stop right there if we were only concerned with binding the `onChange` of the `input` to the our function's `email` state. But let's say we want to add conditions when the state changes, something where a lifecycle method would be handy.

#### useEffect

`useEffect` adds the ability to perform side effects from a funcion component. It serves the same purpose as certain lifecycle methods `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

By default, React runs the effects after every render, including the first render.

In our code above:

```javascript
useEffect(() => {
  if (!email || validateEmail(email)) {
    setEmailError("");
  } else {
    setEmailError("Please enter a valid email.");
  }
}, [email]);
```

You specify the pieces of state you'd like to touch within an array as the second argument to the `useEffect` method. If you need code to work on something between renders that doesn't affect state then either pass an empty array or don't pass a second argument at all.

##### Warning

Hooks have 2 rules:

- Never call them inside loops, conditions or nested functions.
- Only call them from React function components.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
