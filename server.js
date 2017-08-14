require("dotenv").config()

const express = require("express")
const next = require("next")
const cache = require("memory-cache")

const fetchAsync = require("./utils/fetch")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

const API_KEY = process.env.API_KEY || ""

app.prepare().then(() => {
	const server = express()

	server.get("/api/fetch/:region/:realm/:name", async (req, res) => {
		let url = `https://${req.params.region}.api.battle.net/wow/character/${req
			.params.realm}/${req.params.name}?apikey=${API_KEY}`

		for (let query in req.query) {
			url += `&${query}=${req.query[query]}`
		}

		try {
			const data = await fetchAsync(url)
			res.json(data)
		} catch (error) {
			res.status(400).send(error)
		}
	})

	server.get("/api/status/:region", async (req, res) => {
		for (let key of cache.keys()) {
			if (key === req.params.region) {
				const data = cache.get(req.params.region)
				console.log("Got data from cache!")

				res.json(data)
				return
			}
		}

		let url = `https://${req.params
			.region}.api.battle.net/wow/realm/status?apikey=${API_KEY}`

		try {
			const data = await fetchAsync(url)
			const result = parseRealmStatus(data)
			console.log("Got data from API!")
			cache.put(req.params.region, result, 2147483640)

			res.json(result)
		} catch (error) {
			res.status(400).send(error)
		}
	})

	server.get("/:region/:realm/:name", (req, res) => {
		return app.render(req, res, "/character", req.query)
	})

	server.get("*", (req, res) => {
		return handle(req, res)
	})

	server.listen(3000, err => {
		if (err) throw err
		console.log("> Ready on http://localhost:3000")
	})
})

const parseRealmStatus = data => {
	const result = []

	for (let realm of data.realms) {
		result.push(realm.name)
	}

	return result
}
