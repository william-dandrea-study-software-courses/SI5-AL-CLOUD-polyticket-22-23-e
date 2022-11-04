# How to deploy this project on GCP

Dans ce projet, nous avons 3 FaaS (event-listing, ticket-cart-checker, ticket-details) ainsi que 4 PaaS.

Afin de facilier le déploiement, nous avons mis en place une chaîne de déploiement
continu en place, afin que à chaque nouveau push sur la branche main du repository
du projet, tout les micro-services se deploient automatiquement.

SI vous souhaitez utiliser ce projet et le déployer vous même, il y a quelques étapes 
préliminaires. 
