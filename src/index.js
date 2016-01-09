let t = null

function expressionVisitor(path) {
  if (this.returnAdded) return
  // path.replaceWith(t.returnStatement(path.node))
  path.replaceWith(t.awaitExpression(path.node))
  this.returnAdded = true
}

function expressionStatementVisitor(path) {
  if (this.returnAdded || path.node !== this.latestNodeInBody) return
  path.traverse({
    Expression: expressionVisitor,
  }, { returnAdded: this.returnAdded })
}

function blockStatementVisitor(path) {
  const functionBody = path.node.body
  const latestNodeInBody = functionBody[functionBody.length - 1]
  path.traverse({
    ExpressionStatement: expressionStatementVisitor,
  }, { latestNodeInBody, returnAdded: false })
}

function functionDeclarationVisitor(path) {
  path.traverse({
    BlockStatement: blockStatementVisitor,
  })
}

export default function ({ types }) {
  t = types
  return {
    visitor: {
      FunctionDeclaration: functionDeclarationVisitor,
    },
  }
}
