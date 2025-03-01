import { useParams, useNavigate } from "react-router-dom"; 
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();
      console.log("API Response Data:", data);

      if (response.ok) {
        toast.success("Password reset successfully! 🎉", { autoClose: 2000 });

        // ✅ Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate("/login");  
        }, 2000);
        
        setNewPassword(""); 
      } else {
        toast.error(data.message || "Something went wrong! ❌", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server error, please try again later! ❌", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default ResetPassword;
