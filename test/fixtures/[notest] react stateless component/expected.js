const Hello = props => {
  const text = 'hello';
  return React.createElement(
    'div',
    null,
    React.createElement(
      'span',
      null,
      text
    )
  );
};
