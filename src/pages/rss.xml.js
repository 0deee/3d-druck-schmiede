import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
const title = "3D-Druck-Schmiede";
const description = "3d-Druck und 3D Modeling mit 3D-Druck-Schmiede aus Friedrichshafen";

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: title,
		description: description,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.slug}/`,
		})),
	});
}
