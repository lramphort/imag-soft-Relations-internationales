# RelationsInternationales

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.4.

Application pour le service des Relations Internationales
L'application se découpe en 2 parties : partie Administrateur et partie Etudiant. Chaque partie possède ses propres droits.

Ce repository correspond au front de l'application, pour l'installation du back (+ ajout dans la BD de quelques lignes) voir le repo https://github.com/thomasdebugger/imag-soft-Relations-internationales-backend.

NB : avec le script import.sql du back, les identifiants par défaut d'un administrateur est admin/admin, tandis que les étudiants sont root1/root1, root2/root2.....

## Page de connexion

La page racine est la page de la connection, où l'on renseigne ses identifiants. Les identifiants administrateurs sont à gérer directement dans la base de données. Les identifiants étudiants sont gérés sur la partie "Création d'un nouvel étudiant"

## Administrateur

En se connectant en tant qu'admin, on arrive sur la liste des étudiants enregistrés, en tant que tableau. Y est indiqué les noms des étudiants, leur dernière connection, s'ils sont sortants ou entrants. On peut archiver des étudiants (= ils n'apparaitront plus sur la liste principale) ou accéder aux pages d'ajout d'étudiants
Si un étudiant a modifié une information de sa page, un point d'exclamation apparait sur sa ligne, indiquant à l'admin qu'u changement s'est produit.

En cliquant sur un étudiant, on accède à sa propre page.

### Page d'étudiant en tant qu'admin

Le haut de la page est réservé aux informations étudiantes. On peut générer un pdf avec les informations de l'étudiant (fonctionnalité à améliorer).

La première partie de la page est réservée au combo Learning Agreement/Historique des matières.
Cela se compose comme ceci : si le Learning Agreement n'est pas encore validé, la liste des matières du LA est encadré en orange. L'administrateur peut appuyer sur le bouton "Valider Learning Agreement" s'il est d'accord avec le LA. Dans le cas contraire, il peut manuellement supprimer une matière en particulier. Si il supprime une matière alors que le LA était validé, cela remet le LA en "pending" (encadré orange). L'admin peut aussi appuyer sur 'invalider le LA', dans ce cas le LA possède un encadré en rouge.

Lorsque l'admin ou l'étudiant supprime une matière de la liste du LA, elle se retrouve dans le tableau "Historique" en dessous. L'historique permet d'avoir un visuel des ajouts/suppression des matières par l'étudiant (ou l'admin). La date de suppression de la matière du LA y est indiquée. L'admin peut aussi supprimer une matière le l'historique, cela est présent uniquement en matière d'administration de l'application, faire cette action supprimera la matière de l'étudiant de la BD.

Les tableaux suivants sont les Cours, Topics et Contacts. Appuyer sur un cours ou Topic permet d'accéder à ses informations. Parmi celles-ci, il y a une option pour ajouter un sondage à l'étudiant. L'administrateur peut donner un titre au sondage, et des options possibles (vu sous la forme de cases à cocher du coté étudiant).

### Ajouter un étudiant

On accède à la pop-up d'ajout d'un étudiant depuis la liste des étudiants.

L'administrateur est invité à ajouter les informations de l'étudiant.

L'étudiant est alors créé dans l'appli, avec pour identifiant/motdepasse nomprénom/nomprénom. Par exemple, si l'étudiant s'appelle Laure Higine, il pourra se connecter en entrant laurehigine/laurehigine (fonctionnalité à améliorer).

## Etudiant

En se connectant, l'étudiant à accès à ses informations.

Les premières informations sont réservées aux cours. L'étudiant peut filtrer ses cours entre ceux actifs et ceux historisés. Un cours historisé est un cours "supprimé" de la liste principale : soit l'étudiant l'a manuellement supprimé, soit cela a été fait par l'admin car la matière en question n'est pas conforme pour valider le Learning Agreement.

Il y a deux sous-parties qui suivent : les Topics Life et les Topics Courses. Ils ont le meme fonctionnement l'un et l'autre. Si un admin a posé un poll sur une matière, l'étudiant peut le voir et répondre, soit en choisissant une réponse que l'admin a manuellement entré, soit en écrivant lui-meme sa réponse.

## Traduction 

Attenton, il ne faut surtout pas modifier les textes directement dans les html. En faisant cela, vous allez casser la traduction.

Dans le html, vous ne mettez qu'une référence. Les traductions sont dans assets/i18n/*.json

De plus, il ne faut pas écrire cela : 

`<span>Example </span>` mais `<span>Example</span>` ( sans l'espace ). Le match ne se fait pas correctement s'il y a des espaces.

## Code 

Un composant est constitué de 4 fichiers. Un fichier ts e typescript comprenant la logique du composant. Un fichier html et css pour l'affichage.
Le fichier spec.ts est édité automatiquement

Il est préférable d'installer WebStorm pour pouvoir éditer correctement ce projet. Il vous permettra de naviguer plus facilement à travers les composants.

Le framework Angular material est utilisé pour éditer le html. Il permet d'utiliser des composants angular tout faits.

Dans /services, vous trouverez toutes les classes permettant de discuter avec le back. Notamment toutes les requêtes http

## Contact

Vous pouvez contacter Loïc RAMPHORT - lramphorttt@gmail.com si vous avez besoins d'aide.

Vous pouvez également contacter un professeur qui est très à l'aise avec Angular : Alexandre DEMEURE - alexandre.demeure@imag.fr

----------------------------------------------------

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Installation et run en local

Avant de coder, veuillez lancer `yarn install` pour télécharger les modules. `npm start` pour ensuite lancer le projet en local sur [localhost:4200](http://127.0.0.1:4200)

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
