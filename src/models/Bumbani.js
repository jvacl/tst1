const bumbaniCollection = [
  { id: 1, name: "Rumíček", volume: 0.7 },
  { id: 2, name: "Kouzelný gin", volume: 1 },
  { id: 3, name: "Ouzíčko", volume: 0.5 }
];

// TODO predelat na databazi

module.exports = {
  getList: () => bumbaniCollection,
  getById: id => {
    const document = bumbaniCollection.find(
      item => item.id.toString() === id.toString()
    );
    return document;
  },
  crate: () => {},
  update: () => {},
  remove: () => {}
};
