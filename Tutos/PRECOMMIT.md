# Husky

## Dépendence

    npm install husky --save-dev
    NB: Faire attention a la version de GIT. Actuellement il faut la 2.13.3

## package.json

      "scripts": {
        "ng": "ng",
        "start": "ng serve",
        "build": "ng build",
        ...
        ...
      },
      "husky": {
        "hooks": {
          "pre-commit": "npm test",
          "pre-push": "npm test"
        }
      },
