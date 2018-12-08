module.exports = function (sequelize, DataTypes) {
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
      type: DataTypes.DECIMAL(5, 2),
      notNull: true
    },
    sold_at_price: {
      type: DataTypes.DECIMAL(5, 2)
      //not NOT NULL
    },
    sold_date: {
      type: DataTypes.DATE
    },
    // ERE20181220 - fix typo
    commission_rate: {
      type: DataTypes.FLOAT,
      notNull: true
    },
    consignor_paid_checkbox: {
      type: DataTypes.BOOLEAN,
      notNull: true
    }
  }, {
    timestamps: false,
    // ERE20181129 - I added freeze table name
    freezeTableName: true,
  });
  // ERE20181129 - I removed consignor_user_id above

  inventory.associate = function (models) {
    // create a one to many relationship:  1 purchase order to many Inventory
    // ERE20181129 - change from hasOne to BelongsTo.  The FK will now be on inventory
    inventory.belongsTo(models.purchase_orders, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  // ERE20181129 - I added this relationship. The FK will be on inventory
  inventory.associate = function (models) {
    // We're saying that a inventory should belong to a purchase order
    // An inventory record can not be created without an user 
    // ERE20181130 - I changed this to allNull: false
    inventory.belongsTo(models.users, {
      onDelete: 'cascade',
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