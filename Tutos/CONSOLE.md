#Console JS

##console.log

![log](https://cdn-media-1.freecodecamp.org/images/1*FvyeehvzCpelNj-pKSHPcg.png 'console.log')

Ou

console.log({ user, project })
ES6: console.log(`user: ${user}`);

##console.warn

![warn](https://cdn-media-1.freecodecamp.org/images/1*XNH6EhI8d-V0-Le7dP7gAA.png 'console.warn')

##console.error

![error](https://cdn-media-1.freecodecamp.org/images/1*jPEvpMtNVWWIu_EvyegIiw.png 'console.error')
##console.assert
const isLoggin = false;
console.assert(isLoggin, 'Il est connecter')
NB: La console s'affiche uniquement si c'est faux et ne montre rien si c'est vrai.
##console.dir
console.dir(document.body);
NB: Affiche une liste d'object

##console.table
console.table(['Javascript', 'PHP', 'Perl', 'C++']);
NB: Ne marche que pour les tableaux

##console.group/console.groupEnd
console.group();
console.log('I will output');
console.group();
console.log('more indents')
console.groupEnd();
console.log('ohh look a bear');
console.groupEnd();
NB: Copier tout le code dans la console pour voir l'effet.
Elle sert à indenter en tree.
##Styliser le texte de la console

![formating](https://cdn-media-1.freecodecamp.org/images/1*DOCtgY_O8f_1mAq3UzLtIQ.png 'formating')

Et aussi utiliser le css avec une variable.
![formating variable](https://cdn-media-1.freecodecamp.org/images/1*dDcJa9FRxivPU_-aP_3l5Q.png 'formating variable')

# Utilisation avancé

##Substitution

Règles:

- `%s` | remplace un élément par un `string`
- `%(d|i)`| remplace un élément par un `integer`. Nb: `(d|i)` = soit `d` soit `i`
- `%f` | remplace un élément par un `float`
- `%(o|O)` | element est afficher comme un object.
- `%c`| applique un style css fournie en 2nd parametre


    Input: console.log('Hello %s', 'world')

    Output: Hello world
    Il remplace `%s` par le 2nd paramètre et le transform en `string`, même si c'est un object `[Object, Object]`

---

    console.log('this is an object %o', { obj: { obj2: 'hello' }})
    Il remplace `%o` par le 2nd paramètre

---

Pour les nombres:

- `%i` or `%d` for integers,
- `%f` for floating-points.

##Exemple

    const success = [ 'background: green', 'color: white', 'display: block', 'text-align: center'].join(';');
    const failure = [ 'background: red', 'color: white', 'display: block', 'text-align: center'].join(';');

    console.info('%c /dancing/bears was Successful!', success);
    console.error('%c /dancing/bats failed!', failure)

    console.log('%cred %cblue %cwhite','color:red;','color:blue;', 'color: white;')
