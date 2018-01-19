import React from 'react'

import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div id="page-404-1" className="panda-wrapper panda-404">
      <div className="panda-content page-404">
        <header>
          <div className="logo-pd-404"><img src="../../static/images/logo-pd-404.png" alt="" /></div>
          <div className="dot" />
          <div className="logo-panda"><img src="../../static/images/logo-pd.png" alt="" /></div>
        </header>
        <h2 className="rs title-404">OH, SHIT :(</h2>
        <p className="rs">请联系系统管理员，或者您可以访问以下链接：</p>
        <nav className="panda-menu">
          <ul id="menu" className="rs">
            <li><a href="/">首页</a></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
