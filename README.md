CSCI 430 Booked Project Initial Code Developed from React Todo Example Code

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Package Manager for required dependancies/permission

In the project directory, run: (Debian/Ubuntu Linux)

### `curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`

Configures the repository

### `sudo apt update && sudo apt install yarn`

Update package info and install package

### `sudo apt update && sudo apt install --no-install-recommends yarn`

You can avoid the node installation if using nvm with this command(not used in this project)


## Yarn Path Setup

If Yarn is not found in your PATH, follow these steps to add it and allow it to be run from anywhere.

Note: your profile may be in your .profile, .bash_profile, .bashrc, .zshrc, (etc)

Add this to your profile:

### `export PATH="$PATH:/opt/yarn-[version]/bin"` (the path may vary depending on where you extracted Yarn to)

In the terminal, log in and log out for the changes to take effect

To have access to Yarn’s executables globally, you will need to set up the PATH environment variable in your terminal. To do this, add: `export PATH="$PATH: 'yarn global bin' "` to your profile, or if you use Fish shell, simply run the command `set -U fish_user_paths (yarn global bin) $fish_user_paths`

Test if yarn is installed by running 

### `yarn --version`

## Starting a new yarn project in app directory

### `yarn init`

## Adding additional dependencies

### `yarn add [package] --dev` 
### `yarn add [package] --peer`
### `yarn add [package] --optional`

## Upgrading a dependency

### `yarn upgrade [package]`
### `yarn upgrade [package]@[version]`
### `yarn upgrade [package]@[tag]`

## Removing a dependency`

### `yarn remove [package]`

## Installing all the dependencies of project

### `yarn`

or

### `yarn install`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

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
