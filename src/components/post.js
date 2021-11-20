import React from "react";

import { Card, Elevation, Button } from "@blueprintjs/core";

import { 
	card, 
	cardContent, 
	contentBox, 
	buttonBox,
	votesContainer,
	postTitle,
	postFooter
} from "../css/post.module.css";

class Post extends React.Component {
  constructor(props) {
		super(props);
		this.state = { votes: props.votes ? props.votes : 0 };
	}

	incrementVotes = () => {
		this.setState({ votes: this.state.votes + 1 });
	}

	decrementVotes = () => {
		this.setState({ votes: this.state.votes - 1 });
	}

	render() {
		return (
		  <div className={card}>
	      <Card class="bp3-card bp3-interactive" interactive={true} elevation={Elevation.TWO}>
			    <div className={cardContent}>
		  	    <h3 className={postTitle}>{this.props.title}</h3>
			      <div className={contentBox}>
		  	      <p>{this.props.content}</p>
			      </div>
			      <div className={postFooter}>
		  	      <p>Posted by {this.props.name} on {this.props.date}</p>
			      </div>
			      <div className={buttonBox}>
			        <Button large={true} icon="arrow-up" text="" onClick={this.incrementVotes}/>
			        <div className={votesContainer}>
			          <h1>{this.state.votes}</h1>
			        </div>
			        <Button large={true} icon="arrow-down" text="" onClick={this.decrementVotes}/>
			      </div>
			    </div>
		    </Card>
	    </div>
		);
	}
}

export default Post;
