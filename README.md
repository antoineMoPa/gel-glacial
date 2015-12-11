# GEL GLACIAL

## Structure de fichiers

Dossier chrome:

Tout ce qui est propre à chrome

Dossier firefox:

Tout ce qui est propre à firefox

Dossier common:

Le js et le css que l'on insère dans les deux extensions.

## Outils de développement d'extension firefox

Il faut downloader nodejs et jpm. Ensuite, c'est facile.

## Building

Le Makefile permet de copier les fichiers qui sont communs à la version firefox et chrome dans les bon répertoires.

Pour builder (sous linux/quelquechose qui a bash)

    make build

## TODO

* Un bouton pour avoir les notes par rapport au pourcentage déjà évalué
* Une autre version du tableau
* Rendre le site beau (css)
* Diminuer le temps de loading des pages en enlevant les 53 scripts de la grille de note
* Plein d'autres features
