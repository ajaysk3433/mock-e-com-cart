import { Plus} from 'lucide-react';

const ProductCards = ({products, addToCart}) => {
    return (<main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="h-48 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-6xl">
                        {product.image}
                    </div>
                    <div className="p-4">
                        <h3 className="font-semibold text-lg text-gray-800 mb-2">{product.name}</h3>
                        <p className="text-2xl font-bold text-purple-600 mb-4">${product.price}</p>
                        <button
                            onClick={() => addToCart(product)}
                            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
                        >
                            <Plus size={18} />
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </main>)
}

export default ProductCards