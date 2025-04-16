## exchange-backend

Backend for [Exchange](https://github.com/peterdee/exchange-web) project

Stack: [Node](https://nodejs.org), [Socket.IO](https://socket.io), [Typescript](https://www.typescriptlang.org)

### Deployment

Clone the repository and install dependencies

```shell script
cd ./exchange-backend
nvm use 22
npm ci
```

### Environment variables

Required environment variables are listed in the [.env.example](.env.example) file

The `.env` file is required for local development (see `dev` script in [./package.json](./package.json))

The `ENV_FILE` variable determines if `.env` file is required or not (if variable is not set then `.env` is not required)

### Launching

##### Launching for development

```shell script
npm run dev
```

##### Launching for production

```shell script
npm start
```

Server will be available at ws://localhost:9090

### Cloud deployment

`release` branch of this repository is automatically deployed to [Render](https://render.com)

Demo (public) server is available at https://exchange-backend-rous.onrender.com and is used by default for https://exchange.dyum.in

### License

[MIT](./LICENSE.md)
