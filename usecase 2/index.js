//generate a react app that has three side by side components, first representing accounts assigned to the user, second representing prospects 
//the user is handling and thrid reresenting the user's calendar. Application shoud show user's name, his profile, anme and email address in the header.
//also show a logout button. 

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Accounts from './components/Accounts';
import Prospects from './components/Prospects';
import Calendar from './components/Calendar';

function App() {
  const [user, setUser] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [prospects, setProspects] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch user data from API and set to state
    fetch('/api/user')
      .then(res => res.json())
      .then(data => setUser(data));

    // Fetch accounts data from API and set to state
    fetch('/api/accounts')
      .then(res => res.json())
      .then(data => setAccounts(data));

    // Fetch prospects data from API and set to state
    fetch('/api/prospects')
      .then(res => res.json())
      .then(data => setProspects(data));

    // Fetch events data from API and set to state
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  return (
    <Router>
      <div className="App">
        <header>
          <div className="user-profile">
            <img src={user.profilePic} alt={user.name} />
            <div className="user-details">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          </div>
          <Link to="/login" className="logout-button">Logout</Link>
        </header>
        <div className="main">
          <Switch>
            <Route path="/" exact>
              <div className="dashboard">
                <Accounts accounts={accounts} />
                <Prospects prospects={prospects} />
                <Calendar events={events} />
              </div>
            </Route>
            <Route path="/profile">
              <UserProfile user={user} />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
