import 'babel-polyfill'

let t = null

function functionVisitor(path) {
  if (path.node.generator) return
  let body = path.node.body.body || path.node.body
  if (typeof body.length !== 'number') { // if it is not array
    body = [body]
  }
  if (body.find(node => node.type === 'ReturnStatement')) return
  body.push(t.returnStatement(body.pop().expression))
  path.traverse({
    FunctionDeclaration: functionVisitor,
    ArrowFunctionExpression: functionVisitor,
  })
}

export default function ({ types }) {
  t = types
  return {
    visitor: {
      FunctionDeclaration: functionVisitor,
      ArrowFunctionExpression: functionVisitor,
    },
  }
}
