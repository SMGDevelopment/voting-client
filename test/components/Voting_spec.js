import React from 'react'
import ReactDOM from 'react-dom'
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils'
import Voting from '../../src/components/Voting'
import {expect} from 'chai'

//need to use this wrapper because renderIntoDocument cannot be used with STATELESS COMPONENTS
//google shallow rendering
var Wrapper = React.createClass({
  render: function() {
    return (
      <div>{this.props.children}</div>
    )
  }
})

describe('Voting', () => {
  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
      <Wrapper>
        <Voting pair={["Trainspotting", "28 Days Later"]} />
      </Wrapper>
    )
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button')

    expect(buttons.length).to.equal(2)
    expect(buttons[0].textContent).to.equal('Trainspotting')
    expect(buttons[1].textContent).to.equal('28 Days Later')
  })

  it('invokes callback when a button is clicked', () => {
    let votedWith
    const vote = (entry) => votedWith = entry

    const component = renderIntoDocument(
      <Wrapper>
        <Voting pair={["Trainspotting", "28 Days Later"]} vote={vote} />
      </Wrapper>
    )
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button')
    Simulate.click(buttons[0])

    expect(votedWith).to.equal("Trainspotting")
  })

  it('disables buttons when user has voted', () => {
    const component = renderIntoDocument(
      <Wrapper>
        <Voting pair={['Trainspotting', '28 Days Later']}
                hasVoted="Trainspotting" />
      </Wrapper>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button')

    expect(buttons.length).to.equal(2)
    expect(buttons[0].hasAttribute('disabled')).to.equal(true)
    expect(buttons[1].hasAttribute('disabled')).to.equal(true)
  })
})
