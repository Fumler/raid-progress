import React from "react"

import Layout from "../components/Layout"

export default class Character extends React.Component {
	static async getInitialProps({ req }) {
		return {
			req,
		}
	}

	render() {
		return (
			<div>
				<p>
					{this.props.req}
				</p>
			</div>
		)
	}
}
