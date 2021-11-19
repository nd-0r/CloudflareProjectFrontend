import React from 'react';
import { Link } from "@reach/router";
import { Navbar, Alignment, Button } from "@blueprintjs/core";

import PostCreator from "../components/create-post.js";

class Layout extends React.Component {
	constructor({props}) {
		super(props);
		this.state = { overlay: false };
	}

	toggleOverlay = () => {
		this.setState({ overlay: !this.state.overlay });
	}

	render() {
    return (
	  	<div>
	  	  <Navbar class="bp3-navbar">
	  	    <Navbar.Group align={Alignment.LEFT}>
	  	      <Navbar.Heading>Media Social</Navbar.Heading>
	  	      <Navbar.Divider/>
	  	      <Button class="bp3-modern" icon="document" text="Post!" onClick={this.toggleOverlay}/> 
	  	    </Navbar.Group>
	  	  </Navbar>
			  <PostCreator open={this.state.overlay} toggleOverlay={this.toggleOverlay}/>
	  	  {this.props.children}
	  	</div>
	  );
	}
};

export default Layout;
