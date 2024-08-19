import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
const title = "3D-Druck-Schmiede";
const description = "3d-Druck und 3D Modeling mit 3D-Druck-Schmiede aus Friedrichshafen. Unser Blog für alles rund um den 3D-Druck";

export async function GET(context) {
	// sort by publication date by newest
	const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
	return rss({
		stylesheet: '/rss/styles.xsl',
		title: title,
		description: description,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.slug}/`,
		})),
	});
}


