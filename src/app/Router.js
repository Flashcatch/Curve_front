import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from '../containers/_layout/Layout';
import MainWrapper from './MainWrapper';

import PageSchedule from '../containers/schedule/PageSchedule';
import PageAllPatients from "../containers/all_patients/PageAllPatients";
import PageBlockBookings from "../containers/block_bookings/PageBlockBookings";

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route path='/' component={wrappedRoutes}/>
      </Switch>
    </main>
  </MainWrapper>
);

const wrappedRoutes = () => (
  <div>
    <Layout/>
    <div className='container__wrap'>
        <Route path='/schedule' component={PageSchedule}/>
        <Route path='/block_bookings' component={PageBlockBookings}/>
        <Route path='/all_patients' component={PageAllPatients}/>
    </div>
  </div>
);

export default Router;
