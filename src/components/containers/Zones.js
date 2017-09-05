import React, {Component} from 'react'
import { Zone } from '../presentation'
import superagent from 'superagent'
import { APIManager } from '../../utils'
import {CreateZone} from '../presentation'

class Zones extends Component{
	constructor(){
		super()
		this.state = {
			selected: 0,
			list:[]
		}
	}

	componentDidMount(){
		console.log('componentDidMount:')
		APIManager.get('/api/zone',null,(err,response) => {
			console.log('Zones.js, after mounting....');
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
	updateZone(event){
		console.log('updateZone: ');
		let updatedZone = Object.assign({},this.state.zone)
		updatedZone[event.target.id] = event.target.value
		this.setState({
			zone: updatedZone
		})
	}
	addZone(zone){
		let updatedZone = Object.assign({},zone)

		console.log('updatedZone: '+JSON.stringify(updatedZone))
		APIManager.post('/api/zone',updatedZone,(err,response) => {
			if(err){
				alert('ERROR: '+err.message)
				return
			}
			let updatedList = Object.assign([],this.state.list)
			updatedList.push(response.results)

			this.setState({
				list: updatedList
			})
		})
	}
	selectZone(index){
		console.log('Zones.js->selectZone: '+index)
		this.setState({
			selected: index
		})
	}
	render(){
			const listItems = this.state.list.map((zone,i) => {
			let selected = (i==this.state.selected)
				return (

						<li key={i}>
							<Zone index={i} select={this.selectZone.bind(this)} isSelected={selected} currentZone={zone} /></li>
					)
				})
			return (
			<div>
				<ol>
					{listItems}
				</ol>
				<CreateZone onCreate={this.addZone.bind(this)}/>
			</div>
			)
	}
}

export default Zones