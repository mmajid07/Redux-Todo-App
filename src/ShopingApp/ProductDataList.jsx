import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartData, setProductData } from "../Redux/ShopingAppSlice";

export const ProductDataList = () => {
  const { productData, search, cartData } = useSelector(
    (state) => state?.ShoppingSlice
  );

  const dispatch = useDispatch();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const AddtoCart = (item) => {
    const isAlreadyInCart = cartData.some(
      (cartItem) => cartItem.productName === item.productName
    ); // Check by unique ID
    if (!isAlreadyInCart) {
      dispatch(setCartData(item));
    } else {
      alert("Data already exist");
    }
  };

  const RemoveData = (item) => {
    console.log("Data Removed");
    const updateData = productData.filter(
      (product) => product.productName != item.productName
    );
    dispatch(setProductData(updateData));

    console.log("Removed Product Data is:", productData);
  };

  console.log("Product Data is:", productData);

  const filteredProductData = Array.isArray(productData)
    ? productData.filter((val) => {
        return (
          val?.productName
            ?.toLowerCase()
            .includes(search?.toLowerCase() || "") || search === ""
        );
      })
    : [];

  return (
    <Box>
      <Stack
        direction={"row"}
        spacing={1}
        mt={1}
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {filteredProductData?.map((item, index) => {
          if (!item || !item?.imagePath || !item?.productName) {
            return null; // Skip rendering if item is invalid
          }

          return (
            <Box key={index}>
              <Card
                sx={{ width: 300, margin: 2, borderRadius: 2, boxShadow: 3 }}
              >
                <CardMedia
                  sx={{
                    height: 140,
                    borderTopLeftRadius: 2,
                    borderTopRightRadius: 2,
                  }}
                  image={item.imagePath || "default-image-path.jpg"}
                  title={item.productName || "No Name"}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", marginBottom: 1 }}
                  >
                    {item.productName || "Unnamed Product"}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", marginBottom: 1 }}
                  >
                    {item.ProductDescription || "No description available"}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "green",
                      marginBottom: 1,
                    }}
                  >
                    {item.productPrice
                      ? formatPrice(item.productPrice)
                      : "Price not available"}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingX: 2,
                  }}
                >
                  <Button
                    onClick={() => AddtoCart(item)}
                    variant="contained"
                    size="small"
                    color="primary"
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      backgroundColor: "purple",
                      color: "white",
                      fontWeight: 600,
                    }}
                  >
                    Add To Cart
                  </Button>
                  <Button
                    onClick={() => RemoveData(item)}
                    variant="outlined"
                    size="small"
                    color="secondary"
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      fontWeight: 600,
                    }}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};
