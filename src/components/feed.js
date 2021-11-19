import React from "react";
import { Link } from "@reach/router";
import { Card, Elevation } from "@blueprintjs/core";

import Layout from "../components/layout.js";
import { feed, card } from "../css/feed.module.css";

class Feed extends React.Component {
	constructor(props) {
		super(props);
		this.state = { posts: [] };
	}

  async componentDidMount() {
			const response = await fetch(
				 "https://backend.andreworals5548.workers.dev/posts",
				{method: "GET", 
				 headers: {"Content-Type": "application/json"}}
		  );
		  const content = await response.json();
		  console.log("DONE");
		  console.log(content);
			this.setState({ posts: content });
	}

	render() {
    return (
			<Layout>
			  <div className={feed}>
			  {this.state.posts.map((post) => (
			  	<div className={card}>
			  	  <Card class="bp3-card bp3-interactive" interactive={true} elevation={Elevation.TWO}>
			  	    <h3>{post.title}</h3>
			  	    <p>{post.content}</p>
			  	    <p>Posted by {post.name} on {null}</p>
			  	  </Card>
			  	</div>
			  ))}
			  </div>
			</Layout>
		);
	}
}

export default Feed;
