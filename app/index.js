const Generator = require('yeoman-generator')
const utils = require('./utils')

module.exports = class extends Generator {
  initializing() {
    this.props = {}
  }

  prompting() {
    return this.prompt([{
      type : 'input',
      name : 'name',
      message : 'Your project name',
      default : this.appname, // Default to current folder name
    }, {
      type : 'input',
      name : 'description',
      message : 'Your project description',
      default : '',
    }]).then((answers) => {
      this.props.name = answers.name
      this.props.description = answers.description
      this.log('app description', answers.description)
    })
  }

  writing() {
    this._writingPackageJSON()
    this._writingBabel()
    this._writingGit()
    this._writingFisConfJS()
    this._writingTpl()
    this._writingOtherFiles()
  }

  _writingPackageJSON() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        description: this.props.description,
      }
    )
  }

  _writingBabel() {
    this.fs.copy(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    )
  }

  _writingGit() {
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    )
  }

  _writingFisConfJS() {
    this.fs.copyTpl(
      this.templatePath('_fis-conf.js'),
      this.destinationPath('fis-conf.js'),
      {
        name: this.props.name,
      }
    )
  }

  _writingTpl() {
    this.fs.copyTpl(
      this.templatePath('app/templates/_index.tpl'),
      this.destinationPath('app/templates/index.tpl'),
      {
        name: this.props.name,
      }
    )
  }

  _writingOtherFiles() {
    const filePaths = utils.read(this.templatePath())

    filePaths.forEach(filePath => {
      this.log(filePath)
      this.fs.copy(
        this.templatePath(filePath),
        this.destinationPath(filePath)
      )
    })
  }

  install() {
    this.installDependencies({
      bower: false,
    })
  }
  
}