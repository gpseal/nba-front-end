# NBA Statistics Database

## App URL

[id607001-sealgp1-re.herokuapp.com](https://id607001-sealgp1-re.herokuapp.com/)

## Setting up environmet for development

- Clone the repository into a local directory, open a terminal within an editor.

- Install required dependencies by entering

  `npm install`

- After the installation is complete, run the development server with the following command:

  `npm start`

  This allows you to view the app in your browser: [http://localhost:3000](http://localhost:3000)

  While the development server is running, editing of code will be displayed in real time in the browser

## To run UI Cypress tests

- To prepare the environment for testing, run the development server as explained previously.

- With the dev server running, open a new terminal and at the command line enter:

  `npm run cypress`

  Cypress will open in a new window, click on the auth.spec.js file to run the test.<br>
![image](https://user-images.githubusercontent.com/83617997/174523119-e2c3bf08-4663-4b51-9e29-3d5b40c7ade1.png)

A new browser window will be opened and the tests will run as scripted in the /cypress/integration folder

## Deploying Appplication to Heroku

- Login to heroku.com
- select the **"new"** dropdown menu and choose **"Create new app"**
- Enter your chosen application name
- Select the **"Deploy"** tab, choose **GitHub** deployment
- Find and select the appropriate reprository to connect to
- New options will appear, enable **automatic deploys** and choose the appropriate branch to deploy from
- Manually deploy the master or main branch
- Go to the **Settings** tab, find the **Buildpacks** section and click the **Add buildback** button
- Add the following buildpack - https://github.com/mars/create-react-app-buildpack, then click the **Add changes** button.
- Copy the generated URL and use as required

**Alternatively, if the current version of Heroku is not compatible with auto deploy**
- Download and install Heroku CLI - https://devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli
- Connect to your project: 

  `heroku git:remote -a [name of your Heroku project]`
- Deploy your current version: 

  `git push heroku main`
<br>

## Formatting Code

To format the code using prettier, at the command line enter:

  `npm run format`


