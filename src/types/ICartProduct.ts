export default interface ICartProduct {
  documentId: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  createdAt: string;
  category: string;        // 👈 مجرد string في الكارت
  thumbnail: string;       // 👈 مجرد string (url)
  image: string;
  quantity: number;        // 👈 الكمية جوة الكارت
}



