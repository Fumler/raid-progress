import Document, { Head, Main, NextScript } from "next/document"
import { ServerStyleSheet } from "styled-components"

export default class MyDocument extends Document {
	render() {
		const sheet = new ServerStyleSheet()
		const main = sheet.collectStyles(<Main />)
		const styleTags = sheet.getStyleElement()
		return (
			<html>
				<Head>
					<title>Raid Progress</title>
					{styleTags}
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
				</Head>
				<body>
					<div className="root">
						{main}
					</div>
					<NextScript />
				</body>
			</html>
		)
	}
}
