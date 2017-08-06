require("dotenv").config()

const fetch = require("isomorphic-unfetch")
const express = require("express")
const next = require("next")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

const API_KEY = process.env.API_KEY || ""

app.prepare().then(() => {
	const server = express()

	server.get("/fetch/:region/:realm/:name", async (req, res) => {
		let url = `https://${req.params.region}.api.battle.net/wow/character/${req
			.params.realm}/${req.params.name}?apikey=${API_KEY}`

		for (let query in req.query) {
			url += `&${query}=${req.query[query]}`
		}

		try {
			const data = await fetchAsync(url)
			res.status(200).send(data)
		} catch (error) {
			res.status(400).send(error)
		}
	})

	server.get("*", (req, res) => {
		return handle(req, res)
	})

	server.listen(3000, err => {
		if (err) throw err
		console.log("> Ready on http://localhost:3000")
	})
})

const fetchAsync = async url => await (await fetch(url)).json()
