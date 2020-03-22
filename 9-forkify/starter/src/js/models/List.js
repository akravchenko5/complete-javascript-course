import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    };
    this.items.push(item);
    return item;
  }

  deleteItem(id) {
    const index = this.items.findIndex(el => el.id === id);
    // [2,4,8].splice(1,1), returns 4 and mutate array -> [2,8]
    // [2,4,8].slice(1,2), returns 4 and NOT mutate array -> [2,4,8] ~ (1,2) because slice() doesn't take in account last element
    this.items.splice(index, 1);
  }

  updateCount(id, newCount) {
    this.items.find(el => el.id === id).count = newCount;
  }
}
