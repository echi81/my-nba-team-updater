import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import InjuryList from './components/InjuryList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    }

  }

  componentDidMount () {
     $.ajax({
      url: 'http://127.0.0.1:1128/myteams',
      type: 'GET',
      contentType: 'application/x-www-form-urlencoded',
      success: (result, status) => {
        console.log(JSON.parse(result))
        let players = JSON.parse(result);
        this.setState({players: players.playerinjuries.playerentry});
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
                <InjuryList players={this.state.players}/>
            </div>
           )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));