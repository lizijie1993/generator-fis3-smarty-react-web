/**
 * @file        fis3 config
 * @namespace   <%=name%>
 */
const fs = require('fs')

const packConf = require('./fis_conf/pack.js')
// 部署路径、地址配置
const deployConf = require('./fis_conf/deploy.js')
const babelrc = fs.readFileSync('./.babelrc', 'utf8')
const jsonParsedBabelrc = JSON.parse(babelrc)

// 工具函数
const { map } = fis.util

// 使用fis3-smarty解决方案
fis.require('smarty')(fis)

// 采用 commonjs 模块化方案。
fis.hook('commonjs', {
  baseUrl: './app',
  // 可以省略后缀名
  extList: ['.js', '.jsx']
})

// 支持npm组件生态
fis.unhook('components') // fis3 中预设的是 fis-components，这里不需要，所以先关了。
fis.hook('node_modules') // 使用 fis3-hook-node_modules 插件。

// === 配置属性 ===

// 项目命名空间
fis.set('namespace', "<%=name%>")
// 设置项目源码文件过滤器，下面设置只将app和mock目录下的文件当作源码处理
fis.set('project.files', ['/app/**'])
// 排除一些文件
fis.set('project.ignore', [
  'node_modules/**',
  'output/**',
])
// 作为文本文件而不是二进制文件处理的后缀（附加）
fis.set('project.fileType.text', 'jsx')

// === 公共配置 ===

// babel转码
fis.match('/app/**.{js,jsx}', {
  parser: fis.plugin('babel-6.x', {
    presets: jsonParsedBabelrc.presets,
    plugins: jsonParsedBabelrc.plugins,
    sourceMaps: false
  }),
  preprocessor: [
    fis.plugin('js-require-file', {
      useEmbedWhenSizeLessThan: 0
    }),
    fis.plugin('js-require-css')
  ],
  useSameNameRequire: true, // 同名依赖
  isMod: true,
  rExt: 'js'
})
// mod.js无需模块化包装
fis.match('/app/static/scripts/libs/mod.js', {
  parser: null,
  isMod: false
})
// node_modules下需模块化包装
fis.match('node_modules/**.{js,jsx}', {
  isMod: true
})
// 所有css
fis.match('*.less', {
  parser: fis.plugin('less-2.x'),
  rExt: '.css'
})
// 所有css
fis.match('*.{css,less}', {
  postprocessor: fis.plugin('autoprefixer')
})
// smarty插件编译使用
fis.match('/app/templates/**.tpl', {
  extras: {
    isPage: true
  }
})
// 已优化文件，不再进行二次优化
fis.match('**.min.*', {
  optimizer: null
})

// 这些资源默认不会加入map.json，以及添加CDN前缀，在此添加
fis.match('(*.{woff,ttf,eot,svg,png,jpg,jpeg,gif})', {
  useMap: true,
  url: '/${static}/${namespace}$0',
  release: '/${static}/${namespace}$0'
})

fis.match('::package', {
  packager: fis.plugin('deps-pack', packConf),
  spriter: fis.plugin('csssprites')
})

// === 开发环境配置 ===

// 关闭hash和优化，缩短编译时间
fis.match('*.{js,jsx,less,css,png}', {
  useHash: false,
  optimizer: null
})

fis.match('::image', {
  useHash: false
})

// === 生产环境配置 ===

fis.media('prod')
  .match('*.{less,css}', {
    optimizer: fis.plugin('clean-css'),
    useSprite: true
  })
  .match('*.{js,jsx}', {
    optimizer: fis.plugin('uglify-js')
  })
  .match('*.{js,css,png,jpg,jpeg,gif,ttf,woff,svg}', {
    useHash: true
  })
  .match('*.{jsx,js,less,css,ttf,woff,png,jpg,jpeg,gif,svg}', {
    domain: (function () {
      return [
        // 'CDN domain',
      ]
    })()
  })

// === 发布至测试环境 ===

devDeploy()

function devDeploy() {
  function push(RD, to) {
    return fis.plugin('http-push', {
      receiver: RD.receiver,
      to: RD.root + to
    })
  }

  map(deployConf, function (name, conf) {
    fis.media(name)
      .match('${namespace}-map.json', {
        deploy: push(conf, 'data/smarty')
      })
      .match('/app/**.tpl', {
        deploy: push(conf, '')
      })
      .match('/app/**.{png,jpg,jpeg,gif,ttf,woff}', {
        deploy: push(conf, 'webroot')
      })
      .match('pkg/**', {
        deploy: push(conf, 'webroot')
      })
  })
}
