const SearchAdapter = require('../adapters/search_adapter');
const ItemAdapter = require('../adapters/item_adapter');
const CategoryAdapter = require('../adapters/category_adapter');

class ItemService {
  client;
  searchAdapter;
  itemAdapter;
  categoryAdapter;

  constructor(client) {
    this.client = client;
    this.searchAdapter = new SearchAdapter();
    this.itemAdapter = new ItemAdapter();
    this.categoryAdapter = new CategoryAdapter();
  }

  async searchItem(query) {
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${query}`;
    const data = await this.client.makeRequest(url);
    const search = this.searchAdapter.adapt(data);
    const { name : categoryName } = await this.getCategory(search.max_results_category[0]);
    search.max_results_category = {
      id : search.max_results_category[0],
      name : categoryName,
    }
    return search;
  }

  async getItem(id) {
    const urls = [
      `https://api.mercadolibre.com/items/${id}`,
      `https://api.mercadolibre.com/items/${id}/description`
    ];
    const data = await this.client.makeRequests(urls);
    const item = this.itemAdapter.adapt(data);
    const { name : categoryName } = await this.getCategory(item.category_id);
    return { ...item, category_name : categoryName };
  }

  async getCategory(id) {
    const url = `https://api.mercadolibre.com/categories/${id}`;
    const data = await this.client.makeRequest(url);
    const category = this.categoryAdapter.adapt(data);
    return category;
  }
}

module.exports = ItemService