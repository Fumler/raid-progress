import React from "react"
import Styled from "styled-components"

import Layout from "../components/Layout"

const Welcome = Styled.h1`
  font-size: 100px;
  color: palevioletred;
`

export default () =>
	<Layout>
		<Welcome>hELLO</Welcome>
	</Layout>
