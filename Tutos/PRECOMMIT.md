# Husky

## Dépendence

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
