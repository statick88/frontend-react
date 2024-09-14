// src/components/ProductList.js
import { useEffect, useState } from 'react';
import axiosInstance from './utils/api';
import { Link } from 'react-router-dom';
import './ProductList.css'; // Importa el CSS para ProductList

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance.get('/productos/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      axiosInstance.delete(`/productos/${id}/`)
        .then(() => {
          setProducts(products.filter(product => product.id !== id));
        })
        .catch(error => {
          console.error("Error al eliminar el producto: ", error.response ? error.response.data : error.message);
        });
    }
  };

  return (
    <div className="container">
      <h1>Lista de Productos</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.nombre}</Link>
            <Link to={`/products/edit/${product.id}`} className="edit">Editar</Link>
            <button onClick={() => handleDelete(product.id)} className="delete">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
