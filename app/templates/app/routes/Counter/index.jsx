import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as ctActions from '../../actions/counter'

const mapStateToProps = state => ({
  ...state.counter,
  ...state.savingProcess,
})

const mapDispatchToProps = dispatch => ({
  increment: bindActionCreators(ctActions.increment, dispatch),
  decrement: bindActionCreators(ctActions.decrement, dispatch),
  saveOnServer: bindActionCreators(ctActions.saveOnServer, dispatch),
  clearError: bindActionCreators(ctActions.clearError, dispatch),
})

@connect(mapStateToProps, mapDispatchToProps)
class Counter extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errmsg: PropTypes.string.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    saveOnServer: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
  }

  increment = () => {
    this.props.increment()
  }

  decrement = () => {
    this.props.decrement()
  }

  saveOnServer = () => {
    this.props.saveOnServer()
  }

  renderSaving() {
    const { isFetching } = this.props

    if (!isFetching) {
      return null
    }

    return <p>Saving...</p>
  }

  renderError() {
    const { errmsg } = this.props

    if (!errmsg) {
      return null
    }

    return <p style={{ backgroundColor: '#eee', textAlign: 'center' }}>{errmsg}</p>
  }

  componentWillMount() {
    this.props.clearError()
  }

  render() {
    const { isFetching } = this.props

    return (
      <div>
        {this.renderSaving()}
        {this.renderError()}
        {this.props.value}
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.saveOnServer}>save</button>
      </div>
    )
  }
}

export default Counter
