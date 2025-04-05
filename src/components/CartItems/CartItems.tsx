import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { CartItem } from "~/models/CartItem";
import { formatAsPrice } from "~/utils/utils";
import AddProductToCart from "~/components/AddProductToCart/AddProductToCart";
import { useAvailableProducts } from "~/queries/products";
import { Product } from "~/models/Product";

type CartItemsProps = {
  items: CartItem[];
  isEditable: boolean;
};

export default function CartItems({ items, isEditable }: CartItemsProps) {
  const { data = [], isLoading } = useAvailableProducts();

  const cartItems = items
    .map((item) => ({
      count: item.count,
      product: data?.find((prod) => item?.product_id === prod?.id) || null,
    }))
    .filter((item) => item.product) as {
    count: number;
    product: Product;
  }[];

  const totalPrice: number = cartItems.reduce(
    (total, item) => item.count * (item.product?.price || 0) + total,
    0
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <List disablePadding>
        {cartItems.map((cartItem) => (
          <ListItem
            sx={{ padding: (theme) => theme.spacing(1, 0) }}
            key={cartItem.product.id}
          >
            {isEditable && <AddProductToCart product={cartItem.product} />}
            <ListItemText
              primary={cartItem.product.title}
              secondary={cartItem.product.description}
            />
            <Typography variant="body2">
              {formatAsPrice(cartItem.product.price)} x {cartItem.count} ={" "}
              {formatAsPrice(cartItem.product.price * cartItem.count)}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ padding: (theme) => theme.spacing(1, 0) }}>
          <ListItemText primary="Shipping" />
          <Typography variant="body2">Free</Typography>
        </ListItem>
        <ListItem sx={{ padding: (theme) => theme.spacing(1, 0) }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {formatAsPrice(totalPrice)}
          </Typography>
        </ListItem>
      </List>
    </>
  );
}
