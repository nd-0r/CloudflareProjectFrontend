import React from 'react';
import { Link } from "@reach/router";
import { Navbar, Alignment} from "@blueprintjs/core";

class Layout extends React.Component {
	constructor({props}) {
		super(props);
	}

	render() {
    return (
	  	<div>
	  	  <Navbar class="bp3-navbar">
	  	    <Navbar.Group align={Alignment.LEFT}>
	  	      <Navbar.Heading>
			        <Link to="/">Media Social</Link>
            </Navbar.Heading>
	  	      <Navbar.Divider/>
	  	    </Navbar.Group>
	  	    <Navbar.Group align={Alignment.RIGHT}>
	  	      <Navbar.Divider/>
	  	      <Navbar.Heading>
			        <Link to="/about">About</Link>
			      </Navbar.Heading>
	  	    </Navbar.Group>
	  	  </Navbar>
	  	  {this.props.children}
	  	</div>
	  );
	}
};

export default Layout;
