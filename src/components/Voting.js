import React from 'react'
import Winner from './Winner'
import Vote from './Vote'

export default function(props) {
  return (
    <div className="voting">
      {props.winner ?
        <Winner ref="winner" winner={props.winner} /> :
        <Vote {...props} />
      }
    </div>
  )
}
