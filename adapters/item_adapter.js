const AbstractAdapter = require('./abstract_adapter');

class ItemAdapter extends AbstractAdapter {
  adapt(data) {
    return {
      ...this.getAuthor(),
      ...this.getItem(data),
    };
  }

  getItem(data) {
    const item = data[0];
    const description = data[1];
    return {
      id : item.id,
      title : item.title,
      price : {
        currency : item.currency_id,
        amount : item.price,
        decimals : 0,
      },
      picture : item.thumbnail,
      condition : item.condition,
      free_shipping : item.shipping.free_shipping,
      description : description.plain_text,
      sold_quantity : item.sold_quantity,
      category_id : item.category_id,
    };
  }
}

module.exports = ItemAdapter;