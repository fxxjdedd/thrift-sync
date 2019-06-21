# thrift-sync
Synchronzie your thrift definition file with joy.

## Install

```bash
$ npm set @fe:registry http://git.npm.t.pt.miui.com/

$ npm install @fe/thrift-sync
```

## Example
in your package.json
```json
"scripts": {
  "thrift-sync": "thrift-sync sync git@v9.git.n.xiaomi.com:angelia/push-server.git -p src/commons/thrift"
}
```
Make sure you have access to the git repository, and run:
```js
$ npm run thrift-sync
```

## License
MIT
