import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Spinner,
} from "react-bootstrap";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Validation schema باستخدام zod
const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be positive"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  thumbnail: z.string().url("Thumbnail must be a valid URL"),
});

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    category: "",
    thumbnail: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = productSchema.safeParse(formData);

    if (!result.success) {
      const msg = result.error.issues[0].message; // ✅ تعديل هنا
      toast.error(msg);
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:3000/products", {
        ...formData,
        price: parseFloat(formData.price),
      });

      toast.success("Product added successfully!");
      navigate("/products");
    } catch (err) {
      toast.error("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className="py-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100 justify-content-center">
        <Col md={10} lg={8} xl={6}>
          <Card className="shadow p-4 rounded-4">
            <h3 className="mb-4 text-center text-primary">Add New Product</h3>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Thumbnail URL</Form.Label>
                <Form.Control
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="d-grid">
                <Button type="submit" disabled={loading} variant="primary">
                  {loading ? <Spinner size="sm" animation="border" /> : "Add Product"}
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddProduct;
