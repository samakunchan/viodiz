# Memo Angular

## @Input

Transfère les données venant du `parent` vers le `child`.

    1. Parent compornent
    export class ParentComponent implements OnInit {

      proprieteAleatoireBooleen: boolean;
      proprieteAleatoireStrg: string;
      ...
      ...
      constructor() { }

      ngOnInit() {
        // Facultatif. On peut aussi le faire sur le child
        this.proprieteAleatoireBooleen = true;
        this.proprieteAleatoireStrg = '.....';
      }

      NB: Une méthode peut aussi mettre à jour les propriétés.
    }

---

    2. Parent HTML
    <div
        [proprieteAleatoireBooleen]="proprieteAleatoireBooleen"
        [proprieteAleatoireStrg]="proprieteAleatoireStrg"
        >
    </div>
    NB: Entre crochet, le nom importe peu. C'est mieux de mettre le même.

---

    3. Child component
    export class ChildComponent implements OnInit {

      @Input() proprieteAleatoireBooleen; // Les infos arrivent ici
      @Input() proprieteAleatoireStrg; // Les infos arrivent ici

      constructor() {}

      ngOnInit() {}

    }

---

    4. Child HTML
    <div *ngIf="proprieteAleatoireBooleen">{{ proprieteAleatoireStrg }}</div>

---

## @Output

Permet de renvoyer des données d'un component `child` au `parent`.

Pre-requis: On doit émettre les données grâce à la class `EventEmitter` d'Angular.

    1. Child HTML
    <button (click)="onActionQuelconque()" *ngIf="proprieteAleatoireBooleen">{{ proprieteAleatoireStrg }}</button>

---

    2. Child component
    export class ChildComponent implements OnInit {

      @Input() proprieteAleatoireBooleen;
      @Input() proprieteAleatoireStrg;
      @Output() proprieteARemonter = new EventEmitter<boolean>(); // En prenant l'exemple d'un booléen.

      constructor() {}

      ngOnInit() {}

      onActionQuelconque() {
        if (ceci) {
          this.proprieteARemonter.emit(true)
        } else {
          this.proprieteARemonter.emit(false)
        }
      }

    }

---

    3. Parent HTML
    <div
        [proprieteAleatoireBooleen]="proprieteAleatoireBooleen"
        [proprieteAleatoireStrg]="proprieteAleatoireStrg"
        (proprieteARemonter)="methodeQuelconque($event)"
        >
    </div>

---

    4. Parent component
        export class ParentComponent implements OnInit {

          proprieteAleatoireBooleen: boolean;
          proprieteAleatoireStrg: string;
          ...
          ...
          constructor() { }

          ngOnInit() {
            ...
          }

            methodeQuelconque(value: boolean) {
              // Les données sont dans 'value'.
            }
        }
