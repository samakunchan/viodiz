#NRGX

##Installation

    1. npm i @ngrx/store @ngrx/effects @ngrx/store-devtools @ngrx/schematics --save
    2. ng config cli.defaultCollection @ngrx/schematics
    NB: A mon avis, cela permet de run des nouvelles lignes de commande

    3. ng generate store AppState --root --module app.module.ts

##Actions

    ng generate action store/actions/auth

##Effect

    ng generate effect store/effects/auth
    ou
    ng generate effect store/effects/auth - root -m app.module.ts

##Entity

    ng add @ngrx/entity

##Route

    ng add @ngrx/router-store

    A FAIRE: 1er test a faire est de connecter firebase juste pour avoir les permissions et les roles, et tester si tout fonctionne bien/
    Ensuite on pourra connecter l'user simple
