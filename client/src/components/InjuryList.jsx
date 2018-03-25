import React from 'react';


const InjuryList = (props) => (
        <ul>
          {props.players.map(function(player, index) {
            return <li key={index}>

                      {player.player.FirstName} {player.player.lastName} {player.team.name} {player.injury}

                   </li>
              }
            )}
        </ul>)



export default InjuryList;