import React from "react"
import Styled from "styled-components"
import { RadioGroup, Radio } from "react-radio-group"
import Link from "next/link"

import fetchAsync from "../utils/fetch"

import Layout from "../components/Layout"
import StyledSelect from "../components/Select"

export default class Index extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			region: "eu",
			realm: "",
			character: "",
			options: [],
		}
	}

	static async getInitialProps({ req }) {
		const isServer = !!req
		const url = isServer
			? `${req.protocol}://${req.get("host")}/api/status/`
			: `${window.location.protocol}//${window.location.host}/api/status/`

		const eu = isServer
			? await fetchAsync(url + "eu")
			: await fetchFromStorage("eu")
		const us = isServer
			? await fetchAsync(url + "us")
			: await fetchFromStorage("us")

		const realms = {
			eu,
			us,
		}

		return {
			realms,
		}
	}

	componentDidMount = () => {
		if (localStorage.getItem("region")) {
			const options = []
			for (let realm of this.props.realms[localStorage.getItem("region")]) {
				options.push({
					label: realm,
					value: realm,
				})
			}

			this.setState({
				region: localStorage.getItem("region"),
				options,
			})
		}
	}

	fetchFromStorage = async key => {
		if (localStorage.getItem(key)) {
			return JSON.parse(localStorage.getItem(key))
		} else {
			const data = await fetchAsync(url + key)
			localStorage.setItem(key, JSON.stringify(data))
			return data
		}
	}

	handleOnChange = value => {
		this.setState({
			realm: value.value,
		})
	}

	handleRegionSelection = value => {
		const options = []
		for (let realm of this.props.realms[value]) {
			options.push({
				value: realm,
				label: realm,
			})
		}
		this.setState({
			options,
			region: value,
		})
		if ("localStorage" in window) {
			localStorage.setItem("region", value)
		}
	}

	handleCharacterInput = event => {
		this.setState({
			character: event.target.value,
		})
	}

	render() {
		const Wrapper = Styled.div`
			margin: auto;
			width: 50%;
			height: 100vh;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		`

		return (
			<Layout>
				<Wrapper>
					<RadioGroup
						name="region"
						selectedValue={this.state.region}
						onChange={this.handleRegionSelection}
					>
						<Radio value="eu" />EU
						<Radio value="us" />US
					</RadioGroup>

					<StyledSelect
						required={true}
						clearable={false}
						value={this.state.realm}
						onCloseResetsInput={false}
						name="realm"
						options={this.state.options}
						onChange={this.handleOnChange}
						placeholder="Pick a realm..."
						instanceId="123"
					/>

					<input
						type="text"
						placeholder="Enter character name..."
						onChange={this.handleCharacterInput}
					/>
					<Link
						href={`/${this.state.region}/${this.state.realm}/${this.state
							.character}`}
					>
						GO
					</Link>
				</Wrapper>
			</Layout>
		)
	}
}
