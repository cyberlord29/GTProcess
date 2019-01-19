import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDataGrid from 'react-data-grid'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import cx from 'classnames'

class Table extends Component {
  createRows = (data) => {
    this._rows = data
  }

  rowGetter = (i) => {
    return this._rows[i]
  }

  RowRenderer = ({ renderBaseRow, ...props }) => {
    const highlight = props.idx < this.props.colorTopRows ? "highlight" : 'no';
    return <div className={highlight}>{renderBaseRow(props)}</div>;
  };

  render () {
    this.createRows(this.props.data)
    return (
      <div className={cx('infoCard')}>
        <div>
          <div>
            <ReactDataGrid
              columns   ={this.props.columns}
              rowGetter ={this.rowGetter}
              rowsCount ={this.props.data.length || 0}
              minHeight ={ 500 }
              rowRenderer={this.RowRenderer}
            />
          </div>
        </div>
      </div>
    )
  }
}

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  colorTopRows: PropTypes.number
}

const mapStateToProps = ({ git }) => {
  return {
      git
    }
}

export default withRouter(connect(
  mapStateToProps,
  {
    
  }
)(Table))