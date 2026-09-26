export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  inStock: boolean;
  rating: number;
};

export const CATEGORIES = [
  "Eletrônicos",
  "Acessórios",
  "Casa",
  "Escritório",
] as const;

export const products: Array<Product> = [
  {
    id: "1",
    name: "Fone de Ouvido Bluetooth",
    description: "Cancelamento de ruído ativo e até 30h de bateria.",
    price: 499.9,
    category: "Eletrônicos",
    imageUrl: "https://placehold.co/600x400?text=Fone",
    inStock: true,
    rating: 4.7,
  },
  {
    id: "2",
    name: "Teclado Mecânico Compacto",
    description: "Layout 75% com switches hot-swappable e retroiluminação.",
    price: 389.0,
    category: "Acessórios",
    imageUrl: "https://placehold.co/600x400?text=Teclado",
    inStock: true,
    rating: 4.5,
  },
  {
    id: "3",
    name: 'Monitor 27" QHD',
    description: "Painel IPS 144Hz com ajuste de altura e USB-C.",
    price: 1899.0,
    category: "Eletrônicos",
    imageUrl: "https://placehold.co/600x400?text=Monitor",
    inStock: false,
    rating: 4.8,
  },
  {
    id: "4",
    name: "Cadeira Ergonômica",
    description: "Apoio lombar ajustável e encosto em tela respirável.",
    price: 1299.0,
    category: "Escritório",
    imageUrl: "https://placehold.co/600x400?text=Cadeira",
    inStock: true,
    rating: 4.3,
  },
  {
    id: "5",
    name: "Luminária de Mesa LED",
    description: "Três temperaturas de cor e carregamento sem fio na base.",
    price: 229.9,
    category: "Casa",
    imageUrl: "https://placehold.co/600x400?text=Luminaria",
    inStock: true,
    rating: 4.1,
  },
  {
    id: "6",
    name: "Mochila para Notebook",
    description: 'Compartimento acolchoado até 16" e tecido impermeável.',
    price: 279.0,
    category: "Acessórios",
    imageUrl: "https://placehold.co/600x400?text=Mochila",
    inStock: true,
    rating: 4.6,
  },
];

export const formatPrice = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
