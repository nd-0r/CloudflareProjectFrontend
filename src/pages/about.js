import React from "react";

import { Card, Dialog } from "@blueprintjs/core";

import Layout from "../components/layout.js";

import { aboutContainer } from "../css/about.module.css";

const About = () => {
  return (
    <Layout>
		  <Card className={aboutContainer}>
		    <h2>Cloudflare Recruiting Project</h2>
		    <p>
		      This is a fun little React project I made using <a href="https://pages.cloudflare.com/">Cloudflare Pages</a> and <a href="https://workers.cloudflare.com/">Cloudflare Workers</a>. You can find the source on <a href="https://github.com/nd-0r/CloudflareProject">Github</a>. Thanks for stopping by!
		    <br/>
		    <br/>
		    ~Andrew
		    </p>
		  </Card>
		</Layout>
	);
};

export default About;
