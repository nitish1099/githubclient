
# Github Client

**I KNOW I GIT IT!** :smirk:

Bringing you a simple **React Native** application to search repositories and create issues.

![Image](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)

## Requirements

- A pair of hands, even one would do the job :open_hands:
- A working machine :computer:
- A development machine set up for React Native by following [these instructions](https://reactnative.dev/docs/environment-setup)
- [Github Personal Access Token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token)
`

## Installation

The easiest way to get started is to clone the repository and install the dependencies with npm

### Setting up the react native application
```bash
#Get the latest snapshot of the repository
git clone git@github.com:nitish1099/githubclient.git myMobileProject

#Change directory
cd myMobileProject

#Install dependencies
npm install
```

### Usage 


1. Setup the API endpoint in the React Native app
```bash
inside app/config.js set the GIT_TOKEN to the personal access token created from the above step
```
4. Install cocoapods for iOS (skip this step for Android)
```bash
npx pod install
```
5. Run the app in your favorite device/emulator to view the webpage
```bash
#android
npx react-native run-android

#iOS
npx react-native run-ios
```

## Screenshot
![Screenshot](./Screenshot.jpg)
