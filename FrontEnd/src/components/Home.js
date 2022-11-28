import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Grid from "@mui/material/Grid";

import { styled } from "@mui/material/styles";
import { Card, Box } from "@mui/material";
import Container from "@mui/material/Container";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Rating from "@mui/material/Rating";

const Home = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const loggedInn = JSON.parse(localStorage?.getItem("email"));
  const registerData = gql`
    query ExampleQuery {
      Products {
        category
        description
        id
        image
        price
        rating {
          count
          rate
        }
        title
      }
    }
  `;
  console.log(products);
  const { loading, error, data } = useQuery(registerData);
  // (data?.Products);
  useEffect(() => {
    if (!loggedInn) {
      navigate("/login");
    } else {
      setProducts(data?.Products);
    }
  }, [data]);
  return (
    <div>
      <Container sx={{ mt: 2 }}>
        <Grid
          display="flex"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <h5>
            <b>{loggedInn}</b>
          </h5>
          <Box>
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/addProduct");
              }}
            >
              Add Product
            </button>
            <button
              style={{ marginLeft: "10px" }}
              className="btn btn-primary"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              LogOut
            </button>
          </Box>
        </Grid>
      </Container>
      <Container>
        <Grid display="flex" flexWrap="wrap" justifyContent="center">
          {products?.map((product) => {
            return (
              <Card
                id={product.id}
                sx={{ maxWidth: 345, m: 2, cursor: "pointer" }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title="Shrimp and Chorizo Paella"
                  subheader="September 14, 2016"
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={product?.image}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {product?.title}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={product?.id} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>Price: {product?.price}</Typography>
                    <Typography paragraph>
                      Rating:{" "}
                      <Rating
                        name="read-only"
                        value={product?.rating?.rate}
                        readOnly
                      />
                    </Typography>
                    <Typography paragraph>Price: {product?.price}</Typography>
                    <Typography paragraph>
                      category: {product?.category}
                    </Typography>
                    <Typography paragraph>{product?.description}</Typography>
                  </CardContent>
                </Collapse>
              </Card>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
