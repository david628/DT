import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
//import Login from '@/views/login';
//import Home from '@/views/home';

const Login = React.lazy(() => import('@/views/Login'));
const Home = React.lazy(() => import('@/views/Home'));
const Layout = React.lazy(() => import('@/components/Layout/MainLayout'));

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route { ...rest } render={
    props => {
      return localStorage.getItem('user') ? <Component { ...props } /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    }
  } />
)
const Routes = () => {
  return (
      <React.Suspense fallback>
        <Switch>
            <Route path="/login" component={ (props) => <Login { ...props } /> }/>
            <PrivateRoute path="/" component={ (props) => <Layout { ...props } /> } />
        </Switch>
      </React.Suspense>
  );
}
export default Routes;
