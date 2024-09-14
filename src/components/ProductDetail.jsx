// src/components/ProductDetail.js
import { useEffect, useState } from 'react';
import axiosInstance from './utils/api'; // Asegúrate de que esta ruta sea correcta
import { useParams } from 'react-router-dom'; // Para obtener el id del producto

const ProductDetail = () => {
  const { id } = useParams(); // Extrae el id desde la URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/productos/${id}/`) // Petición para obtener detalles del producto
      .then(response => {
        setProduct(response.data); // Guarda el producto en el estado
      })
      .catch(error => {
        console.error('Error al obtener los detalles del producto:', error);
        setError('Error al obtener los detalles del producto.');
      });
  }, [id]);

  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!product) return <div>Cargando...</div>;

  return (
    <div>
      <h1>{product.nombre}</h1>
      <p>Precio: {product.precio}</p>
      <p>Cantidad: {product.cantidad}</p>
    </div>
  );
};

export default ProductDetail;
