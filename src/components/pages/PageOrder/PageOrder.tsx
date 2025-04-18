import React from "react";
import { Order, OrderItem } from "~/models/Order";
import axios from "axios";
import { useParams } from "react-router-dom";
import PaperLayout from "~/components/PaperLayout/PaperLayout";
import Typography from "@mui/material/Typography";
import API_PATHS from "~/constants/apiPaths";
import { AvailableProduct, Product } from "~/models/Product";
import ReviewOrder from "~/components/pages/PageCart/components/ReviewOrder";
import { OrderStatus, ORDER_STATUS_FLOW } from "~/constants/order";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Field, Form, Formik, FormikProps } from "formik";
import Grid from "@mui/material/Grid";
import TextField from "~/components/Form/TextField";
import Box from "@mui/material/Box";
import { useQueries } from "react-query";
import { useInvalidateOrder, useUpdateOrderStatus } from "~/queries/orders";

type FormValues = {
  status: OrderStatus;
  comment: string;
};

export default function PageOrder() {
  const { id } = useParams<{ id: string }>();
  const results = useQueries([
    {
      queryKey: ["order", { id }],
      queryFn: async () => {
        const res = await axios.get<Order>(`${API_PATHS.order}/order/${id}`);
        return res.data;
      },
    },
    {
      queryKey: "products",
      queryFn: async () => {
        const res = await axios.get<AvailableProduct[]>(
          `${API_PATHS.bff}/product/available`
        );
        return res.data;
      },
    },
  ]);
  const [
    { data: order, isLoading: isOrderLoading },
    { data: products, isLoading: isProductsLoading },
  ] = results;
  const { mutateAsync: updateOrderStatus } = useUpdateOrderStatus();
  const invalidateOrder = useInvalidateOrder();
  const cartItems = React.useMemo(() => {
    if (order && products) {
      return order.items.map((item: OrderItem) => {
        const product = products.find((p) => p.id === item.product_id);
        if (!product || !product.id) {
          throw new Error("Product not found");
        }
        return { product, count: item.count };
      });
    }
    return [];
  }, [order, products]) as {
    product: Omit<Product, "id"> & { id: string };
    count: number;
  }[];

  if (isOrderLoading || isProductsLoading) return <p>loading...</p>;

  return order ? (
    <PaperLayout>
      <Typography component="h1" variant="h4" align="center">
        Manage order
      </Typography>
      <ReviewOrder
        address={order.delivery}
        items={cartItems.map((item) => ({
          product_id: item.product.id,
          count: item.count,
        }))}
      />
      <Typography variant="h6">Status:</Typography>
      <Typography variant="h6" color="primary">
        {order.status.toUpperCase()}
      </Typography>
      <Typography variant="h6">Change status:</Typography>
      <Box py={2}>
        <Formik
          initialValues={{ status: order.status, comment: "" }}
          enableReinitialize
          onSubmit={(values) =>
            updateOrderStatus(
              { id: order.id, ...values },
              { onSuccess: () => invalidateOrder(order.id) }
            )
          }
        >
          {({ values, dirty, isSubmitting }: FormikProps<FormValues>) => (
            <Form autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    name="status"
                    label="Status"
                    select
                    fullWidth
                    helperText={
                      values.status === OrderStatus.Approved
                        ? "Setting status to APPROVED will decrease products count from stock"
                        : undefined
                    }
                  >
                    {ORDER_STATUS_FLOW.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    name="comment"
                    label="Comment"
                    fullWidth
                    autoComplete="off"
                    multiline
                  />
                </Grid>
                <Grid item container xs={12} justifyContent="space-between">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!dirty || isSubmitting}
                  >
                    Change status
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </PaperLayout>
  ) : null;
}
