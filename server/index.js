/*
 * 静态化
 */

const fs = require("fs");
const path = require("path");
const { createBundleRenderer } = require("vue-server-renderer");
const _root = path.resolve(__dirname, '../dist/');
const _resolve = file => path.resolve(_root, file);

// 输出的静态文件地址
const staticHtmlPath = _resolve('public/index.html');
const tmpHtml = fs.readFileSync(_resolve("public/index.tmp.html"), "utf-8");
const serverBundle = require(_resolve('public/vue-ssr-server-bundle.json'));
const clientManifest = require(_resolve('public/vue-ssr-client-manifest.json'));
let _startSecs = 0;

// 如果没有这两个文件，不做任何处理
if (!serverBundle || !clientManifest) {
  console.log('error: 缺少vue-ssr-server-bundle.json或者vue-ssr-client-manifest.json');
  return;
}

// 静态化
const renderer = (_bundle, _manifest, query = {}, res) => {
  _startSecs = Date.now();
  const pageName = query.path == 'app2' ? 'app2/' : '';
  const pagePath = pageName ? _resolve('public/'+pageName+'index.html') : staticHtmlPath;
  const context = {
    title: "vue-static("+(query.name || '-')+")",
    url: "/" + pageName
  };
  createBundleRenderer(_bundle, {
    template: tmpHtml,
    clientManifest: _manifest
  }).renderToString(context, (err, html) => {
    console.log('静态化耗费时间：'+(Date.now() - _startSecs)+"ms");

    // 返回
    res.send(html);
    
    fs.writeFile(pagePath, html, function(err,data){
      if(err){
        console.log("writeFile file error");
        return false;
      }
      console.log("writeFile succ");
    });
  });
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// 静态资源加载
app.use(express.static(_resolve('public')))

// 生成静态页的请求
app.get('/create', (req, res) => {
  renderer(serverBundle, clientManifest, req.query, res);
});

// 静态访问文件
app.get('*', (req, res, next) => {
  let _url = req.url;
  // 做一层代理
  if(_url.indexOf('.') == -1){
    res.sendFile(_resolve("public/"+_url + "/index.html"));
  } else {
    res.sendFile(_resolve("public/main.js"));
  }
})

// 服务端监听
app.listen(port, '0.0.0.0')
console.log('Server listening on `localhost:' + port + '`.')
