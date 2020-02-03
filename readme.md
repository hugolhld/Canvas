# Hugo.io  😈

Hugo Lhernould - H2G2 - P2023

## Présentation du jeu 💻

Le jeu est tout simplemnt inspiré par celui mondialement connu,Agario, j'ai essayé de reproduire à la limite de mes capacitées en ce laps de temps.
Alors le but est de anger des petits bots afin de pouvoir être assez gros pour dévorer ces adversaires

Je souhaite continuer à ajouter le maximums de features pour l'utiliser pour mon portfolio par exemple, comme rajouter avec les webpacks, node.js ... un serveur afin de pouvoir jouer à plusieurs.

## Features disponibles ✔

- Pseudo perso avec son score en dessous
- Se déplacer dans la map
- Manger des bots et des adversaires
- Grossir suites à la dernière feature
- Fonction de Win and Lose
- Réglages afin de pouvoir mettre un mode sombre ou jour, iansi qu'un lien vers le git du projet
- Des couleurs aléatoires pour tout les bots et adversaires, mais possibilité de choisir ça couleur avec le constructor pour créer une balle, il suffit de remplacer " randomColor "

    - ```js
            ball = new Ball(window.innerWidth / 2,window.innerHeight  / 2,32,randomColor, true, nicknameDiv, true)
        ```
- Fonctionnalité d'afficher un menu pause 

## Défauts ❌

- Manque la fonction pour mettre le jeu officielement en pause
- Grille en arrière plan qui ne bouge pas avec les bots
- Des trajets un peu plus précis pour les bots animés, et un système pour qu'ils vous suivent si vous vous trouvez assez proche
- et surement bien d'autres ...  😃

