# Template Express

> A template for static single page, based on parcel.js, typescript and sass.

## Usage

### Dependencies

```bash
npm run frame
```

> Depending on the package lock file ("package-lock.json" or "yarn.lock"), you might need to install [**yarn**](https://yarnpkg.com/zh-Hans/docs/install).

### Development

```bash
$ npm run dev
```

### DevOps

* Build the project.

```
npm run tsc
```

* Start the server.

```bash
npm start
```

* Stop the server.

```bash
npm run stop
```

> The project included the process manager "pm2", you **DO NOT** need to install "pm2" or "forever" globally.

## Configuration

### Environment variables

To configure the port number and other environment variables, create a file ".env" and edit it just like ".env.example". The file ".env" is ignore by git, so that it can store some secret info.

```
NODE_ENV=production
PORT=7100
SOME_API_KEY=xxxxxxxx
```

Or use command line (before starting server):

```bash
printf "NODE_ENV=production\nPORT=7100\nSOME_API_KEY=xxxxxxxx" > .env
```

## CORS

Look at the [expressjs/cors](https://github.com/expressjs/cors).
