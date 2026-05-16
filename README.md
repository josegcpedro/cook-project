# Cook Project EPSIC – Module 322 

## 🔧 Prérequis


- *Node.js* (18) – [https://nodejs.org/](https://nodejs.org/)
- *Angular CLI* –

```bash
npm install -g @angular/cli
```

- *JSON Server*

```bash
npm install -g json-server
```

---

## Setup du projet

### 1. Installer les dépendances

```bash
npm install
```

---

## Lancer l'application en local

### Démarrer la base de donnée JSON

```bash
json-server --watch db.json --port 3000
```
L'api est disponible sur
`http://localhost:3000`


### Démarrer le front Angular

```bash
ng serve
```

App accessible sur

`http://localhost:4200/home`

---

### Structure du projet

```text
src/
├── app/
│   ├── component/
│   │   └── header/                 
│   ├── pages/
│   │   ├── description-recette/                
│   │   │   ├── description-recette.ts
│   │   │   └── description-recette.html
│   │   │   └── description-recette.scss
│   │   ├── Home/
│   │   │   ├── home.ts
│   │   │   ├── home.html
│   │   │   └── home.scss
│   │   ├── Page-erreur/
│   │   │   ├── page-erreur.html
│   │   │   ├── page-erreur.ts
│   │   │   └── page-erreur.scss
│   │   ├── Recettes/
│   │   │   ├── recettes.html
│   │   │   ├── recettes.ts
│   │   │   └── recettes.scss
│   │   
│   │  
│   ├── services/
│   │   ├── data-service.ts
│   │   └── data-service.spec.ts
│   │   ├── filter-service.ts
│   │   └── filter-service.spec.ts
│   ├── assets/                    
│   │   ├── Image-logo
│   │   ├── image404
│   │   └── images
│   │
│   ├── app.routes.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.component.scss
├── styles.scss
├── index.html
├── server.ts
└── main.ts
```
