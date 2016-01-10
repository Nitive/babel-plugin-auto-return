class Hello extends React.Component {
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'span',
        { style: { color: 'red' } },
        'hello'
      )
    );
  }
}
