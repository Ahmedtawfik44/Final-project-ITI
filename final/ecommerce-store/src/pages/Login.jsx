import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { z } from "zod";
import { toast } from "react-toastify";
import axios from "axios";

const loginSchema = z.object({
  username: z.string().min(3, "Username is required"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "emilys",
    password: "emilyspass",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = loginSchema.safeParse(form);

    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    console.log("Form data:", form);


    try {
      setLoading(true);
      const res = await axios.post(
        "https://dummyjson.com/auth/login",
        form, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      
      localStorage.setItem("user", JSON.stringify(res.data));

      toast.success("Login successful!");
      navigate("/profile");
    } catch (err) {
      toast.error("Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <Card
        style={{ width: "100%", maxWidth: "400px" }}
        className="p-4 shadow border-0 rounded-4"
      >
        <h3 className="mb-4 text-center text-primary">Login</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={form.username}
              onChange={handleChange}
              size="lg"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={form.password}
              onChange={handleChange}
              size="lg"
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit" size="lg" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Login;



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Form, Button, Card } from "react-bootstrap";
// import { z } from "zod";
// import { toast } from "react-toastify";

// const loginSchema = z.object({
//   username: z.string().min(3, "Username is required"),
//   password: z.string().min(4, "Password must be at least 4 characters"),
// });

// function Login() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     username: "kminchelle",
//     password: "0lelplR",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   const validation = loginSchema.safeParse(form);
//   if (!validation.success) {
//     toast.error(validation.error.errors[0].message);
//     return;
//   }

//   console.log("Sending body:", JSON.stringify(form));

//   try {
//     setLoading(true);
//     const response = await fetch('https://dummyjson.com/auth/login', {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await response.json();

//     console.log("Response data:", data);

//     if (!response.ok) throw new Error(data.message || "Login failed");

//     localStorage.setItem("user", JSON.stringify(data));
//     toast.success("Login successful!");
//     navigate("/profile");
//   } catch (error) {
//     toast.error(error.message);
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <div
//       className="d-flex justify-content-center align-items-center"
//       style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
//     >
//       <Card
//         style={{ width: "100%", maxWidth: "400px" }}
//         className="p-4 shadow border-0 rounded-4"
//       >
//         <h3 className="mb-4 text-center text-primary">Login</h3>

//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>Username</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter username"
//               name="username"
//               value={form.username}
//               onChange={handleChange}
//               size="lg"
//             />
//           </Form.Group>

//           <Form.Group className="mb-4">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Enter password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               size="lg"
//             />
//           </Form.Group>

//           <div className="d-grid">
//             <Button variant="primary" type="submit" size="lg" disabled={loading}>
//               {loading ? "Logging in..." : "Login"}
//             </Button>
//           </div>
//         </Form>
//       </Card>
//     </div>
//   );
// }

// export default Login;

