## Project

    ng new nomDeLApp --style=scss --skip-tests=true

## Generate

    ng g c nom-du-component --module app
    "--module app" c'est au cas ou il y bug

## RXJS

    npm i rxjs-compat --save

## Firebase

    npm install firebase --save
    import * as firebase from 'firebase';

    npm install firebase @angular/fire --save

## Firebase tool

C'est le firebase CLI

    npm install -g firebase-tools

    firebase login (ouvre une page pour se logger a google)

    firebase init  pour configurer
    
    firebase deploy --only functions pour deploy les fonctions
    NB: En supprimant une fonction dans l'index, il supprime aussi dans la cloud.

## Material design

L'une de ces lignes est bien

    npm install materialize-css@next  Pour mon site

    npm install --save angular/material2-builds angular/cdk-builds angular/animations-builds

    npm install @material/menu

    npm install --save hammerjs

    npm install materialize-css@next

    ng add @angular/material

    npm install material-design-lite --save

## Pretty-quick

    npm install --save-dev prettier pretty-quick
    "pretty-quick": "pretty-quick"
    npm run pretty-quick
    NB: Le projet doit etre connecter à git ou github

Creer un fichier `.prettierrc`

    {
      "jsxBracketSameLine": true,
      "trailingComma": "all",
      "tabWidth": 2,
      "semi": true,
      "singleQuote": true,
      "printWidth": 150
    }

## LoadChildren

Générer un module avec son routing

    ng generate module orders --routing
    Attention : Ne pas importer les modules créés dans app.module. Supprimer les.

Générer des sous components et déclarer les sous-components dans le module créé:

    @NgModule({
      declarations: [Ici],
      imports: [...],
    })

Dans app.module, ajouter les childs:

      { path: 'choisir le chemin', loadChildren: () => import('./chemin/vers/le/module/nom.module').then(mod => mod.NomModule) },

Mettre le router-outlet dans le layout:

    <router-outlet></router-outlet>

Dans le sous routing, voici le pattern:

      {
        path: '',
        component: DashboardComponent,
        children: [{ path: 'book', component: BookManagerComponent }, { path: 'profil', component: ProfilManagerComponent }],
      }

#Auto return url paypal

Log into https://developer.paypal.com
Click Applications
Click Sandbox accounts
Expand the account in question
Click Sandbox site
Login to the test account
Copy and paste "https://www.sandbox.paypal.com/us/cgi-bin/webscr?cmd=_profile-website-payments" into your browser
Enable Auto Return and click Save
Enter the Auto Return URL and click Save

#Build Prod

    ng build
    NB: Attention il créé un fichier /vendor-es2015 extrement lourd

    ng build --prod --aot --vendor-chunk --common-chunk --delete-output-path --buildOptimizer
    NB: Réduit considérablement la taille du dossier. Doit être accompagné d'un bon système de cache.
    
    node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng build --prod --...
    NB: Dans le cas ou le buid est out of memory
    
#Regler le problème de Ciruclar dependecy

    "architect": {
    "build": {
    "builder": "@angular-devkit/build-angular:browser",
    "options": {
    "showCircularDependencies": false, <= Rajouter ceci au angular.json

## Technique GIT
    
    Supprimer un fichier du repository afin de l'ignorer
    git rm --cached src/environments/api-config.ts
