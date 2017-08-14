import { PureComponent } from "react"

import Layout from "../components/Layout"

export default class Character extends PureComponent {
	static async getInitialProps({ pathname, asPath }) {
		return {
			pathname,
			asPath,
		}
	}

	render() {
		const vars = this.props.asPath.split("/")
		return (
			<div>
				{vars.map(item => {
					return (
						<p>
							{item}
						</p>
					)
				})}
			</div>
		)
	}
}
