import blogs from './controllers/blogs';

async function routes( app ) {
   app.get( '/blogs', blogs.getNewsList );
   app.get( '/blogs/:id', blogs.getNewsDetail );
}

export default routes