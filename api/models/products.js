const products = (sequelize, DataTypes) => {
  return sequelize.define("products", {
    nama: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};

module.exports = products;
