import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase"; // ✅ Correct path
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful!");
      navigate("/login"); // ✅ Redirect to login
    } catch (error) {
      console.error("Signup error:", error);
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered.");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email format.");
      } else if (error.code === "auth/weak-password") {
        alert("Password should be at least 6 characters.");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit">Signup</button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Signup;
