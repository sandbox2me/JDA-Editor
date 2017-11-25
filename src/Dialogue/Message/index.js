import React from 'react';

export default class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			active: false,
			edit: `✎` /*&#x270E;*/
		}
	}

	componentWillMount() {
		// console.log(this.props.messageCount);
		this.id = this.props.message + '-' + this.props.index;
	}

	// componentWillReceiveProps(nextProps) { // Inefficient as fuck? Updates all
	// 	this.setState({text: nextProps.text});
	// }

	addMessage() {
		this.props.addMessageParent();
	}

	editMessage() {
		console.log(this.state.active)
		if(this.state.active) {
			let val = this.refs.newText.value;
			this.setState({active: false, edit: `✎`});
			this.props.editMessageParent({"segment": this.props.message, "index": this.props.index}, val);
		} else {
			this.setState({active: true, edit: `✔`});
		}
	}

	move(direction) {
		this.state.active && this.setState({active: false, edit: `✎`});
		console.log("Moving segment " + direction);
		this.props.moveMessage(direction, {"segment": this.props.message, "index": this.props.index});
		// setTimeout(()=>{
		// 	this.props.moveMessage({"segment": this.props.message, "index": this.props.index});
		// }, 500)
		
	}

	// moveDown() {
	// 	console.log("Moving segment down");
	// 	this.setState({moving: "down"});
	// 	setTimeout(()=>{
	// 		this.setState({moving: ""})
	// 		this.props.moveDownParent();
	// 	}, 500)
	// }

	delete() {
		let areYouSure = window.confirm("Are you sure you want to delete this segment?");
		if (areYouSure) {
			this.setState({active: false, edit: `✎`});
			this.props.deleteMessageParent();
		} 
	}
	
	render() {
		let textArea;
		if (this.state.active) {
			textArea = <textarea ref="newText" defaultValue={this.props.text}></textarea>
		} else {
			textArea = <p>{this.props.text}</p>
		}

		let subMenuButtons = <button className="btn-block btn-block-delete" onClick={() => this.delete()}>Delete</button>;

		let listItemClasses = () => {
			let activeClasses;
			let animClasses;
			if (this.state.active) {
				activeClasses = "message shadow";
			} else {
				activeClasses = "message"
			}
			if (this.props.anim === -1) {
				animClasses = "moveup"
			} else if (this.props.anim === 1) {
				animClasses ="movedown"
			}
			// console.log([activeClasses, animClasses].join(' '));
			return [activeClasses, animClasses].join(' ');
		}
		return (
			<li id={this.props.message + '-' + this.props.id} className={listItemClasses()}>
				<div className="arrows">
					<button className={
						this.props.index === 0 ?
						"btn-inline btn-inline-default btn-inline-unavailable" :
						"btn-inline btn-inline-default"
					} onClick={() => this.move("up")}>
						▲
					</button>
					<button className={
						this.props.index === this.props.messageCount ?
						"btn-inline btn-inline-default btn-inline-unavailable" :
						"btn-inline btn-inline-default"
					} onClick={() => this.move("down")}>
						▼
					</button>
					<div className="flex-spacer"/>
				</div>
				<div className={this.state.active ? "message-inner message-inner-active" : "message-inner"}>
				<span className="message-details">Index: {this.props.index}, ID: {this.props.message + '-' + this.props.id}</span>
				{textArea}
				{
					this.state.active ? subMenuButtons : ""
						
				}
				</div>
				<div>
					<button className="btn-block btn-block-edit" onClick={() => this.editMessage()}>{this.state.edit}</button>
					<button className="btn-block btn-block-new" onClick={() => this.addMessage()}>+</button>
				</div>
			</li>
		);
	}
}