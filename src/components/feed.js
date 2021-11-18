import React from "react";
import { Link } from "@reach/router";

class Feed extends React.Component {
	constructor(props) {
		super(props);
		this.state = { posts: [] };
	}

  async componentDidMount() {
			const response = await fetch(
				"https://backend.andreworals5548.workers.dev/posts",
				{method: "GET", 
				 headers: {"Content-Type": "application/json"}, 
				 mode: 'no-cors'}
		  );
		  const content = await response.json();
		  console.log("DONE");
		  console.log(content);
			this.setState({ posts: content });
	}

	render() {
    return (
			<div class="feed">
			{this.state.posts.map((post) => (
				<div class="post">
				  <h1>{post.title}</h1>
					<h2>{post.name}</h2>
					<body>{post.content}</body>
			  </div>
			))}
			</div>
		);
	}
}

export default Feed;
