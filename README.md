# NBA Statistics Database

## App URL

https://nba-front-end.onrender.com/

## Setting Up Environmet for Development

- Clone the repository into a local directory, open a terminal within an editor.

- Install required dependencies by entering

  `npm install`

- After the installation is complete, run the development server with the following command:

  `npm start`

  This allows you to view the app in your browser: [http://localhost:3000](http://localhost:3000)

  While the development server is running, editing of code will be displayed in real time in the browser

## Run UI Cypress Tests

- To prepare the environment for testing, run the development server as explained previously.

- With the dev server running, open a new terminal and at the command line enter:

  `npm run cypress`

  Cypress will open in a new window, click on the auth.spec.js file to run the test.<br>
![image](https://user-images.githubusercontent.com/83617997/174523119-e2c3bf08-4663-4b51-9e29-3d5b40c7ade1.png)

A new browser window will be opened and the tests will run as scripted in the /cypress/integration folder

## Deploying Appplication to Render

- Login to render.com
- select the **"new +"** dropdown menu and choose **"Web Service"**
- Choose "Build and deploy from a Git repository"
- Enter your chosen application name
- Select the **"Deploy"** tab, choose **GitHub** deployment
- Find and select the appropriate reprository to connect to and press "connect"
- Enter a name
- Enter 'npm install' as the build command
- Enter 'npm start' as the start command
- Towards the bottom of the page, press 'advanced' to reveal more options
- Enter appropriate Enironmental variables
- Enter MONGO_URI (from .env) and the appropriate string to connect to mongodb
- Enter JWT_SECRET (from .env) and the appropriate string to set tocken password
- Enter JWT_LIFETIME (from .env) and the appropriate value to set token lifespan
- Once statisfied, press the 'Create Web Service' button to complete the process
- Copy the generated URL and use as required

## Formatting Code

To format the code using prettier, at the command line enter:

  `npm run format`


