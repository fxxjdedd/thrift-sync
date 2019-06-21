# thrift-sync
Synchronzie your thrift definition file with joy.

## Install

```bash
$ npm set @fe:registry http://git.npm.t.pt.miui.com/

$ npm install @fe/thrift-sync
```

## Usage
in your package.json
```json
"script": {
  "thrift-sync": "thrift-sync sync <git-url> -p <targetPath>"
}
```
then run
```js
$ npm run thrift-sync
```

## License
MIT
