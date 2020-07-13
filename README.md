# ADS Webapp

ADS Webapp contains configurator, auth, constructor of orders, generation of specs and processing of orders 

## Running project

1. Clone repository
2. Install dependencies
```sh
npm install
```
3. To run project locally for development
```sh
npm run dev
```
4. Ask permission for the .env/config.js file with environment variables sheet and Api Keys

## Deployment

We are using [Heroku](https://heroku.com/) for all the deployments.
1. Request access to our heroku app
2. You can deploy to the [Staging](https://ads-calc.herokuapp.com/) by pushing to heroku by:
```sh
git remote add heroku https://git.heroku.com/ads-calc.git
git push heroku master
```

## Commit strategy

We're working with [GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) strategy
So make sure you rebase your branch against `develop` and name it in a correct way according to the kind of work that you currently planning to work with

Once task is completed you should:
- make sure you don't leave any redundant commented-out code
- make a `git pull` from develop branch and merge conflicts in case any occur
- push your code and make a pull-request to `develop` branch
- put at least two reviewers from your team(if it is possible) to your PR

You should check your open pull-requests at least once a day and notify reviewers to check it if that's left uncomented or not merged.

## Code style

We use [eslint](https://eslint.org/), airbnb style-guide and custom set of rules.

Also we're using two spaces for indentation

### May the force be with you, ADS team!
