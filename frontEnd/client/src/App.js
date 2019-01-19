import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './index.css'
import {
  PageHeader,
  Panel
} from 'react-bootstrap'
import {
  getLatestUsers
} from './actions/git-actions'
import Table from './components/UserTable'
import { HeaderWrapper, AppContainer, Body , RowWrapper , ColumnWrapper } from "./containers";
import LineChart from './components/LineChart'
import gitIcon from './github.png'
import liveIcon from './live.svg'
import CountUp from 'react-countup';
import cx from 'classnames'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: null
    }
    this.columns = [
      { 'key': 'login' , 'name' : 'User Name'},
      { 'key': 'type' , 'name' : 'User Type'},
      { 'key': 'avatar_url' , 'name' : 'Avatar'}
    ]
  }

  componentDidMount() {
    this.props.getLatestUsers()
    setInterval(() =>{
      this.props.getLatestUsers()
    },8000)
  } 

  render () {
    const {
      git
    } = this.props

    return (
      <HeaderWrapper>
        <PageHeader className='header'>
          <img
            src={gitIcon}
            height={60}
            alt=''
          />
          <div className='subHeader'>User Count</div>
          <img style ={{paddingLeft:'10px' , paddingBottom:'7px'}}
            src={ liveIcon }
            height={40}
            alt=''
          />
        </PageHeader>
        <AppContainer>
          <Body>
            <Panel className={cx('gitPanel')}>
              <RowWrapper>
                <div>
                  <LineChart/>
                  </div>
                <Panel className={cx('infoCardPanel')}>
                <ColumnWrapper>
                  <span style={{fontSize:'40px', color:'#3c4146', textShadow: '2px 1px darkgrey'}}>
                  +
                  <CountUp  end={git.increment}/>
                  </span>
                  <span style={{fontSize:'27px',color:'steelblue' , letterSpacing:'4px'}}>NEW USERS</span>
                </ColumnWrapper>
                </Panel>
              </RowWrapper>
            </Panel>
            <Panel className={cx('gitPanel')} style={{padding:'15px'}}>
              <Table
                columns={this.columns}
                data={git.data.items||[]}
                colorTopRows = {git.increment}
              />
            </Panel>
          </Body>
        </AppContainer>
       </HeaderWrapper>
    )
  }
}

App.propTypes = {
  getLatestUsers: PropTypes.func
}

const mapStateToProps = ({ git }) => {
  return {
      git
    }
}

export default connect(
  mapStateToProps,
  {
    getLatestUsers
  }
)(App)