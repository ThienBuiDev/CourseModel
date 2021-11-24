import Course from '../models/Course.js';
import { mongooseToObject } from '../../util/mongoose.js';

class CourseController {
	// [GET] /courses/:slug
	show(req, res, next) {
		const slug = req.params.slug;
		Course.findOne({ slug })
			.then((course) => {
				course
					? res.render('./courses/show', { course: mongooseToObject(course) })
					: res.json({ error: 'Not found' });
			})
			.catch(next);
	}

	// [GET] /courses/create
	create(req, res, next) {
		res.render('./courses/create');
	}

	// [POST] /courses/store
	store(req, res, next) {
		Course.create(
			{
				...req.body,
				slug: req.body.name.replace(/\s+/g, '-').toLowerCase(),
				image: `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDGAmQ1LASjIB0VbARxU_Sa_UHXPA`,
			},
			next
		);
		res.redirect('/');
	}

	// [GET] /courses/:id/edit
	edit(req, res, next) {
		console.log(req.params.id + ' david');
		Course.findOne({ _id: req.params.id })
			.then((course) => {
				course
					? res.render('./courses/edit', { course: mongooseToObject(course) })
					: res.json({ error: 'Not found' });
			})
			.catch(next);
	}

	// [PUT] /courses/:id
	update(req, res, next) {
		Course.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
			.then((course) => {
				course ? res.redirect(`/me/stored/courses`) : res.json({ error: 'Not found' });
			})
			.catch(next);
	}

	// [DELETE] /courses/:id
	destroy(req, res, next) {
		Course.findOneAndDelete({ _id: req.params.id }).then(() =>
			res.redirect(`back`)
		);
	}
}
export default new CourseController();
