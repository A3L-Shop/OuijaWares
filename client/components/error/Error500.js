import React from 'react'
import {connect} from 'react-redux'
import {clearError} from '../../store/error'

class Error500 extends React.Component {
  async componentWillUnmount() {
    await this.props.clearError()
  }

  render() {
    return (
      <div>
        <h2>Error code 500</h2>
        <div>There was a system error.</div>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    clearError: () => dispatch(clearError())
  }
}

export default connect(null, mapDispatch)(Error500)
