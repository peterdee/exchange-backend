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

Server will be available at [ws://localhost:9090](ws://localhost:9090)

##### Local mode

Server can be launched in `local` mode (specifically to be used in local networks)

Before launching the server make sure that local network allows connections on the server port (in case of Windows port should be opened in Windows Firewall)

If you are running frontend locally as well, make sure that its port is also opened

Local mode implies that you will use internal IP addresses, so you have to use HTTPS / SSL since the frontend is also running with SSL

Create `certificates` directory in the root of the project and open it


```shell script
# ./exchange-backend
mkdir certificates && cd ./certificates
```

Generate certificates with OpenSSL (MacOS / Ubuntu / Windows)

```shell script
# Generate key file
openssl genrsa -out key.pem 2048

# Generate CSR
openssl req -new -sha256 -key key.pem -out csr.csr

# Generate certificate
openssl req -x509 -sha256 -days 365 -key key.pem -in csr.csr -out cert.pem
```

Launch in `local` mode

```shell script
npm run local
```

This script produces QR code in the terminal, this QR can be scanned with your mobile device (for convenience) and address can be opened in the browser

### Cloud deployment

`release` branch of this repository is automatically deployed to [Render](https://render.com)

Demo (public) server is available at https://exchange-backend-rous.onrender.com and is used by default for https://exchange.dyum.in

### License

[MIT](./LICENSE.md)
