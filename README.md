# T-Mobile Coding Challenge

### Important! Read this First !

Do **not** submit a pull request to this repository.  You PR wil be rejected and your submission ignored.
To be safe **do not Fork** this repository, if you do you will be tempted to create a PR.

To _properly_ submit a coding challenge you must:

1. Create a blank (empty) repo in the public git service of your choice ( github, gitlab, bitbucket )
2. Clone this repo to your local workstation
3. Reset the remote origin to point to your newly created empty repo
4. Push the master branch up to your repo

5. make necessary changes
6. push changes to your origin
7. send address of your copy to t-mobile.

We will review your copy online before and during your interview.


# Stocks coding challenge

## How to run the application

There are two apps: `stocks` and `stocks-api`.

- `stocks` is the front-end. It uses Angular 7 and Material. You can run this using `yarn serve:stocks`
- `stocks-api` uses Hapi and has a very minimal implementation. You can start the API server with `yarn serve:stocks-api`

A proxy has been set up in `stocks` to proxy calls to `locahost:3333` which is the port that the Hapi server listens on.

> You need to register for a token here: https://iexcloud.io/cloud-login#/register/ Use this token in the `environment.ts` file for the `stocks` app.

> The charting library is the Google charts API: https://developers.google.com/chart/

## Problem statement

[Original problem statement](https://github.com/tmobile/developer-kata/blob/master/puzzles/web-api/stock-broker.md)

### Task 1

Please provide a short code review of the base `master` branch:

#### Task 1-A
1. What is done well?
- Use of FormBuilder, FormGroup, Validators from @angular/forms in stock component.
- Use of angular material library which provides set of reusable and accessible component.
- Use of ngrx for state management.
- Use of google chart which is open source library and developer can easily use common predefined functionality.

2. What would you change?
- Instead of any we can use appropriate data types.
- We can add access specifiers for functions and variables.
- We will use async pipe of ngrx to pass observable data from stock component to chart component or we have to unsubscribe subscription in chart component.
- We can use constants instead of hard coded data or we can use mock data wherever required.
- Unit test cases should run without fail and should cover all functions/statements.
- "Favorite time period" is required field, will show error message if not selected.
- We can disable "Go" button if form is invalid.

3. Are there any code smells or problematic implementations?
- Yes, Added API key but chart is not getting displayed because data in chart is empty so used async pipe of ngrx to pass observable data from stock component to chart component.
    Also added error message if "Favorite time period" is not selected.

> Make a PR to fix at least one of the issues that you identify
