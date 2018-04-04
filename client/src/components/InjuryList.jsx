import React from 'react';
import Table from 'react-bootstrap/lib/Table';

const InjuryList = (props) => (

      <Table>
        <thead>
          <tr>
            <th>PLAYER</th>
            <th>TEAM</th>
            <th>INJURY</th>
          </tr>
        </thead>
        <tbody>
          {props.players.map(function(player, index) {
            return <tr key={index}>

                      <td>{player.player.FirstName} {player.player.LastName}</td>
                      <td>{player.team.Name}</td>
                      <td>{player.injury}</td>

                   </tr>
              }
          )}
        </tbody>
      </Table>
      )



export default InjuryList;