import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { postComment } from '../../api/CommentsApi'
import messages from '../../data/messages/CommentsMessages'

class CommentCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      exists: true,
      questionID: this.props.question_id,
      text: '',
      anonymous: false
    }
  }

  componentDidMount () {
  }

  onChange = (editorState) => this.setState({ editorState })

  handleChange = event => this.setState({ [event.target.name]: event.target.value })

  onCommentCreate = event => {
    event.preventDefault()

    const { alert, user, question, createComment } = this.props

    postComment(user, this.state, question.id)
      .then(responseData => createComment(responseData.data.comment))
      // .then(() => this.setState({ exists: false }))
      .then(() => this.setState({ text: '' }))
      .then(() => alert(messages.commentCreateSuccess, 'success'))
      .catch(() => {
        this.setState({ text: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const { text, exists } = this.state
    const { id } = this.props.question

    if (!exists) { return '' }

    return (
      <div>
        <form onSubmit={this.onCommentCreate} className="d-flex flex-column bg-primary text-light p-3">
          <label htmlFor="text">Leave a comment for Question {id}</label>
          <textarea
            required
            type="text"
            name="text"
            value={text}
            placeholder="Leave a constructive comment here"
            onChange={this.handleChange}
            className="textarea-body"
          />
          <div>
            <button className="btn btn-warning">Create A Comment</button>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(CommentCreate)
