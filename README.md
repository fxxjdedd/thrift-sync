# thrift-sync
Synchronzie your thrift definition file with joy.

## Example
in your package.json
```json
"scripts": {
  "thrift-sync": "thrift-sync sync git@xxx.git -p src/commons/thrift"
}
```
Make sure you have access to the git repository, and run:
```js
$ npm run thrift-sync
```

## License
[MIT](https://github.com/fxxjdedd/thrift-sync/blob/master/LICENSE)
