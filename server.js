const fastify=require('fastify')({logger:true})
const mysql=require('mysql2')
const PORT=3000;

const db=require('./models')

const {User}=require('./models')

fastify.get('/select',(req,reply)=>{
    User.findAll()
    .then((user)=>{
        reply.send(user)
    })
    .catch((err)=>{
        console.log(err);
    })
})
fastify.get('/select/:age',(req,reply)=>{
    const{age}=req.params;
    User.findAll({where:{age: age}})
    .then((user)=>{
        reply.send(user)
    })
    .catch((err)=>{
        console.log(err);
    })
})

fastify.post('/insert',(req,reply)=>{
    User.create({
        firstname:"doss",
        age:23,
    }).catch((err)=>{
        if(err){
            console.log(err);
        }
    })
    reply.send("insert");
})

fastify.delete('/delete/:id',(req,reply)=>{
    const {id}=req.params;
    User.destroy({where:{id: id}});
    reply.send("delete");
})

db.sequelize.sync().then((req)=>{
    fastify.listen({port:PORT},()=>console.log('server running'));
})