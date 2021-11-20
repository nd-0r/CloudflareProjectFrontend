import React from "react";
import { Link } from "@reach/router";
import { Card, Elevation, Button } from "@blueprintjs/core";

import Layout from "./layout.js";
import PostCreator from "./create-post.js";
import { feed, card, postButtonBox } from "../css/feed.module.css";

class Feed extends React.Component {
	constructor(props) {
		super(props);
		this.state = { posts: [], overlay: false };
	}

  async componentDidMount() {
			const response = await fetch(
				 "https://backend.andreworals5548.workers.dev/posts",
				{method: "GET", 
			   // mode: "no-cors",
				 headers: {"Content-Type": "text/plain"}}
		  );
		  const content = await response.json();
			this.setState({ posts: content });
	}

	toggleOverlay = () => {
		this.setState({ overlay: !this.state.overlay });
	}

	addPost = (post) => {
		this.state.posts.push(post);
	}

	render() {
    return (
			<Layout>
			  <div className={feed}>
			    <div className={postButtonBox}>
	  	      <Button large={true} class="bp3-modern" icon="document" text="Post!" onClick={this.toggleOverlay}/> 
			    </div>
			  {this.state.posts.map((post) => (
			  	<div className={card}>
			  	  <Card class="bp3-card bp3-interactive" interactive={true} elevation={Elevation.TWO}>
			  	    <h3>{post.title}</h3>
			  	    <p>{post.content}</p>
			  	    <p>Posted by {post.name} on {post.date}</p>
			  	  </Card>
			  	</div>
			  ))}
			  </div>
			  <PostCreator addPost={this.addPost} open={this.state.overlay} toggleOverlay={this.toggleOverlay}/>
			</Layout>
		);
	}
}

export default Feed;
