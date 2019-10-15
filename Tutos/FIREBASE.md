# Firebase

## Installation

    npm install firebase --save
    import * as firebase from 'firebase';

    npm install firebase @angular/fire --save

## Firebase tool

    npm install -g firebase-tools
    npm install firebase-admin --save

    firebase login (ouvre une page pour se logger a google)

    firebase init  pour configurer

Ecrire les cloud function comme ceci:

    import * as functions from 'firebase-functions';
    import * as admin from 'firebase-admin';

    admin.initializeApp();

    exports.addAdminRole = functions.https.onCall((data, context) => {
      return admin
        .auth()
        .getUserByEmail(data.email)
        .then(user => {
          return admin.auth().setCustomUserClaims(user.uid, {
            admin: true,
          });
        })
        .then(() => {
          return {
            message: `Success! ${data.email} has been made an admin.`,
          };
        })
        .catch(err => {
          return err;
        });
    });

ou

exports.listUsers = functions.https.onCall((data, context) => {
// Vérifie si le custom claim admin et modo est égale à true
const isAdmin = context.auth.token.admin === true;
const isModo = context.auth.token.modo === true;
if (!isAdmin && !isModo) {
return { error: `Unauthorized.` }
}
return admin
.auth()
.listUsers()
.then(listUsersResult => {
// Récupère le tableau des utilisateurs
const result = listUsersResult.users.map(user => {
return user;
});
return { result }
})
.catch(error => {
return { error: 'Error listing users' }
})
});

Ensuite, ecrire la commade pour enregistrer les clouds functions

    firebase deploy --only functions
    Pour deploy les fonctions
    NB: En supprimant une fonction dans l'index, il supprime aussi dans la cloud.
    
Attention
-

- Concernant `(data, context) => {...}`, il n'y aura aucun problème concernant l'utilisation de `data`, mais si on utilise le `context`, l'utilisation de la commande `firebase deploy --only functions
` va générer une érreur. L'érreur est générer par le `/functions/tsconfig.ts` (voir ci-dessous).


      {
        "compilerOptions": {
          "module": "commonjs",
          "noImplicitReturns": true,
          "noUnusedLocals": true,
          "outDir": "lib",
          "sourceMap": true,
          "strict": true, <= A cause de lui
          "target": "es2017"
        },
        "compileOnSave": true,
        "include": ["src"]
      }

En supprimant cette ligne on regle le problème. Si cette solution ne convient pas voir le stackflow ci-joint : [autres solutions](https://stackoverflow.com/questions/55167069/firebase-cloud-functions-object-possibly-undefined)

- Une fois que les clouds functions sont enregistrés, il ne sert à rien de les concervés dans l'application. Firebase fournis des méthodes pour les utilisés.

## Utilisation

On peut créer un service, voir directement dans le component, tout dépendra de ce qu'on veut sécuriser ou non.

import \* as firebase from 'firebase';
...
...

const addAdminRole = firebase.functions().httpsCallable('addAdminRole'); // le nom à mettre ici vient de la: "exports.addAdminRole = ... "
addAdminRole().then(result => result.data)
.catch(error => console.error(error));

---

    Ecriture inline. C'est la même chose qu'en haut.
    firebase.functions().httpsCallable('addAdminRole')().then(list => list.data.result).catch(error => console.error(error));

Vous pouvez le code ci-dessus en observable, en promesse, ou vanilla.

## Exemple

Admettons l'utilisation d'un observable dans un service

- Service


      #services/user.service.ts

      adminRoleManager(email: string) {
        return new Observable(observer => {
          const addAdminRole = firebase.functions().httpsCallable('addAdminRole');
          addAdminRole({email})
            .then(result => observer.next(result.data))
            .catch(error => observer.error(error));
        });
      }

- Component


      import { UsersService } from '../../../core/services/users.service';
      import { Observable } from 'rxjs';

      @Component({
        selector: 'app-list-users',
        templateUrl: './list-users.component.html',
        styleUrls: ['./list-users.component.scss'],
      })
      export class ListUsersComponent implements OnInit {
        public user$: Observable<any>;
        constructor(private userService: UsersService) {}
        ...
        ...

        onSubmit() {
          ...
          ...
          const email = 'max@test.com'
          this.userService.adminRoleManager(email).then(res => {
              // retoune un message de succès
          }).catch(error => console.error(error))
        }
      }
