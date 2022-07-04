import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import './Product.css';

const Product = ({ product, onAddToCart}) => {

  const handleAddToCart = () => onAddToCart(product.id, 1);

  return (
    <Card className={'root'}>
      <CardMedia className={'media'} image={product.image.url} title={product.name} />
      <CardContent>
        <div className={'cardContent'}>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
        <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" component="p" />
      </CardContent>
      <CardActions disableSpacing className={'cardActions'}>
        <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;