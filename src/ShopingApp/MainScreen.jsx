import {
  Avatar,
  Box,
  Button,
  colors,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthData,
  setIsLogin,
  setProductData,
  setSearch,
} from "../Redux/ShopingAppSlice";
import { useNavigate } from "react-router-dom";
import {
  Add,
  Image,
  Logout,
  Person,
  Remove,
  Search,
  ShoppingCartCheckoutOutlined,
} from "@mui/icons-material";
import CustomTextField from "./Components/CustomTextField";
import { ProductDataList } from "./ProductDataList";

export const MainScreen = () => {
  const initialValue = {
    imagePath: "",
    productName: "",
    ProductDescription: "",
    productPrice: "",
  };
  const [products, setProducts] = useState(initialValue);
  const [open, setOpen] = React.useState(false);
  const [total, setTotal] = useState(0);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productData, authData, search, cartData } = useSelector(
    (state) => state?.ShoppingSlice
  );

  useEffect(() => {
    const totalPrice = cartData?.reduce(
      (acc, item) => acc + Number(item.productPrice),
      0
    );
    setTotal(totalPrice);
  }, [cartData]);

  // region Handle onCahnge
  const handleOnchangeValue = (e) => {
    const { name, value } = e.target;
    setProducts((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmitData = (e) => {
    e.preventDefault();

    if (
      !products.imagePath ||
      !products.productName ||
      !products.ProductDescription ||
      !products.productPrice
    ) {
      alert("Please fill in all fields.");
      return;
    }

    dispatch(setProductData(products));
    localStorage.setItem("productDataLocal", JSON.stringify(products));

    setProducts({
      imagePath: "",
      productName: "",
      ProductDescription: "",
      productPrice: "",
    });
  };

  // useEffect(() => {
  //   const local = JSON.parse(localStorage.getItem("productDataLocal"));
  //   if (local) {
  //     dispatch(setProductData(local));
  //   }
  // }, []);
  // region LogOut Function
  const logOut = () => {
    dispatch(setIsLogin(false));
    localStorage.setItem("isLoggedIn", false);
    navigate("/loginScreen");
  };

  useEffect(() => {
    const LocalData = JSON.parse(localStorage.getItem("register"));
    dispatch(setAuthData(LocalData));
  }, []);

  return (
    <Box
      display={"block"}
      alignItems={"flex-start"}
      justifyContent={"space-between"}
      width={"100%"}
      height={"100vh"}
    >
      <Stack
        direction={"row"}
        sx={{
          height: "80px",
          backgroundColor: "purple",
          color: "white",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" pl={"10px"}>
          Welocome, Muhammad Majid
        </Typography>
        <Stack direction={"row"} spacing={1} paddingRight={1}>
          <TextField
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "white",
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px", // Customize the border radius
              },
              borderRadius: "10px",
            }}
          />
          <IconButton onClick={() => setOpen(true)}>
            <ShoppingCartCheckoutOutlined
              fontSize="large"
              sx={{ color: "white" }}
            />
          </IconButton>
          <IconButton onClick={logOut}>
            <Logout fontSize="large" sx={{ color: "white" }} />
          </IconButton>
          <IconButton onClick={() => {}}>
            <Person fontSize="large" sx={{ color: "white" }} />
          </IconButton>
        </Stack>
      </Stack>
      <Stack direction={"row"} spacing={1} sx={{ padding: "10px 10px" }}>
        <CustomTextField
          value={products.imagePath}
          onChange={handleOnchangeValue}
          name={"imagePath"}
          placeholder={"Please Enter image Path..."}
        />
        <CustomTextField
          value={products.productName}
          onChange={handleOnchangeValue}
          name={"productName"}
          placeholder={"Product Name..."}
        />
        <CustomTextField
          value={products.ProductDescription}
          onChange={handleOnchangeValue}
          name={"ProductDescription"}
          placeholder={"Product Description..."}
        />
        <CustomTextField
          value={products.productPrice}
          onChange={handleOnchangeValue}
          name={"productPrice"}
          placeholder={"Product Price..."}
        />
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          onClick={handleSubmitData}
          sx={{
            backgroundColor: "purple",
            color: "white",
            fontWeight: 600,
            borderRadius: "8px",
            textTransform: "none",
            width: "30%",
            height: "55px",
          }}
        >
          Add Product
        </Button>
      </Stack>
      <ProductDataList />
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Shop Now
            </Typography>

            {/* Move sx inside Box */}
            <Box
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {cartData?.map((item, index) => {
                return (
                  <ListItem
                    key={index}
                    sx={{
                      backgroundColor: "#f0f0f0", // Light color
                      borderRadius: "8px", // Border radius for rounded corners
                      marginBottom: "8px", // Space between items
                      padding: "10px", // Padding inside the item for spacing
                      gap: "10px",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ width: 56, height: 56 }}>
                        <img
                          src={item.imagePath}
                          alt="product"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover", // Ensures the image covers the Avatar box
                          }}
                        />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.productName}
                      secondary={
                        <Typography
                          sx={{
                            fontWeight: "bold", // Make the price bold
                            color: "green", // Color the price green
                          }}
                        >
                          ${item.productPrice} {/* Add dollar sign */}
                        </Typography>
                      }
                    />

                    <Stack direction={"row"} spacing={2}>
                      <Add />
                      <Typography
                        sx={{
                          fontWeight: "bold", // Make the price bold
                          color: "green", // Color the price green
                        }}
                      >
                        {" "}
                        {1}
                      </Typography>
                      <Remove />
                    </Stack>
                  </ListItem>
                );
              })}
            </Box>
            <Stack
              direction={"row"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
                variant="contained"
                size="small"
                color="primary"
                sx={{ textTransform: "none", borderRadius: 2, fontWeight: 600 }}
              >
                Total :
              </Typography>
              <Typography
                variant="outlined"
                size="small"
                color="secondary"
                sx={{ textTransform: "none", borderRadius: 2, fontWeight: 600 }}
              >
                ${total}
              </Typography>
            </Stack>
            <Divider orientation="horizontal" sx={{ margin: "10px 0px" }} />
            <Stack
              direction={"row"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Button
                onClick={() => AddtoCart(item)}
                variant="contained"
                size="small"
                color="primary"
                sx={{ textTransform: "none", borderRadius: 2 }}
              >
                Shop Now
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="secondary"
                sx={{ textTransform: "none", borderRadius: 2 }}
              >
                Discard
              </Button>
            </Stack>
          </Box>
        </Modal>
      </div>
    </Box>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  color: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
