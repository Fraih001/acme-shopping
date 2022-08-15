const app = require('./app');
const { conn, User, Product } = require('./db');

const igdb = require('igdb-api-node').default;

const client = igdb('71n9jotfv4acipnlmuxyy6btvrik4u', '9y3fegv67pshqedo7s191euhphaztj');

const setUp = async()=> {
  try {
    await conn.sync({ force: true });
    await User.create({ username: 'moe', password: 'moe_pw'});

    const zeldaGames = await client
      .fields('name,summary,cover.url,total_rating,release_dates.date,screenshots.*')
      .limit(10)
      .search('zelda')
      .request('http://0.0.0.0:8080/https://api.igdb.com/v4/games');
      // console.log(games.data)
      zeldaGames.data.map(game=>{
        Product.create({name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, releaseDate: `${new Date(game.release_dates[0].date * 1000)}`, rating: `${game.total_rating}`})
     });

    const marioGames = await client
      .fields('name,summary,cover.url,total_rating,release_dates.date,screenshots.*')
      .limit(10)
      .search('mario')
      .request('http://0.0.0.0:8080/https://api.igdb.com/v4/games');
      // console.log(games.data)
      marioGames.data.map(game=>{
        Product.create({name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, releaseDate: `${new Date(game.release_dates[0].date * 1000)}`, rating: `${game.total_rating}`})
    });

    const thisMonthGames1989 = await client
      .fields('name,summary,cover.url,total_rating,release_dates.date,screenshots.*')
      .limit(10)
      .where('release_dates.date < 652165260 & release_dates.date > 649486860& total_rating > 50')
      .request('http://0.0.0.0:8080/https://api.igdb.com/v4/games')
      thisMonthGames1989.data.map(game=>{
        Product.create({name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, releaseDate: `${new Date(game.release_dates[0].date * 1000)}`, rating: `${game.total_rating}`})
    });

    const thisYearsGames1985 = await client
      .fields('name,summary,cover.url,total_rating,release_dates.date,screenshots.*')
      .limit(10)
      .where('release_dates.date < 504853200 & release_dates.date > 473403600 & total_rating > 80')
      .request('http://0.0.0.0:8080/https://api.igdb.com/v4/games')
      thisYearsGames1985.data.map(game=>{
        Product.create({name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, releaseDate: `${new Date(game.release_dates[0].date * 1000)}`, rating: `${game.total_rating}`})
    });

    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

setUp();
