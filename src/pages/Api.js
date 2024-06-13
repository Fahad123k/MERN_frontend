import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Api = () => {
    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState(8);
    const [loading, setLoading] = useState(false);
    const isInitialMount = useRef(true);

    const getProducts = () => {
        setLoading(true);
        axios.get('https://fakestoreapi.com/products')
            .then((res) => {
                console.log("response", res.data);
                setProducts(res.data.slice(0, limit));
                setLoading(false);
            })
            .catch((error) => {
                console.log("err", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            getProducts();
        }
    }, []);

    useEffect(() => {
        getProducts();
    }, [limit]);

    const loadMore = () => {
        setLimit(prevLimit => prevLimit + 4);
    };

    const handleLoadMore = async () => {
        setLoading(true);
        await loadMore();
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };

    return (
        <div className="p-4 text-center relative">
            
            {loading && (
                <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full z-50">
                    <div className="loader"></div>
                </div>
            )}
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <div className="container grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white">
                {products.map(product => (
                    <div key={product.id} className="p-4 border rounded shadow-sm">
                        <h1 className="text-xl font-semibold mb-3">{product.title}</h1>
                        <div className="flex flex-row justify-evenly">
                            <div className='height-image'>
                                <img src={product.image} alt={product.title} className="image-fixed-height bg-transparent" />
                            </div>
                            <p className="text-lg font-bold text-green-700 mb-2">${product.price}</p>
                        </div>
                        <p className="text-gray-700 mb-2">
                            {product.description.length < 150
                                ? product.description
                                : `${product.description.substring(0, 150)}....`}
                        </p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
                    onClick={handleLoadMore}
                    disabled={loading}
                >
                    <span className={loading ? 'loading-text' : ''}>
                        {loading ? '' : 'Load More'}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Api;
