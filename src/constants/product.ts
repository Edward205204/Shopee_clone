export const sortBy = {
  createdAt: 'createdAt', // mới nhất
  view: 'view', // phổ biến
  sold: 'sold', // bán chạy
  price: 'price' // giá + dùng kèm với order
} as const;

export const order = {
  desc: 'desc',
  asc: 'asc'
} as const;
