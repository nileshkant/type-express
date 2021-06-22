# Express.js, typeorm with postgres boilerplate

## Getting started

```
npm install
npm run dev
```

> Note: All script has two versions `*:win` in `package.json` is for windows devices. Please change the script according to your platforms supported script.

---

## Folder structure

```
📦type-express
 ┣ 📂src
 ┃ ┣ 📂controller  // data quering and business logics
 ┃ ┃ ┗ 📜UserController.ts
 ┃ ┣ 📂entity // Typeorm Schemas
 ┃ ┃ ┗ 📜User.ts
 ┃ ┣ 📂interface // Typescript interfaces
 ┃ ┃ ┗ 📜User.ts
 ┃ ┣ 📂migration // auto generated migration files
 ┃ ┃ ┗ 📜1624113550516-initial.ts
 ┃ ┣ 📂routes  // routes for each apis
 ┃ ┃ ┣ 📂users
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┗ 📜index.ts   // all imported routes from several subfolders
 ┃ ┣ 📜dbServer.ts // typeorm initialization code
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜server.ts // express server initialization code
 ┣ 📂test // test file using mocha, chai and supertest
 ┃ ┗ 📜User.test.ts
 ┣ 📜.env // for environment variables
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜.mocharc.json
 ┣ 📜.prettierignore
 ┣ 📜.prettierrc.json
 ┣ 📜docker-compose.yml
 ┣ 📜Dockerfile
 ┣ 📜LICENSE
 ┣ 📜ormconfig.docker.json
 ┣ 📜ormconfig.json
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┗ 📜tsconfig.json
```
