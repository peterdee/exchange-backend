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

The `.env` file is required for local development, see [.env.example](.env.example) for details

### Launching

##### Launching for development (uses WS)

```shell script
npm run dev
```

Server will be available at ws://localhost:9090

##### Launching for local network (prints server address in local network and uses WSS)

Before launching in local mode you need to do some additional configuration

Create a new directory called `certificates` in the root of the project and open it

```shell script
mkdir certificates
cd ./certificates
```

Generate certificates that are used when you launch server locally (OpenSSL is required for that)

```shell script
# MacOS / Windows
openssl genrsa -out key.pem 1024
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -in csr.pem -signkey key.pem -out cert.pem
```

You need to generate certificates only once

When you launch the server it will use generated certificates and use HTTPS instead of HTTP for Socket.IO server

```shell script
npm run local
```

Server will be available at wss://localhost:9090

##### Launching for production (no logging, no network address information, uses WS)

```shell script
npm start
```

Demo (public) server is available at https://exchange-backend-rous.onrender.com and is used by default for https://exchange.dyum.in

### Cloud deployment

`release` branch of this repository is automatically deployed to [Render](https://render.com)

### License

[MIT](./LICENSE.md)
