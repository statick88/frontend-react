// src/App.jsx
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ProductForm from './components/ProductForm';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/products">Lista de Productos</Link></li>
          <li><Link to="/products/new">Agregar Producto</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/edit/:id" element={<ProductForm />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

const Home = () => (
  <div>
    <h1>CRUD en React con API REST</h1>
    <p>Esta es una aplicación de ejemplo para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en una API REST con React.</p>
    <p>Dirígete a <Link to="/products">Productos</Link> para comenzar.</p>
  </div>
);

export default App;
