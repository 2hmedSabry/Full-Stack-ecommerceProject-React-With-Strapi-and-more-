export default interface IProduct {
    documentId: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    createdAt?: string;
    quantity?: number; 
    category: { title: string }[];
    thumbnail: {
      formats: {
        thumbnail: {
          url: string;
        };
      };
    };
    image?: {
        formats: {
          thumbnail: {
            url: string;
          };
        };
      };
  }


 