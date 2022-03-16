const AbstractAdapter = require('./abstract_adapter');

class SearchAdapter extends AbstractAdapter {
  adapt(data) {
    return {
      ...this.getAuthor(),
      ...this.getCategories(data),
      ...this.getItems(data),
      ...this.getMaxresultsCategory(data),
    };
  }

  getCategories(data) {
    const categories = [];
    data.results.forEach(item => {
      if (!categories.find(category => category === item.category_id)) {
        categories.push(item.category_id);
      }
    });
    return { categories };
  }
  
  getMaxresultsCategory(data) {
    let max_results_category = data.results.map(item => item.category_id).reduce( (acc, val) => {
      acc[val] = (acc[val] || 0 ) + 1;
      return acc;
   },{});
   max_results_category = Object.keys(max_results_category).filter(x => {
    return max_results_category[x] == Math.max.apply(null, Object.values(max_results_category));
  })
    return { max_results_category };
  }

  getItems(data) {
    const items = data.results.map(item => {
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
        state_name : item.address.state_name,
      };
    });
    items.length = 4;
    return { items };
  }
}

module.exports = SearchAdapter;