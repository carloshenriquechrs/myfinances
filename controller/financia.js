const sequelize = require('sequelize');
const model = require('../models');
const financia = model.Financia;
const Op = sequelize.Op;

module.exports = {
    async create(request,response){
        try{
            const{
                data,
                categoria_id,
                titulo,
                valor
            } = request.body

            const Financia = await financia.create({
                data,
                categoria_id,
                titulo,
                valor
            });

            return response.json({msg:"Financia Cadastrada com sucesso!"})

        }catch(error){
            return response.json({msg: "Não foi possível cadastrar" + error})
        }
    },
    async update(request, response){
        try{
            const {id} = request.params;
            
            const{
                data,
                categoria_id,
                titulo,
                valor
            } = request.body

            const Financia = await financia.update({
                data,
                categoria_id,
                titulo,
                valor
            },{where:{id}});

            return response.json({msg:"Financia Alterada com sucesso!"});

        }catch(error){
            return response.json({msg:"Não foi possivel alterar" + error});
        }
    },

    async findAll(request, response){
        try {
            const {page} = request.params;
            const limite = 5;

            const Financia = await financia.findAndCountAll({
                order: [
                    ['data','ASC']
                ],
                include:{
                    all:true
                },  
                limit:limite,
                offset:parseInt(page)
            }) 

            return response.json(Financia);

        }catch(error){
            return response.json("Erro ao listar" + error);
        }
    },

    async findAllDate(request, response){
        try {
            const {page, dataInicial, dataFinal} = request.params;
            const limite = 5;

            const Financia = await financia.findAndCountAll({
                limit:limite,
                offset:parseInt(page),
                where:{
                    data:{
                        [Op.gte]: dataInicial,
                        [Op.lte]: dataFinal 
                    }
                }
            });

            return response.json(Financia);

        }catch(error){
            return response.json("Erro ao listar" + error);
        }
    },

    async delete(request, response){
        try{
            const {id} = request.params
            const Financia = await financia.destroy({
                where: {
                    id: id
                }
            });

            return response.json({msg: "Excluindo com sucesso"});

        }catch(error){
            return response.json({msg: "Erro ao excluir" + error});
        }
    },

    async findById(request, response){
        try{
            const {id} = request.params;
            var saldo = 0;
            var soma = 0;
            const Financia = await financia.findAll({
                where:{
                    categoria_id: parseInt(id)
                },
                include:{
                    all:true
                }
            });

            if(Financia.length === 0){
                return response.json({saldo});
            }else{
                for(soma of Financia){
                    saldo = saldo + soma.valor
                }
                return response.json({ saldo });
            }

        }catch(error){
            return response.json("Erro ao lista Financias por categoria" + error);    
        }
    }
    

}