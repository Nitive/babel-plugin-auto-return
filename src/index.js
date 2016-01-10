import 'babel-polyfill'

let t = null

function functionVisitor(path) {
  if (path.node.generator) return
  let body = path.node.body.body || path.node.body
  if (typeof body.length !== 'number') { // if it is not array
    body = [body]
    // console.log(path.node.body)
  }
  if (body.find(node => node.type === 'ReturnStatement')) return
  body.push(t.returnStatement(do {
    const last = body.pop()
    // if this is string literal it was append to directives instead of body
    if (!last) {
      const directives = path.node.body.directives
      const value = directives[directives.length - 1].value.value
      directives.pop()

      t.stringLiteral(value)
    } else {
      last.expression
    }
  }))
  path.traverse({ // nested don't work I do not know why
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
