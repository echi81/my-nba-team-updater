import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import $ from 'jquery';
import InjuryList from './components/InjuryList.jsx';
import TeamSelector from './components/TeamSelector.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    }
  this.getInjuries = this.getInjuries.bind(this);
  }

  getInjuries(team) {
    $.ajax({
      url: 'http://127.0.0.1:1128/myteams',
      type: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      data: {team: team},
      success: (result, status) => {
        console.log(JSON.parse(result));
        let players = JSON.parse(result);
        if (!players.playerinjuries.playerentry) {
          alert('No injuries on chosen team')
        } else {
        this.setState({players: players.playerinjuries.playerentry});
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
      }
    });
  }


  render () {
    return (
            <div>
              <h1>NBA Injury Updater</h1>
                <TeamSelector handleSubmit={this.getInjuries}/>
                <InjuryList players={this.state.players}/>
            </div>
           )
  }
};

ReactDOM.render(<App />, document.getElementById('app'));