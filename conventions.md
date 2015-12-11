# Conventions

## Langue du code

On fait ça en **anglais**, au cas où une partie du code soit réutilisable dans d'autres contextes.
Aussi, un grand sage a déjà dit que le code en français, [ça existe pas](https://github.com/antoineMoPa/gel-glacial/pull/1#issuecomment-163925550).

## Librairies externes

Le but est de tenir la complexité, le poids et les dépendances au minimum.

### Pas de jQuery!

jQuery, c'était très cool avant que document.querySelectorAll fonctionne.
Maintenant, ça sert surtout à ralentir le code et à mettre des $ partout. Donc pas de jQuery.

### Frameworks

Pas de framework comme angular, ember, dojo ou les 14000 autres frameworks javascript qui sortent à chaque jours.

Il y a toujours un framework à la mode. Par contre:

* Ça rajoute quelque chose à apprendre avant de contribuer
* Ça rajoute de la lourdeur et de la complexité
* Ça arrête d'être à la mode et tu te retrouve avec du code qui utilise une vieille librairie que tout le monde déteste.
* En général, c'est super fancy, mais tu aurais pu tout faire en javascript «pur».
* Ça crée de l'abstaction innappropriée qui complique les choses au lieu de les simplifier.

Par exemple, gel.usherbrooke.ca utilise dojo pour faire un tableau avec des tooltips.
On aurait pu coder ça en 50 lignes honnêtement. 

### Autres Librairies

Si nécessaire, des librairies externes pourraient être utilisées pour faire des tâche spécifiques.

Par exemple: Lire/Créer des fichiers ical
