import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import Comment from './Comment'
import CommentCreate from './CommentCreate'

class Comments extends Component {
  constructor (props) {
    super(props)

    const { comments } = this.props.question

    this.state = {
      comments
    }
    console.log(this.state)
  }

  componentDidMount = () => { }

  createComment = createdComment => {
    const comments = this.state.comments
    comments.push(createdComment)
    this.setState({ comments })
  }

  render () {
    const { user, alert, question } = this.props
    const { comments } = this.state

    return (
      <Fragment>
        <h1>Comments?????</h1>

        <CommentCreate
          user={user}
          alert={alert}
          questionID={question.id}
          createComment={this.createComment}/>

        {comments
          ? comments.map((comment, index) => {
            return <Comment
              key={index}
              comment={comment}
              user={user}
              alert={alert}
              questionID={question.id}/>
          })
          : ''}
      </Fragment>
    )
  }
}

export default withRouter(Comments)
