const AbstractAdapter = require('./abstract_adapter');

class CategoryAdapter extends AbstractAdapter {
  adapt(data) {
    return {
      ...this.getAuthor(),
      ...this.getCategory(data),
    };
  }

  getCategory(data) {
    return {
      id : data.id,
      name : data.name,
    };
  }
}

module.exports = CategoryAdapter;