# Demonstration of Monorepo using MonoRepo

This repository is demonstrating monorepo using TurboRepo with twice of apps, backend and frontend.


## Prerequisites

- Node.js v20 or higher
- npm v10.5.2 or higher
- Firebase CLI
- Firebase Emulator Suite


## Getting Started


### Install firebase tools if its not installed yet

```
npm i -g firebase-tools
```

### Clone the project

Git clone the project, then open the project directory

```
git clone git@github.com:dwisulfahnur/monorepo-demo.git
cd monorepo-demo
```

### Install the dependencies

```
npm install
```

### Configure the .env file

Configure the environment variables file by using the env.example provided

```
# backend
cp apps/backend-repo/env.example apps/backend-repo/.env

# frontend
cp apps/frontend-repo/env.example apps/frontend-repo/.env
```


### Run the project

On the root of project directory, run the firebase emulators.

```
firebase emulators:start
```

then create new terminal session, open the project directory and run the project

```
npm run dev
```

The app will running on the following urls:

Frontend: http://localhost:3000
Backend: http://localhost:8000
Firebase Emulator UI: http://localhost:4000
