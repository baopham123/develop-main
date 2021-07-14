const Router = require('express-promise-router')
const router = new Router();
const Sequelize = require('sequelize')
const movie = require("../../models/movie");
const { STRING } = require('sequelize');
const sequelize=new Sequelize(process.env.DATABASE_URL ||'postgres://postgres:baolerop@localhost:5432/ltweb2');

router.get('/',async function(req,res){
    var movie =await sequelize.query(`SELECT * FROM movies`, { type:Sequelize.QueryTypes.SELECT}); 
    var film =await sequelize.query(`SELECT * FROM films`, { type:Sequelize.QueryTypes.SELECT});
    var cinema =await sequelize.query(`SELECT * FROM cinemas`, { type:Sequelize.QueryTypes.SELECT});
    res.render('movie.ejs',{page: 'infoCinema', movie,film,cinema }); 
})

router.post('/',async function(req,res){
    const {ID,filmID,cinemaID, DateStart,DateEnd,price} = req.body;
    console.log(ID);
    
    if(ID != "")
    {
        await movie.update(
            {
                filmID: filmID,
                cinemaID: cinemaID,
                DateStart: DateStart,
                DateEnd: DateEnd,
                price: price     
            },
            {
                where:{ id: ID}
            }
        )
    }
    else
    {
        await movie.create(
            {
                filmID: filmID,
                cinemaID: cinemaID,
                DateStart: DateStart,
                DateEnd: DateEnd,
                price: price 
            }
        )
    }
    res.redirect('/admin/movie');
})
router.get('/:id',async function(req,res){
    var IDs = req.params.id;
    IDs = IDs.substring(1,IDs.length-1);
    var lstID = IDs.split(',');
    if(lstID != null || lstID != "")
    {
        for(let i = 0; i < lstID.length ; i++ )
        {
            await sequelize.query(`DELETE FROM movies WHERE id = '${lstID[i]}'`, { type: Sequelize.QueryTypes.DELETE });
        }
    }
    
    res.redirect('/admin/movie');
})
module.exports = router;
