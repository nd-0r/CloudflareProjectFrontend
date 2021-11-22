import React from "react";

import { 
	Card, 
	Elevation, 
	Button, 
	Dialog 
} from "@blueprintjs/core";

import { 
	cardText, 
	cardImage,
	cardContent, 
	contentBox, 
	postImage,
	buttonBox,
	votesContainer,
	postTitle,
	postFooter,
	cardOpenContent
} from "../css/post.module.css";

class Post extends React.Component {
  constructor(props) {
		super(props);
		this.state = { 
			votes: props.votes, 
			voted: false,
		  open: false
		};
	}

	submitVotes = async (new_votes) => {
		this.setState({ votes: new_votes });
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 5000);
    
		const base_url = "https://backend.andreworals5548.workers.dev/posts/";
		
		let response;
		try {
		  response = await fetch(
	      base_url + this.props.id + "?votes=" + (new_votes),
		    {signal: controller.signal,
		  	 method: "POST"}
		  );
		} catch (err) {
			this.setState({ votes: this.props.votes });
			return false;
		}

		if (!response.ok) {
			this.setState({ votes: this.props.votes });
			return false;
		}

		return true;
	};

	incrementVotes = () => {
		if (!this.state.voted) {
			let submitted;
		  const new_votes = this.state.votes + 1;
		  submitted = this.submitVotes(new_votes);
			if (submitted) {
				this.setState({ voted: true });
			}
		}
	}

	decrementVotes = () => {
		if (!this.state.voted) {
			let submitted;
		  const new_votes = this.state.votes - 1;
		  if (new_votes >= 0) {
		    submitted = this.submitVotes(new_votes);
		  }
			if (submitted) {
				this.setState({ voted: true });
			}
		}
	}

	toggleOpen = () => {
		console.log("CALLED!!!!");
		this.setState({ open: !this.state.open });
	}

	render() {
		return (
		  <div className={this.props.type ? cardText : cardImage}>
	      <Card 
			    class="bp3-card bp3-interactive" 
			    interactive={true} 
			    elevation={Elevation.TWO}
			    onClick={this.toggleOpen}
			  >
			    <div className={cardContent}>
		  	    <h3 className={postTitle}>{this.props.title}</h3>
			      <div className={contentBox}>
			        {this.props.type ? 
		  	        <p>{this.props.content}</p>
								:
								<img className={postImage} src={this.props.content} alt={this.props.content}/>
							}
			      </div>
			      <div className={postFooter}>
		  	      <p>Posted by {this.props.name} on {this.props.date}</p>
			      </div>
			      <div className={buttonBox}>
			        <Button disabled={this.state.voted} large={true} icon="arrow-up" text="" onClick={this.incrementVotes}/>
			        <div className={votesContainer}>
			          <h1>{this.state.votes}</h1>
			        </div>
			        <Button disabled={this.state.voted} large={true} icon="arrow-down" text="" onClick={this.decrementVotes}/>
			      </div>
			    </div>
		    </Card>
			  <Dialog 
			    isOpen={this.state.open} 
			    onClose={() => this.setState({ open: false })}
			    canEscapeKeyClose={true}
			    canOutsideClickClose={true}
			  >
			    <div className={cardOpenContent}>
		    	  <h3 className={postTitle}>{this.props.title}</h3>
			      <div className={contentBox}>
			        {this.props.type ? 
		    	      <p>{this.props.content}</p>
			  				:
			  				<img className={postImage} src={this.props.content} alt={this.props.content}/>
			  			}
			      </div>
			      <div className={postFooter}>
		    	    <p>Posted by {this.props.name} on {this.props.date}</p>
			      </div>
			      <div className={buttonBox}>
			        <Button disabled={this.state.voted} large={true} icon="arrow-up" text="" onClick={this.incrementVotes}/>
			        <div className={votesContainer}>
			          <h1>{this.state.votes}</h1>
			        </div>
			        <Button disabled={this.state.voted} large={true} icon="arrow-down" text="" onClick={this.decrementVotes}/>
			      </div>
			    </div>
			  </Dialog>
	    </div>

		);
	}
}

export default Post;
