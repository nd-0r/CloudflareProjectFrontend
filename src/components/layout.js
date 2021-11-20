import React from 'react';
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
	  	      <Navbar.Heading>Media Social</Navbar.Heading>
	  	      <Navbar.Divider/>
	  	    </Navbar.Group>
	  	  </Navbar>
	  	  {this.props.children}
	  	</div>
	  );
	}
};

export default Layout;
