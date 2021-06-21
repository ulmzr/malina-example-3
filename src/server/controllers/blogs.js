import blogsModel from '../models/newsModel';

async function getNewsList( request, reply ) {
   var limit = 20;
   var offset = 0;
   var page = 1;

   if ( typeof request.query.limit !== "undefined" ) {
      if ( parseInt( request.query.limit ) > 0 ) {
         limit = parseInt( request.query.limit );
      }
   }

   if ( typeof request.query.page !== "undefined" ) {
      if ( parseInt( request.query.page ) > 0 ) {
         page = parseInt( request.query.page );
         offset = ( page - 1 ) * limit
      }
   }

   var queryParams = {
      offset: offset,
      limit: limit
   }
   const newsData = await blogsModel.newsList( queryParams );
   var response = JSON.stringify( {
      page: page,
      per_page: limit,
      data: newsData[ 0 ]
   } )
   reply.send( response );
}

async function getNewsDetail( request, reply ) {
   const newsData = await blogsModel.newsDetail( request.params.id );
   if ( newsData.length > 0 ) {
      reply.send( JSON.stringify( {
         data: newsData[ 0 ]
      } ) );
   } else {
      reply.send( JSON.stringify( {
         error: "Blogs Not found!"
      } ) );
   }
}

export default {
   getNewsList,
   getNewsDetail
}