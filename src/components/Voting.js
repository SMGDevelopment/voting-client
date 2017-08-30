import React from 'react'
import {connect} from 'react-redux'
import Winner from './Winner'
import Vote from './Vote'
import * as actionCreators from '../action_creators'

export function Voting(props) {
  return (
    <div className="voting">
      {props.winner ?
        <Winner ref="winner" winner={props.winner} /> :
        <Vote {...props} />
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    hasVoted: state.get('hasVoted'),
    winner: state.get('winner')
  }
}

export const VotingContainer = connect(
  mapStateToProps, actionCreators
)(Voting);
