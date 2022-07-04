import Grid from '@mui/material/Grid';
import Product from '../Product/Product';
import './ProductList.css';

const ProductList = ({ products, onAddToCart}) => {

  if (!products.length) return <p>Loading...</p>;

  return (
    <main className={'content'}>
      <div className='toolbar' ></div>
      <Grid container justifyContent={'center'} spacing={4}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart}/>
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default ProductList;