# sketch-webcam-v2

Interactive demos with Mediapipe Web, three.js and Nuxt.js.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

### Create SSL key

with OpenSSL

```
openssl req -newkey rsa:2048 -new -nodes -keyout key.pem -out csr.pem ; openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out server.crt
```

## references

- [Getting Started / MediaPipe in JavaScript](https://google.github.io/mediapipe/getting_started/javascript.html)