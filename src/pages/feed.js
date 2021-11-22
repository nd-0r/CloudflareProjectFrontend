import React from "react";
import { Button, Spinner } from "@blueprintjs/core";

import Layout from "../components/layout.js";
import PostCreator from "../components/create-post.js";
import Post from "../components/post.js";
import { feed, postButtonBox, spinnerBox } from "../css/feed.module.css";

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
		  let content = await response.json();
		  content.sort((a, b) => { 
				const a_votes = a.votes ? a.votes : 0;
				const b_votes = b.votes ? b.votes : 0;
				return a_votes < b_votes;
			});
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
			  {this.state.posts.length > 0 ? this.state.posts.map((post) => (
          <Post 
					  id={post.id}
					  type={post.type}
					  name={post.name} 
					  title={post.title} 
					  content={post.content} 
					  date={post.date} 
					  votes={post.votes ? Number(post.votes) : 0}/>))
					:
					<Spinner className={spinnerBox}/>
				}
			  </div>
			  <PostCreator addPost={this.addPost} open={this.state.overlay} toggleOverlay={this.toggleOverlay}/>
			</Layout>
		);
	}
}

export default Feed;
