# Responsive avec Angular

## app.component.ts

import { ..., ..., HostListener, ... } from '@angular/core';
public innerWidth: any;
...
...
@HostListener('window:resize', ['$event'])
onResize(event) {
this.innerWidth = window.innerWidth;
console.log(this.innerWidth);
}

Grace à l'event `HostListener` et la methode `onResize`, on voit la mise à jour de la taille de l'écran en temps réel.

## app.component.html

Exemple d'utilisation:

    <div *ngIf="innerWidth === 425" class="container-fluid"></div>
