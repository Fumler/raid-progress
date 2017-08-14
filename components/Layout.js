import React from "react"
import Styled, { injectGlobal } from "styled-components"
import { initGA, logPageView } from "../utils/analytics"
import Head from "next/head"

export default class Layout extends React.Component {
	componentDidMount() {
		if (!window.GA_INITIALIZED) {
			initGA()
			window.GA_INITIALIZED = true
		}
		logPageView()
	}
	render() {
		injectGlobal`
			html, body {
				margin: 0;
				background: linear-gradient(to left, rgba(35,26,38,1) 0%, rgba(23,28,51,1) 100%);
				min-height: 100%;
				font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
				font-size: 14px;
				line-height: 24px;
				color: #fff;
			}

			h1 { color: #fff; font-family: 'Helvetica Neue', sans-serif; font-size: 275px; font-weight: bold; letter-spacing: -1px; line-height: 1; text-align: center; }


			h2 { color: #fff; font-family: 'Open Sans', sans-serif; font-size: 30px; font-weight: 300; line-height: 32px; margin: 0 0 72px; text-align: center; }


			p { color: #fff; font-family: 'Helvetica Neue', sans-serif; font-size: 14px; line-height: 24px; margin: 0 0 24px; text-align: justify; text-justify: inter-word; }
		`

		return (
			<div>
				{this.props.children}
			</div>
		)
	}
}
