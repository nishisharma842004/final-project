// src/pages/Payment.jsx
import { useEffect } from "react";

const Payment = () => {
  // ✅ Load Razorpay script only once
  const loadRazorpayScript = () => {
    if (!document.querySelector("script[src='https://checkout.razorpay.com/v1/checkout.js']")) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  };

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  // ✅ Trigger Razorpay Checkout
  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 10000 }), // Amount in paise (₹100 = 10000 paise)
      });

      const order = await response.json();

      if (!order.id) {
        alert("Order creation failed!");
        return;
      }

      const options = {
        key: "ixnR3PVcmwfRdrnCSNutMTIN", // ✅ Razorpay API Key (PUBLIC)
        amount: order.amount,
        currency: order.currency,
        name: "Kanban Premium Upgrade",
        description: "Get access to premium features",
        order_id: order.id,
        handler: function (response) {
          alert("✅ Payment Successful! Razorpay ID: " + response.razorpay_payment_id);
        },
        prefill: {
          name: "Nishi Sharma",
          email: "nishisharma@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Kanban App Headquarters",
        },
        theme: {
          color: "#4a90e2",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2 style={{ marginBottom: "1rem" }}>Buy Premium</h2>
      <button
        onClick={handlePayment}
        style={{
          padding: "12px 24px",
          fontSize: "1.1rem",
          backgroundColor: "#4a90e2",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Pay ₹100 with Razorpay
      </button>
    </div>
  );
};

export default Payment;
