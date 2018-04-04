import React from 'react';


class TeamSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: ''
    }
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      team: e.target.value
    })
  }

  handleSubmit(e) {
     this.props.handleSubmit(this.state.team);
     this.setState({
      team: ''
     });
     e.preventDefault();
  }

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
        Team:
          <input type="text" placeholder="ex. cleveland-cavaliers" value={this.state.team} onChange={this.onChange} />
        </label>
        <input type="submit" value="Find Injuries" />
      </form>
    )
  }
}

export default TeamSelector;
