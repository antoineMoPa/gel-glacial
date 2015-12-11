# frames

Il faut faire un design qui enlève le recours aux frames, une pratique qui n'est plus adéquate dans le web depuis plusieurs années.

Raisons:

* Les frames offre un rendu affreux sur mobile (presque impossible de rendre le site «responsive»)
*

# Trop de requêtes

53 fichiers (.js) sont chargés en même temps dans la grille de note, pour un total de moins d'un Mb.

Cela crée énormément d'«overhead» (opérations superflues) et de latence.

Ces fichiers (principalements issus du framework dojo) devrait être combinés dans un fichier (.js) afin de diminuer le nombre de requêtes.

La page de note est actuellement très lente à charger, d'autant plus quand tout le monde s'y dirige en même temps.