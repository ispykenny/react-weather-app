import React from 'react';

class Location extends React.Component {
  render() {
    return (
      <>
        <h1>{this.props.location}</h1>
      </>
    )
  }
}

export default Location;