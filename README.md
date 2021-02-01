# onesg-web


## Build and Deployment

### Pre-requisite

Go to Travis CI website and Sign up with GitHub.

Go to Heroku.com and sign up for an account.

Install Travis CI CLI: https://github.com/travis-ci/travis.rb#installation

Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli

Make sure you can successfully login, using the CLIs, with:

For heroku

```
heroku login
```

For travis

```
travis login --pro
```
 ### Running the build

We use Heroku and Travis to run the build and deploy the app.


 The following are the corresponding branches and the app names and links. 


- **Branch:** develop
  - **App name:** onesg-frontend-staging
  - **Link:** https://onesg-frontend-staging.herokuapp.com/
- **Branch:** master
  - **App name:** onesg-frontend
  - **Link:** https://onesg-frontend.herokuapp.com/

### Setting up Heroku App

Create apps with the aforementioned app names.


### Setting up Travis

Go to https://travis-ci.com/ and login with your Github account. Give Travis access to your repository.

If you already have Travis installed, you can also add Travis to the repository on from page https://github.com/settings/installations.

Create a `.travis.yml` file. Add the following block code to the file

![travis block](src/images/travis.png
)

Generate your `api_key` with this code below in your terminal:

```
travis encrypt \$(heroku auth:token) --add deploy.api_key --pro
```

Push your changes to the branch and see your app build on Heroku. 
![heroku](src/images/heroku_build.png)
