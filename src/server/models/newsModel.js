import boom from '@hapi/boom';
import mysql from '../config/database';

const blogsModel = {
   newsList: async function ( params ) {
      const connection = await mysql.db.getConnection();
      var res = [ {} ];
      try {
         res = await connection.query( 'SELECT * FROM blogs LIMIT ?, ?', [ params.offset, params.limit ] );
         connection.release();
         return res.length > 0 ? res : null;
      } catch ( err ) {
         console.error( error )
         connection.release();
         return boom.boomify( error )
      }
   },

   newsDetail: async function ( id ) {
      const connection = await mysql.db.getConnection();
      var res = [ {} ];
      try {
         res = await connection.execute( `SELECT * FROM blogs WHERE id = ?`, [ id ] );
         connection.release();
         return res.length > 0 ? res[ 0 ] : null;
      } catch ( err ) {
         console.error( error )
         connection.release();
         return boom.boomify( error )
      }
   },
}

export default blogsModel