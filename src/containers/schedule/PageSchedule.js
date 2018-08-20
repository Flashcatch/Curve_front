import React, {PureComponent} from 'react';
import {Container} from 'reactstrap';
import GridAppointments from '../Grid/GridAppointments'
// import PanelDate from '../Grid/PanelDate'

export default class PageSchedule extends PureComponent {
  render() {
    return (
      <Container className='dashboard'>
          {/*<PanelDate />*/}
          <GridAppointments entity="appointments"/>
      </Container>
    )
  }
}

