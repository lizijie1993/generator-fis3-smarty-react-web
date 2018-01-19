// 业务代码打包配置
// 支持多入口打包，以支持按需加载
var bussPackEntries = [
  {
    pkgName: 'pkg/app.js',
    entry: '/app/index.jsx'
  },

  // 按需加载
  // 对于使用了require.async的部分进行单独打包
  {
    pkgName: 'pkg/counter.js',
    entry: [
      '/app/routes/Counter/index.jsx',
    ]
  },
];

// 项目文件打包配置
var bussPkgConf = {}

// 第三方打整个包的配置(node_modules)
var thirdPkgConf = {
  'pkg/third.js': [
    '!/app/**',
  ],

  /*
  若存在无需打入third.js的模块，见注释写法
  假设echarts、echarts-for-react单独打包
  'pkg/third.js': [
      '!/app/**',
      '!/node_modules/echarts/**',
      '!/node_modules/echarts-for-react/**',
  ],
  'pkg/echarts_pkg.js': [
      '!/app/**',
  ],
  */
}

bussPackEntries.forEach(function (conf) {
  if (typeof conf.entry === 'string') {
    conf.entry = [conf.entry]
  }

  conf.entry.forEach(function (et) {
    var deps = et + ':deps';

    Object.keys(thirdPkgConf).forEach(function (key) {
      thirdPkgConf[key].unshift(deps)
    })

    if (!bussPkgConf[conf.pkgName]) {
      bussPkgConf[conf.pkgName] = [];
    }
    bussPkgConf[conf.pkgName].push(et, deps);
  })
})

// 项目文件打包方案
var conf = {
  'pkg/third.css': [
    '/node_modules/**.{less,css}'
  ],
  // 将业务公用内容打包
  'pkg/common.js': [
    '/app/static/**.js',
    '/app/utils/**.js',
    '/app/actions/**.js',
    '/app/constants/**.js',
    '/app/components/common/**.jsx',
  ],
  'pkg/lib.css': '/app/static/**.{less,css}',
  'pkg/app.css': [
    '/app/**.{less,css}'
  ]
}

module.exports = Object.assign({}, conf, thirdPkgConf, bussPkgConf)

