export const emptyDoor = {
  sequenceNumber: null,
  mainSection: {
    filling: {}, // Материал наполнения
    isDoorLatchMechanismOn: {},
    doorLatchMechanism: {}, // Доводчик двери
    doorLatchMechanismPosition: {},
    sectionsAmount: { value: 0 },
    isDoorAssemblingOn: {}, // Сборка двери
    directionOfSections: { // Направление разделения на секции
      value: 'horizontal',
    },
    connectingProfile: {}, // Соеденительный профиль
  },
  sections: [],
};

export const emptySection = {
  sequenceNumber: null,
  visibleHeight: { value: 1 },
  visibleWidth: { value: 1 },
  filling: {}, // Материал наполнения
  texture: { value: 'vertical' },
};
