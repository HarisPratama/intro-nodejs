const { Post, User } = require('../models');

class PostController {

	static async getPosts(req, res) {
		try {
			const getPosts = await Post.findAll({
				include: User
			});

			res.status(200).json({ data: getPosts });
		} catch (error) {
			res.status(400).json({ data: error });
		}
	}

	static async getDetailPost(req, res) {
		try {
			const { id } = req.params;
			const getPosts = await Post.findByPk(id);

			if (getPosts) {
				res.status(200).json({ data: getPosts });
			} else {
				res.status(404).json({ message: 'Data not found' });
			}

		} catch (error) {
			res.status(400).json({ data: error });
		}
	}

	static async createPost(req, res) {
		try {
			const body = {
				title: req.body.title,
				userId: req.body.userId,
				image: req.body.image
			};

			await Post.create(body);

			res.status(200).json({ message: 'Success add Post' });
		} catch (error) {
			res.status(400).json({ message: JSON.stringify(error) });
		}
	}

	static async updatePost(req, res) {
		try {
			const { id } = req.params;
			const { title, desc, image } = req.body;

			const data = {
				title,
				desc,
				image
			};

			const getPosts = await Post.findByPk(id);

			if (getPosts) {
				await Post.update(data, {
					where: { id: id }
				});

				res.status(200).json({ message: `Success update article with id ${ id }` });
			} else {
				res.status(200).json({ message: `Data with id ${ id } does not exist` });
			}

		} catch (error) {
			res.status(400).json({ data: err });
		}
	}

	static async deletePost(req, res) {
		try {
			const { id } = req.params;

			const getDetailPost = await Post.findByPk(id);

			if (getDetailPost) {
				await Post.destroy({
					where: {
						id
					}
				});
				res.status(200).json({ message: `Success delete article with id ${ id }` });
			} else {
				res.status(200).json({ message: 'Data not found' });
			}
		} catch (error) {
			res.status(400).json({ data: error });
		}
	}

}

module.exports = PostController;
