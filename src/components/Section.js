class Section {
  constructor({renderer}, container){
    this._renderer = renderer;
    this._container = document.querySelector(container);

  };

  removeItem(item){
    item.remove();
    item = null
  }

  

  addItem(item){
    this._container.prepend(item)
  }

  renderAll(items){
    items.forEach(item => {
      this._renderer(item)
    });
  };

};

export default Section;
