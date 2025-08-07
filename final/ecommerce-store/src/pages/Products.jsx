import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { toast } from "react-toastify";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

 
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setProducts(res.data);
    } catch (err) {
      setErrorMsg("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure to delete this product?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center text-primary">All Products</h2>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" />
        </div>
      ) : errorMsg ? (
        <Alert variant="danger" className="text-center">
          {errorMsg}
        </Alert>
      ) : (
        <Row className="g-4 justify-content-center">
          {products.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={product.thumbnail}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-center">
                    {product.title}
                  </Card.Title>
                  <Card.Text className="text-center">
                    ${product.price}
                  </Card.Text>
                  <div className="mt-auto d-flex justify-content-between">
                    <Link
                      to={`/product/${product.id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Details
                    </Link>
                    <Link
                      to={`/edit/${product.id}`}
                      className="btn btn-outline-warning btn-sm"
                    >
                      Edit
                    </Link>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Products;
