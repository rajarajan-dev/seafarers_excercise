export const generateUniqueId = () =>
  `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
