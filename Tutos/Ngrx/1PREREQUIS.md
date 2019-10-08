#Installation
##Menu

- Installation: [Installation](https://github.com/samakunchan/viodiz/tree/master/Tutos/Ngrx/1PREREQUIS.md)
- Configuration: [Configuration](https://github.com/samakunchan/viodiz/tree/master/Tutos/Ngrx/2CONFIGURATION.md)

##Commandes 1. npm i @ngrx/store @ngrx/effects @ngrx/store-devtools @ngrx/schematics --save 2. ng config cli.defaultCollection @ngrx/schematics
NB: A mon avis, cela permet de run des nouvelles lignes de commande

    3. ng generate store AppState --root --module app.module.ts

##Actions

    ng g a store/actions/auth
    ng generate action store/actions/auth

##Effects

    ng g ef store/effects/auth
    ng generate effect store/effects/auth
    ou
    ng generate effect store/effects/auth - root -m app.module.ts

##Reducers
ng g r store/effect/auth
ng generate reducer store/effect/auth

##Entity

    ng add @ngrx/entity

##Route

    ng add @ngrx/router-store
