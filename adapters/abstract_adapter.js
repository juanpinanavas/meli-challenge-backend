class AbstractAdapter {
  constructor() {}

  adapt(data) {
    throw new Error("Not implemented");
  }

  getAuthor() {
    return {
      author : {
        name : 'Juan Carlos',
        lastname : 'Piña Navas',
      },     
    };
  }
}

module.exports = AbstractAdapter;
