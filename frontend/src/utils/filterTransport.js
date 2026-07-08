export const filterTransport = (data, pickup, drop) => {
  return data.filter(
    (item) =>
      item.pickup.toLowerCase() === pickup.toLowerCase() &&
      item.drop.toLowerCase() === drop.toLowerCase()
  );
};