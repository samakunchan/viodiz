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

# CommintLint

## Dépendence

    npm install -g @commitlint/cli
    npm install --save-dev @commitlint/config-conventional @commitlint/cli
    echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

# commitlint.config.js

    module.exports = {
    rules: {
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 72],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test']],
    },
    };

## Convention

- build
- ci
- chore
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test

Exemple: docs: update Readme

## Autres règles d'écriture

- Header: Nombre de lettre compris entre 0 et 72.
  lowCase
- Ne surtout pas terminé par un point
- Sauter une ligne pour écrire le reste du commit
- Le commit ne doit jamais être vide
- Ajouter un espace juste après le ':' de la variable de convention
- le reste voir lien ci joint: [https://commitlint.js.org/#/reference-rules](https://commitlint.js.org/#/reference-rules)
