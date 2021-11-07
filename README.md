# NestJS を使った時の Docker の例

## Running

このサンプルは Docker を利用します。

### Setting

MySQL への接続設定を行います。vim で .env が開くので空白になっている環境変数を指定してください。

```
make init-db
```

### Docker

`docker-compose build` のエイリアス

```
make dc-build
```

`docker-compose up -d` のエイリアス

```
make dc-up
```

`docker-compose down` のエイリアス

```
make dc-down
```

`docker-compose stop` のエイリアス

```
make dc-stop
```

`docker-compose logs -f` のエイリアス

```
make dc-log
```

`todo_api` コンテナにログイン

```
make attach-api
```

`todoapp` コンテナにログイン

```
make attach-vue
```
