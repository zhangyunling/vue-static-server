'use strict'
const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

let readmeTxt = `
${pkg.description}（最新版本：${pkg.version}）

> 目的：节省时间，高效完成工作；

## 使用与安装；

> 支持UMD模式的使用；

1. 直接引入；

直接下载：[fdutils.min.js](https://github.com/zhangyunling/fdutils/blob/master/dist/fdutils.min.js)

单元测试：[fdutils](http://www.zhangyunling.com/study/fdutils/)

直接使用\`script\`引入，引入之后，就可以按照项目中的模块加载机制，进行加载（未使用模块加载机制则直接使用全局变量：\`fdutils\`）；

2. npm 包

\`\`\` bash
$ npm i fdutils
\`\`\`

## 支持的API

`;

function _create(){
	let _root = path.resolve(__dirname, '../src/');
	let _docRoot = path.resolve(__dirname, '../docs/');
	let _apiArr = [];
	let _now = Date.now();

	console.log('开始遍历源文件');

	function _walk(_path){
		let _dirArr = fs.readdirSync(_path);

		_dirArr.forEach(function( file ) {
	  	// '_'开头的文件夹和文件，为私有变量，都不做任何处理
	  	if(file.indexOf('_') === 0){
	  		return;
	  	}

	    let _dir = path.resolve(_path, file);
	    let stat = fs.statSync( _dir );

	    if (stat && stat.isDirectory()) {
	      _walk( _dir );
	    } else {
	     	_createApiArr(_dir, file); 
	    }
	  });
	}

	function _createApiArr(_dir, file){
		let content = fs.readFileSync(_dir, 'utf-8');
		let info = {};
		let docName = file.replace('js', 'md');
		let stat = null;

		// 获取method名称
		content.replace(/\@method\s+([^\n\t]+)/, function(p1, p2){
			info.method = p2;
		});
		// 获取version名称
		content.replace(/\@since\s+version\s+([^\n\t]+)/, function(p1, p2){
			info.version = p2;
		});
		// 获取desc名称
		content.replace(/\@desc\s+([^\n\t]+)/, function(p1, p2){
			info.desc = p2;
		});

		// 进行错误过滤
		if(!info.method){
			return;
		}

		try{
			stat = fs.statSync( path.resolve(_docRoot, docName) );
		} catch (e){}

		// 根据是否有文档，生成不同的跳转链接
		if (stat){
			_apiArr.push('- ['+info.method+'](./docs/'+docName+'): (v:\`'+info.version+'\`) '+ info.desc);
		} else {
			_apiArr.push(`- \`${info.method}\`: (v:\`${info.version}\`) ${info.desc}`);
		}
	}

  _walk(_root);
  console.log('结束遍历源文件，开始生成文件：'+(Date.now() - _now)+'ms');

	fs.writeFile(
		path.resolve(__dirname, '../README.md'), 
		`${readmeTxt}${_apiArr.join('\n')}\n\n\n`,
		{flag:"w"}, 
		function(err, data){
	    if(err){
	        console.log("writeFile file error");
	        return false;
	    }

		  console.log('结束遍历源文件，开始生成文件：'+(Date.now() - _now)+'ms');
	});
}

// 开始执行
_create();


