# Project README

This project consists of a backend and a frontend.

In this project, it was decided to use Angular 17 as an option using the template provided, applying Angular Material for the design.

In the backend, it was requested to use Firebase, a project was created in Firebase to save the information, the backend was made with the Nest framework to maintain the syntax with TypeScript, it was deployed as a cloud function.

## Backend

The backend code is located in the `atom-be-nest-challenge` folder. It is built using Nest.js and Node.js. To get the versions of the packages used in the backend, please refer to the `package.json` file inside the `functions` folder.

To run the backend, follow these steps:
1. Install the required dependencies by running `npm install` in the `atom-be-nest-challenge` folder.
2. Configure the Firebase project details in the backend code.
3. Deploy the backend as a Cloud Function in Firebase.

Additionally, the following scripts are available for the backend:
- `start:dev`: Starts the backend in development mode with watch mode enabled.
- `start:debug`: Starts the backend in debug mode with watch mode enabled.
- `start:prod`: Starts the backend in production mode.
- `lint`: Runs ESLint to fix TypeScript linting issues.
- `test`: Runs Jest for testing.

To serve the backend, run `npm run serve`.
To deploy the backend, run `npm run deploy`.

Remember to configure any additional settings and dependencies as needed.

## Frontend

The frontend code is located in the `atom-fe-challenge-template-ng-17` folder. It is built using Angular 17. To get the information from the `package.json` file of the frontend, please refer to that file directly.

To run the frontend, follow these steps:
1. Install the required dependencies by running `npm install` in the `atom-fe-challenge-template-ng-17` folder.
2. Start the development server by running `ng serve` in the same folder.

Please note that you may need to configure additional settings and dependencies based on your specific environment and project requirements.