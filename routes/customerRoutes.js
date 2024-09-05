import express from "express";

const router = express.Router();

router.post("/blog", async (req, res) => {
	const { title, content, author } = req.body;
	try {
		const blog = await db("blog").insert({ title, content, author });
		res.status(201).send(blog);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});


export default router; 