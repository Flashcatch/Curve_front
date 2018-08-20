import React, {PureComponent} from 'react';
import {Container} from 'reactstrap';
import GridPatients from '../Grid/GridPatients'

export default class PageAllPatients extends PureComponent {
  render() {
    return (
      <Container className='dashboard'>
          <GridPatients entity="patients"/>
      </Container>
    )
  }
}

