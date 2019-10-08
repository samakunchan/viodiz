#Configuration
##Menu

- Installation: [Installation](https://github.com/samakunchan/viodiz/tree/master/Tutos/Ngrx/1PREREQUIS.md)
- Configuration: [Configuration](https://github.com/samakunchan/viodiz/tree/master/Tutos/Ngrx/2CONFIGURATION.md)

##Initialisation

On commence par le cas ou l'on charge les données dès l'ouverture de l'app.
Ne pas oublier d'avoir un `roles.model.ts` sous la main.

    #app.module.ts
    @NgModule({
      declarations: [...],
      imports: [
        ...
        ...
        EffectsModule.forRoot([RolesEffects, ..., ...]), // Tout les effets sont ici.
        StoreModule.forRoot({ roles: rolesReducer, ..., ... }), // Tout les reducers sont ici.
        StoreDevtoolsModule.instrument({
          maxAge: 25, // Retains last 25 states
        }),
        ...
        ...
      ],
      providers: [...],
      bootstrap: [...],
    })
    export class AppModule {}

#####IMPORTANT
Même si on possède un module et que la documentation nous de faire ça:

    StoreModule.forFeature(roleFeatureKey, rolesReducer),
    EffectsModule.forFeature([RolesEffects]),

Cela ne fonctionnera pas lors pour ce cas ci. On trouvera un bug de boucle infini

##Actions
  
 Rappel commande
ng generate action store/actions/roles

---

    #store/actions/roles.action.ts

    export enum RolesActionTypes {
      RequestLoadRoles = '[Role] Request Load data Roles',
      AllRolesLoaded = '[Roles API] All Roles Loaded',
      ErrorLoadRole = '[Roles API] Error load roles',
    }

    export class RequestLoadRoles implements Action {
      readonly type = RolesActionTypes.RequestLoadRoles;
    }
    export class AllRolesLoaded implements Action {
      readonly type = RolesActionTypes.AllRolesLoaded;
      constructor(public payload: { roles: Roles[] }) {}
    }
    export class ErrorLoadRole {
      readonly type = RolesActionTypes.ErrorLoadRole;
      constructor(public payload: HttpErrorResponse) {}
    }

     export type RolesActions =
       | RequestLoadRoles
       | AllRolesLoaded
       | ErrorLoadRole
       ;

##Effects
  
 Rappel commande
ng generate effect store/effects/roles

---

    #store/effects/roles.effects.ts

    export const roleFeatureKey = 'roles';


    export interface RolesStateEntity {
      rolesLoaded: boolean;
      rolesLoading: boolean;
      data: Roles[] | null;
    }

    export const initialRolesState: RolesStateEntity = {
      rolesLoaded: false,
      rolesLoading: false,
      data: null
    };

    export function rolesReducer(state = initialRolesState, action: RolesActions): RolesStateEntity {
      switch (action.type) {
        case RolesActionTypes.AllRolesLoaded:
          return {
            ...state,
            data: action.payload.roles,
            rolesLoading: false,
            rolesLoaded: true,
        };
        case RolesActionTypes.ErrorLoadRole:
          return {
            ...state,
            rolesLoading: false,
          };
        default:
          return state;
      }
    }

##Reducers
Rappel commande
ng generate reducer store/effect/roles

---

    #store/reducers/roles.reducers.ts

    // Utile pour ça StoreModule.forFeature(roleFeatureKey, rolesReducer) dans les modules
    export const roleFeatureKey = 'roles'; <=

    // Utile pour créer des sélectors et pour le constructor dans "effect" : constructor(..., private store: Store<AppStateRole>...) {}
    export interface AppStateRole { <=
      roles: RolesStateEntity;
    }

    export interface RolesStateEntity {
      rolesLoaded: boolean;
      rolesLoading: boolean;
      data: Roles[] | null; <= model
    }

    export const initialRolesState: RolesStateEntity = {
      rolesLoaded: false,
      rolesLoading: false,
      data: null
    };

    export function rolesReducer(state = initialRolesState, action: RolesActions): RolesStateEntity {
      switch (action.type) {
        case RolesActionTypes.AllRolesLoaded:
          return {
            ...state,
            data: action.payload.roles,
            rolesLoading: false,
            rolesLoaded: true,
        };
        case RolesActionTypes.ErrorLoadRole:
          return {
            ...state,
            rolesLoading: false,
          };
        default:
          return state;
      }
    }

##Selectors
Il n'existe pas de commande pour le selector, il faut le créer à la main. Puis:

    #store/selectors/role.selectors.ts

    import { createFeatureSelector, createSelector } from '@ngrx/store';
    import { AppStateRole, RolesStateEntity } from '../reducers/roles.reducer';


    const selectRolesState = createFeatureSelector<AppStateRole, RolesStateEntity>('roles');


    export const selectRoleLoading = createSelector(selectRolesState, roles => roles.rolesLoading);
    export const selectRoleLoaded = createSelector(selectRolesState, roles => roles.rolesLoaded);
    export const getAllRoles = createSelector(selectRolesState, roles => roles.data);

Au lieu d'écris ceci : `this.role$ = this.store.select(roles => roles.data)` on écrira cela: `this.role$ = this.store.select(getAllRoles)`.
Cela retourne un observable utile par exemple pour le `role.component.html`.

    <ul><li *ngFor="let role of roles$ | async">{{ role.name }}</li></ul>

##Effects
Rappel commande
ng generate effect store/effects/auth

---

    #store/effects/role.effect.ts

    export class RolesEffects implements OnInitEffects {

      @Effect()
      loadRoles$ = this.actions$.pipe(
        // Selection de l'action
        ofType<RequestLoadRoles>(RolesActionTypes.RequestLoadRoles),
        // Il ne charge pas les données si elles sont déjà charger.
        withLatestFrom(this.store.select(selectRoleLoaded)),
        filter(([_, loaded]) => !loaded),
        // Utilise le service qui doit retourner absolument un observable qui contient les données
        switchMap(() => this.rolesService.getAllRoles().pipe(
          // Retourne une nouvelle action
          map(result => new AllRolesLoaded({ roles: result }))
        ))
      );

      constructor(private actions$: Actions, private store: Store<AppStateRole>, private rolesService: RolesService) {}

      // Pour l'initialisation
      ngrxOnInitEffects(): Action {
        return { type : RolesActionTypes.RequestLoadRoles };
      }

    }

##Index

    #store/index.ts

    export interface AppState {
      roles: RolesStateEntity;
      permissions: PermStateEntity;
      ...
    }

Tout le store est dans `AppState`. Tout les propriétés viennent des différents interfaces des reducers
Terminer concernant l'initialisation des données.
