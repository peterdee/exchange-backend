## exchange-backend

Backend for **Exchange** project.

Production: [https://exchange.dyum.in](https://exchange.dyum.in).

WEB application repository: [https://github.com/peterdee/exchange-web](https://github.com/peterdee/exchange-web).

Stack: [Node](https://nodejs.org), [Socket.IO](https://socket.io), [Typescript](https://www.typescriptlang.org).

### Deployment

Node **v24** is required.

Clone the repository and install dependencies:

```shell script
cd ./exchange-backend
nvm use 24
npm ci
```

### Environment variables

The `.env` file is not required, but it is going to be loaded if it is available in the project root directory.

Required environment variables are listed in [.env.example](.env.example) file.

For local development (**dev** or **local** scripts) the `.env` file should be used.

### Launching

##### Launching for development

```shell script
npm run dev
```

##### Launching for production

```shell script
npm start
```

Server will be available at [ws://localhost:9090](ws://localhost:9090).

##### Local mode

Server can be launched in `local` mode (specifically to be used in local networks).

Before launching the server make sure that local network allows connections on the server port (in case of Windows port should be opened in Windows Firewall).

If you are running frontend locally as well, make sure that its port is also opened.

Local mode implies that you will use internal IP addresses, so you have to use HTTPS / SSL since the frontend is also running with SSL.

Create `certificates` directory in the root of the project and open it:


```shell script
# ./exchange-backend
mkdir certificates && cd ./certificates
```

Generate certificates with OpenSSL (MacOS / Ubuntu / Windows):

```shell script
# Generate key file
openssl genrsa -out key.pem 2048

# Generate CSR
openssl req -new -sha256 -key key.pem -out csr.csr

# Generate certificate
openssl req -x509 -sha256 -days 365 -key key.pem -in csr.csr -out cert.pem
```

Launch in `local` mode:

```shell script
npm run local
```

This script produces QR code in the terminal, this QR can be scanned with your mobile device (for convenience) and address can be opened in the browser.

### Cloud deployment

`release` branch of this repository is automatically deployed to [Render](https://render.com).

Public production server is available at [https://exchange-backend-rous.onrender.com](https://exchange-backend-rous.onrender.com) and is used by default for [https://exchange.dyum.in](https://exchange.dyum.in).

### License

[MIT](./LICENSE.md) licence is used for the project.
