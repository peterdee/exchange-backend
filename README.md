## exchange-backend

Backend for [Exchange](https://github.com/peterdee/exchange-web) project

Stack: [Node](https://nodejs.org), [Socket.IO](https://socket.io), [Typescript](https://www.typescriptlang.org)

### Deployment

```shell script
git clone https://github.com/peterdee/exchange-backend
cd ./exchange-backend
nvm use 18
npm ci
```

### Environment variables

The `.env` file is required for local development, see [.env.example](.env.example) for details

### Launch

##### Launch locally

```shell script
npm run dev
```

Local server will be available at http://localhost:9090

##### Launch when deployed to the cloud

```shell script
npm start
```

Production server is available at https://exchange-backend-rous.onrender.com

### Cloud deployment

`release` branch of this repository is automatically deployed to [Render](https://render.com)

### License

[MIT](./LICENSE.md)
