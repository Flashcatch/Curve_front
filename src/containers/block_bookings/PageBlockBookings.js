import React, {PureComponent} from 'react';
import {Container} from 'reactstrap';
import GridBlockBookings from '../Grid/GridBlockBookings'

export default class PageBlockBookings extends PureComponent {
  render() {
    return (
      <Container className='dashboard'>
          <GridBlockBookings entity="blockbookings"/>
      </Container>
    )
  }
}

