# How to deploy this project on GCP

Dans ce projet, nous avons 3 FaaS (event-listing, ticket-cart-checker, ticket-details) ainsi que 4 PaaS.

Afin de facilier le déploiement, nous avons mis en place une chaîne de déploiement
continu en place, afin que à chaque nouveau push sur la branche main du repository
du projet, tout les micro-services se deploient automatiquement.

SI vous souhaitez utiliser ce projet et le déployer vous même, il y a quelques étapes 
préliminaires. 
En premier lieu, vous devez créer une base de donnée MongoDB, et y insérer l'URL et les 
credentials dans les différents micro-services et fichier d'environnement. Vous devez faire
de même en créant une base de donnée postgreSQL

Une fois ceci fait, vous avez juste à deployer le code sur votre propre projet GCP, 
vous devrez cependant vous assurer que dans les fichiers du doccier .github/workflow
que vous avez le bon nom de projet.

Dans le github, vous devrez aussi insérer vos crédentials dans les variables secrêtes GCP_SA_KEY
GCP_PROJECT_ID.

Pour le micro-services vod-gate, qui gère le système de VOD, vous devrez générer un JSON 
de crédential et l'insérer à la racine de vod-gate sous le nom 'cloud-tickets-3276b00f7a24.json'

Une fois un premier push effectué sur GitHub, vous devrez vous connecter à votre projet
GCP dans la partie cloud build et configurer les déploiements. Vous aurez à connecter le repository
github à GCP et à créer un trigger pour les services event-manager, ticket-booking, vod-gate.
Afin de vous aider, nous avons mis dans chacun de ces services (à la racine), un fichier 
.gcloud_configuration.yaml qui contient le contenu de ce trigger si vous voulez trigger 
par un fichier cloudbuild.yaml

Enfin, et si vous souhaiter utiliser le front-end (non-nécessaire), vous devrez juste aller
consulter les différents services angular afin de modifier les URL d'accès aux microservices
qui sont stocké dans une variable globale à la classe.
