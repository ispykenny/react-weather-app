import React from 'react';

class FormField extends React.Component {
  render() {
    return (
      <>
        <form onSubmit={this.props.handle}>
          <input type="text" id="zip" />
          <button type="submit">Submit</button>
        </form>
      </>
    )
  }
}

export default FormField;