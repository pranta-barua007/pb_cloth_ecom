import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' render={() => 
            this.props.currentUser ? (
              <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            } 
          />
        </Switch>
      </div>
    );
  }
}


// REDUX code start ----->

// destructuring the user reducer, will get currentUser from it 
  //need the currentUser STATE to render the right page
const mapStateToProps = ({ user }) => (
  {
    currentUser: user.currentUser
  }
)

// dispatch ensures whatever object is passed to it. its going to action obj that it pass to the reducer
  // setCurrentUser is a action object ,which dispatch needs
const mapDispatchToProps = dispatch => (
  {
    setCurrentUser: user => dispatch(setCurrentUser(user))
  }
);

// REDUX code end----->

export default connect(mapStateToProps, mapDispatchToProps)(App);