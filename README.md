# short-url

## requirements
- node 12.16.1
- MongoDB shell version v4.0.3

## Quickstart
```shell
$ npm install
$ npm run dev
```

## usage
1. **npm run dev** to run the server at local host.
2. use http post method to send a request to eg. this link http://localhost:8080/generate with body originUrl to set the originURL to generate the short url. And it will return the short url.
3. http get method  http://localhost:8080/resolveShortUrl/[short-url]

