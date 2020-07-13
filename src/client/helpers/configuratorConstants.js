export default [
  {
    type: 'extendable', // Розсувна
    defaultDoorsAmount: 2,
    minDoorsAmount: 2,
    maxDoorsAmount: 8,
    minSectionsAmount: 0,
    maxSectionsAmount: 7,
  }, {
    type: 'opening', // Відкриваюча
    minDoorsAmount: 1,
    maxDoorsAmount: 2,
  }, {
    type: 'suspended', // Підвісна
    minDoorsAmount: 1,
    maxDoorsAmount: 8,
  }, {
    type: 'assembling', // Складальна
    minDoorsAmount: 2,
    maxDoorsAmount: 4,
  }, {
    type: 'monorail', // Монорельс
    minDoorsAmount: 1,
    maxDoorsAmount: 8,
  }, {
    type: 'hinged', // Навісна
    minDoorsAmount: 2,
    maxDoorsAmount: 4,
  },
];
