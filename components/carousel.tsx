"use client";

import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % products.length);
        setIsTransitioning(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[current];
  const price = currentProduct.default_price as Stripe.Price;

  return (
    <Card className="relative overflow-hidden rounded-lg shadow-md border-gray-300">
      {currentProduct.images && currentProduct.images[0] && (
        <div className="relative h-80 w-full">
          <Image
            src={currentProduct.images[0]}
            alt={currentProduct.name}
            fill
            className={`object-cover transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
      )}
      <CardContent className="absolute inset-0 flex flex-col p-4">
        {/* Centered product name */}
        <div className="flex-grow flex items-center justify-center">
          <CardTitle className="text-3xl font-bold text-white text-center drop-shadow-lg">
            {currentProduct.name}
          </CardTitle>
        </div>
        
        {/* Price at bottom left */}
        <div className="self-start bg-black/80 px-4 py-2 rounded-lg">
          {price?.unit_amount ? (
            <div className="flex items-center">
              <span className="text-2xl font-semibold text-white">
                ${(price.unit_amount / 100).toFixed(2)}
              </span>
              {price?.recurring && (
                <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-sm text-white">
                  /{price.recurring.interval}
                </span>
              )}
            </div>
          ) : (
            <span className="text-white text-sm">Price available soon</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};