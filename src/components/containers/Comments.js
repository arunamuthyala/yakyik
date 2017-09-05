import React, {Component} from 'react'
import { Comment } from '../presentation'
import styles from './styles'
import { APIManager } from '../../utils'
import { CreateComment } from '../presentation'

class Comments extends Component{
	constructor(){
		super()
		this.state = {
			list:[]
		}
	}
	componentDidMount(){
		console.log('componentDidMount:')
		APIManager.get('/api/comment',null,(err,response) => {
			console.log('Comment.js, after mounting....');
			if(err){
				alert('Error: '+err.message)
				return
			}
			console.log('RESULTS: '+JSON.stringify(response))
			//console.log('RESULTS: '+JSON.stringify(response.results))
			this.setState({
				list:response.results
			})
		})
	}
	submitComment(comment){
		console.log('submitComment: '+JSON.stringify(comment))
		//let updatedComment = Object.assign({},this.state.comment)
		let updatedComment = Object.assign({},comment)
		APIManager.post('/api/comment',updatedComment,(err,response) => {
			if(err){
				alert(err)
				return
			}
			console.log('Later: '+JSON.stringify(response))
			let updatedList = Object.assign([],this.state.list)
			updatedList.push(response.results)

			this.setState({
				list: updatedList
			})
		})
		
		// let updatedList = Object.assign([],this.state.list)
		// updatedList.push(this.state.comment)

		// this.setState({
		// 	list: updatedList
		// })
	}
	updateUsername(event){
		let updatedComment = Object.assign({},this.state.comment)
		updatedComment['username'] = event.target.value
		this.setState({
				comment: updatedComment
			})
	}
	updateBody(event){
		let updatedComment = Object.assign({},this.state.comment)
		updatedComment['body'] = event.target.value
		this.setState({
			comment: updatedComment
		})
	}
	// updateTimestamp(event){
	// 	let updatedComment = Object.assign({},this.state.comment)
	// 	updatedComment['timestamp'] = event.target.value
	// 	this.setState({
	// 		comment: updatedComment
	// 	})
	// }
	render(){
			const commentList = this.state.list.map((comment,i) => {
				return (
						<li key={i}><Comment currentComment={comment} /></li>
					)
				})
			return (
			<div>
				<h2>Comments: Zone 1</h2>
				<div style={styles.comment.commentsBox}>
				<ul style={styles.comment.commentList}>
					{commentList}
				</ul>
					<CreateComment onCreate={this.submitComment.bind(this)} />
				</div>
			</div>
			)
	}
}

export default Comments