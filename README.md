# sketch-webcam-v2

Interactive demos with tensorflow.js, three.js and Nuxt.js.

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

- [tensorflow/tfjs: A WebGL accelerated JavaScript library for training and deploying ML models.](https://github.com/tensorflow/tfjs)
- [tensorflow/tfjs-models: Pretrained models for TensorFlow.js](https://github.com/tensorflow/tfjs-models)