# GITA dev

## development nginx set
* install nginx
* 加入下面這段到 nginx.conf 中
```
server {
    listen 80;
    server_name dev.gita.com;

    location /favicon.ico {
      proxy_set_header Host      $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_pass http://127.0.0.1:1337;
    }

    location /robots.txt {
      proxy_set_header Host      $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_pass http://127.0.0.1:1337;
    }

    location ~ ^/(allpay|logout|order|print|auth|admin|ckeditor|stylesheets|javascripts|uploads|api|advance-api|fonts|templates|images|bower)(.*)$ {
      proxy_set_header Host      $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_pass http://127.0.0.1:1337;
    }

    location = /logo.png {
      root /srv/dist;
    }

    location / {
      proxy_pass http://127.0.0.1:8000;
      try_files $uri $uri/ /index.html =404;
      gzip on;
      gzip_types application/javascript application/x-javascript;
      proxy_buffering off;
    }
  }
```
* 新增 /etc/hosts
```
127.0.0.1       dev.gita.com
```
## Config

```
cp config/env/dev.default.js config/env/development.js
```
* 修改 config/env/development.js 裡的 domain `http://dev.gita.com/` 及相關資料庫帳號密碼設定。

## endpoint

### frontend
```
http://localhost:8000/
or
http://dev.gita.com
```

### API modules

## development env setting
- `export PATH=node_modules/.bin:$PATH`
- copy config/env/development.js config/env/local.js

```
export NODE_ENV=local
or
export NODE_ENV=development
or
export NODE_ENV=production
```

## TEST Code

```
npm i -g mocha
```

and run test code in test folder

```
mocah test/unit/services/hdsService.spec.js
```

the result should be like,

```
  API UserContoller
    get public permission data
Executing (default): SELECT `type`, `title`, `avatar` FROM `Users` AS `User` WHERE (`User`.`deletedAt` IS NULL AND `User`.`isPaid` = false);
      ✓ Get /api/user/public (38ms)


  1 passing (5s)
```

## SQL schema

## references
- [Nodemailer](https://github.com/andris9/Nodemailer)
- [sails-service-mailer](https://www.npmjs.com/package/sails-service-mailer)
