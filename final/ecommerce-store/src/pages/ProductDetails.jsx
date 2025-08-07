import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setErrorMsg("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (errorMsg) {
    return <Alert variant="danger" className="text-center mt-5">{errorMsg}</Alert>;
  }

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card style={{ maxWidth: "600px", width: "100%" }} className="shadow p-4 rounded-4">
        <Card.Img
          src={product.thumbnail}
          alt={product.title}
          style={{ height: "300px", objectFit: "cover" }}
          className="mb-4 rounded"
        />
        <Card.Title className="text-primary">{product.title}</Card.Title>
        <Card.Text><strong>Description:</strong> {product.description}</Card.Text>
        <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>
        <Card.Text><strong>Brand:</strong> {product.brand}</Card.Text>
        <Card.Text><strong>Category:</strong> {product.category}</Card.Text>

        <Link to="/products" className="btn btn-outline-primary mt-3">
          Back to Products
        </Link>
      </Card>
    </Container>
  );
}

export default ProductDetails;
