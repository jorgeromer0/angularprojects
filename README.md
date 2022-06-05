# APP-PROJECTS

L'objectiu del projecte és una pàgina on  pugues guardar projectes que has fet.
La aplicacio està desplegada en Webpack, utilitza Firebase de backend i Angular en el frontend.

## FIREBASE (BD)

Les conexions i peticions a BD estan totes en la carpeta service.


## ESTRUCTURA
Cada pàgina de la web és un component situat a la carpeta components amb el seu css, html i ts específic. Les dades de la BD se sol·liciten des de fitxers de la carpeta service, les interfícies en la carpeta interfaces i les pipes personalitzades en la carpeta pipe.

## PÀGINES I FITXERS
- app.component.html : Se encarrega de el routing per carregar les diferents pàgines de la aplicació.

### COMPONENTS
- auth : Login de l'app necessites estar registrat, una vegada amb un compte pots gestionar els teus projectes.
- register : Registre de la app per crearse el teu usuari.
- projects :  Llista els teus projectes.
- detail:  Llista un projecte, permet esborrar-les i accedir a elles per modificar-les.
- about: És la informació de l'usuari i els llenguatges que utilitza.
- create: Anyadises els projectes.

### INTERFACES
- project : Es la interficie utilitzada per guardar la informació dels projects en BD i tractar les seues dades.
- user : Es la interficie utilitzada per guardar la informació dels projects en BD i tractar les seues dades.

### SERVICE
- login : Totes les peticions a BD sobre els usuaris o les seues dades .
- projectes : Totes les peticions a BD sobre els projectes .
-  upload : Pujar imatges a la BD . (no funciona)


### PIPES
- filter-project : S'encarrega de retornar una llista de projectes que coincidisquen amb un paràmetre string.


### GUARD
- auth-guard: Consulta al servici que manté el localStorage per saber si pot anar o no a una ruta. 


## Autor

Jorge Romero ©  para la asignatura de Desarrollo de aplicaciones en entorno cliente.
