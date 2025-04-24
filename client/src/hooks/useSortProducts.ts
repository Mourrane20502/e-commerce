import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: {
    name: string;
  };
}

export const useSortProducts = (products: Product[], sort: string) => {
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products);

  useEffect(() => {
    let result = [...products];

    if (sort === "lowToHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "highToLow") {
      result.sort((a, b) => b.price - a.price);
    } else {
      result = products;
    }

    setSortedProducts(result);
  }, [sort, products]);

  return sortedProducts;
};
