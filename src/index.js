import {
 awaitExpression,
 returnStatement,
} from 'babel-types'

export default function({ types: t }) {
  return {
    visitor: {
      FunctionDeclaration(path) {
        path.traverse({
          BlockStatement(path) {
            const functionBody = path.node.body
            const start = functionBody[functionBody.length - 1]
            let stop = null;
            path.traverse({
              ExpressionStatement(path) {
                if (path.node !== start) return
                path.traverse({
                  Expression(path) {
                    if (stop) return
                    stop = true
                    // path.replaceWith(returnStatement(path.node))
                    path.replaceWith(awaitExpression(path.node))
                  }
                })
              }
            })
          }
        })
      }
    }
  }
}
