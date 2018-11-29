module.exports = function(sequelize, DataTypes) {
  var inventory = sequelize.define("inventory", {
    product_name: {
        type: DataTypes.STRING,
        notNull: true
      },
    description: {
        type: DataTypes.TEXT,
        notNull: true
      },
    received_date: {
      type: DataTypes.DATE,
      notNull: true
      },
    requested_sale_price: {
      type: DataTypes.DECIMAL(5,2),
      notNull: true
      },
    sold_at_price: {
      type: DataTypes.DECIMAL(5, 2)
      //not NOT NULL
      },
    sold_date: {
      type: DataTypes.DATE
      },
    commision_rate: {
      type: DataTypes.FLOAT,
      notNull: true
      },
    consignor_paid_checkbox: {
      type: DataTypes.BOOLEAN,
      notNull: true
      },
    consignor_user_id: {
      type: DataTypes.INT,
      notNull: true
      }, 
    }, 
    {
      timestamps: false
    }
);

    inventory.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    inventory.hasOne(models.purchase_orders, {
      foreignKey: {
        allowNull: false
      }
    });
  };
    return inventory;
};

//   -- inventory table
// CREATE TABLE inventory
// (
// 	id int NOT NULL AUTO_INCREMENT,
// 	product_name varchar(300) NOT NULL,
//     product_description varchar(300) NOT NULL,
//     quantity int NOT NULL, 
//     received_date DATE NOT NULL, 
//     requested_sales_price int NOT NULL,
//     sold_at_price int, 
//     date_sold DATE, 
//     commission_rate DECIMAL(5,2),
//     consignor_paid_checkbox BOOLEAN,
//     consignor_user_id int NOT NULL, 
// 	PRIMARY KEY (id)
//     -- FOREIGN KEY (consignor_user_id) REFERENCES purchase_orders(related_purchase_order_detail)
// );