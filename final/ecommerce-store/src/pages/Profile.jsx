import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfile] = useState(null);

 
useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  console.log("storedUser in Profile:", storedUser);
  if (!storedUser || !storedUser.accessToken) {
    toast.error("You must be logged in");
    navigate("/login");
  } else {
    setProfile(storedUser);
  }
}, [navigate]);




  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out");
    navigate("/login");
  };

  const handleGoToProducts = () => {
    navigate("/products");
  };

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card className="p-4 shadow rounded-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center text-primary mb-4">Profile</h3>

        {profile ? (
          <>
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>First Name:</strong> {profile.firstName}</p>
            <p><strong>Last Name:</strong> {profile.lastName}</p>

            <div className="d-grid gap-2 mt-4">
              <Button variant="primary" onClick={handleGoToProducts}>
                Go to Products
              </Button>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </Card>
    </Container>
  );
}

export default Profile;
