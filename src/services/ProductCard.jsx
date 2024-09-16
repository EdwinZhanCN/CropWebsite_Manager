import React, { useEffect, useRef, useState } from "react";

function ProductCard({ product }) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef();

    // Observe the card element to check if it is in the viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    // Implement the card component, lazy loading.
    return (
        <div ref={cardRef} className="product-card">
            {isVisible && (
                <>
                    <img src={product.url} alt={product.file_name} />
                    <h3>产品名称: {product.product_name}</h3>
                    <p>产品描述: {product.description}</p>
                    <p>产品价格: {product.price}</p>
                    <p>产品数量: {product.quantity}</p>
                </>
            )}
        </div>
    );
}

export default ProductCard;