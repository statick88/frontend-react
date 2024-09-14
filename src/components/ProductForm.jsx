// src/components/ProductForm.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from './utils/api';  // Asegúrate de que la ruta de importación sea correcta
import './ProductForm.css';

const ProductForm = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState(1);  // Campo cantidad predeterminado
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axiosInstance.get(`/productos/${id}/`)
        .then(response => {
          const product = response.data;
          setNombre(product.nombre);
          setPrecio(product.precio);
          setCantidad(product.cantidad);
        })
        .catch(error => {
          console.error("Error al obtener los detalles del producto: ", error);
          setError('Error al obtener los detalles del producto.');
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación de campos (especialmente precios)
    if (isNaN(precio) || isNaN(cantidad) || parseFloat(precio) <= 0 || parseInt(cantidad) <= 0) {
      setError('Por favor, ingrese valores válidos para el precio y la cantidad.');
      return;
    }

    const product = { nombre, precio: parseFloat(precio), cantidad: parseInt(cantidad) };

    if (id) {
      axiosInstance.put(`/productos/${id}/`, product)
        .then(() => {
          navigate(`/products/${id}`);
        })
        .catch(error => {
          console.error("Error al actualizar el producto: ", error.response ? error.response.data : error.message);
          setError(`Error al actualizar el producto: ${error.response ? error.response.data : error.message}`);
        });
    } else {
      axiosInstance.post('/productos/', product)
        .then(() => {
          navigate('/products');
        })
        .catch(error => {
          console.error("Error al crear el producto: ", error.response ? error.response.data : error.message);
          setError(`Error al crear el producto: ${error.response ? error.response.data : error.message}`);
        });
    }
  };

  const handleDelete = () => {
    if (id) {
      axiosInstance.delete(`/productos/${id}/`)
        .then(() => {
          navigate('/products');
        })
        .catch(error => {
          console.error("Error al eliminar el producto: ", error.response ? error.response.data : error.message);
          setError(`Error al eliminar el producto: ${error.response ? error.response.data : error.message}`);
        });
    }
  };

  return (
    <div className="container">
      <h1>{id ? 'Editar Producto' : 'Crear Producto'}</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Precio</label>
          <input
            type="number"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cantidad</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={id ? 'edit' : ''}>{id ? 'Actualizar' : 'Crear'}</button>
        {id && (
          <button type="button" className="delete" onClick={handleDelete}>Eliminar</button>
        )}
      </form>
    </div>
  );
};

export default ProductForm;
