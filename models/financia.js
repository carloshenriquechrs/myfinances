'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Financia extends Model {
    static associate(models) {
      this.belongsTo(models.Categoria,{foreignKey:"categoria_id"});
    }
  }
  Financia.init({
    data: DataTypes.DATEONLY,
    categoria_id: DataTypes.INTEGER,
    titulo: DataTypes.STRING,
    valor: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Financia',
  });
  return Financia;
};