import React from "react";
import { 
	Alignment, 
	Alert, 
	FormGroup, 
	InputGroup, 
	Classes, 
	TextArea, 
	Intent, 
	Switch 
} from "@blueprintjs/core";

import "../css/post-creator.css";

const kNameCharLimit = 20;
const kTitleCharLimit = 40;
const kContentCharLimit = 200;

const defaultState = {
			name: "",
			title: "",
			content: "",
			error: false,
			errorText: "",
 		  loading: false,
	    textMode: true
		};

// From https://stackoverflow.com/questions/8834813/regex-to-match-image-url
const url_regex = /^https?:\/\/(?:[a-z\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$/g;

class PostCreator extends React.Component {
	constructor(props) {
		super(props);
		this.state = defaultState;
	}

	reset = () => {
    this.setState(defaultState);
		this.props.toggleOverlay();
	}

	changeMode = () => {
		this.setState({ textMode: !this.state.textMode });
	}

  handleNameChange = response => {
		let text = response.target.value;
    this.setState({ 
			name: text.length <= kNameCharLimit ? text : this.state.name
		});
  };

	handleTitleChange = response => {
		let text = response.target.value;
		this.setState({ 
			title: text.length <= kTitleCharLimit ? text : this.state.title
		});
	};

	handleContentChange = response => {
		let text = response.target.value;
		this.setState({ 
			content: text.length <= kContentCharLimit ? text : this.state.content,
		});
	};

	submitContent = async () => {
		if (!this.state.name || !this.state.title || !this.state.content) {
			this.setState({ error: true, errorText: "Error: fill required fields" });
			return;
		}

		if (!this.state.textMode && !url_regex.test(this.state.content)) {
			this.setState({ error: true, errorText: "Invalid image URL" });
			console.log("HERE");
			return;
		}

		this.setState({ loading: true });
		// from https://stackoverflow.com/questions/46946380/fetch-api-request-timeout
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 5000);

		const post = {
		  id: (new Date()).getTime(),
			type: this.state.textMode,
		  name: this.state.name,
		  title: this.state.title,
		  content: this.state.content,
			date: (new Date()).toDateString(),
	  };

		let response;
		try {
		  response = await fetch(
	      "https://backend.andreworals5548.workers.dev/posts",
		    {signal: controller.signal,
		  	 method: "POST", 
				 // mode: "no-cors",
		     headers: {"Content-Type": "text/plain"},
		  	 body: JSON.stringify(post)}
		  );
		} catch (err) {
			this.setState({ error: true, loading: false, errorText: "Error" });
			return;
		}

		if (!response.ok) {
		  console.log(response.statusText);
		  this.setState({ error: true, errorText: `Error: ${response.statusText}` });
		} else {
			this.props.addPost(post);
		  this.reset();
		}

		clearTimeout(timeoutId);
		this.setState({ loading: false });
	};
  
  render() {
    return (
			<Alert cancelButtonText="Cancel" 
		         confirmButtonText="Submit"
			       loading={this.state.loading}
			       isOpen={this.props.open} 
			       onCancel={this.reset}
			       onConfirm={this.submitContent}
		  > 
			  <div>
			    <Switch 
			      inline={true}
			      style={{position: "relative", left: "50%", marginBottom: "20px", marginLeft: "-10px"}}
			      large={true}
			      checked={this.state.textMode} 
			      label={this.state.textMode ? "Text" : "Image"} 
			      onChange={this.changeMode}
			    />
  		    <FormGroup
  		      label="Name"
  		      inline={true}
  		      labelFor="name-input"
  		      labelInfo="(required)"
  		      helperText={`${this.state.name.length}/${kNameCharLimit}`}
  		    >
  		      <InputGroup
			        id="name-input" 
			        placeholder="Enter your username" 
			        intent={this.state.error ? Intent.DANGER : null}
			        value={this.state.name}
			        onChange={this.handleNameChange}/>
  		    </FormGroup>
  		    <FormGroup
  		      label="Title"
  		      inline={true}
  		      labelFor="title-input"
  		      labelInfo="(required)"
  		      helperText={`${this.state.title.length}/${kTitleCharLimit}`}
  		    >
  		      <InputGroup 
			        id="title-input" 
			        placeholder="Enter post title" 
			        intent={this.state.error ? Intent.DANGER : null}
			        value={this.state.title}
			        onChange={this.handleTitleChange}/>
			    </FormGroup>
  		    <FormGroup
  		      label="Content"
  		      inline={false}
  		      labelFor="content-input"
			      labelInfo="(required)"
  		      helperText={`${this.state.content.length}/${kContentCharLimit}`}
  		    >
  		      <TextArea
			        id="content-input" 
			        growVertically={true}
			        fill={true}
			        placeholder="Your content here!" 
			        intent={this.state.error ? Intent.DANGER : null}
			        value={this.state.content}
			        className={Classes.FILL}
			        onChange={this.handleContentChange}/>
			    </FormGroup>
			    <h5 style={{color: "red"}}>{this.state.errorText}</h5>
        </div>
			</Alert>
  	);
  }

}

export default PostCreator;
