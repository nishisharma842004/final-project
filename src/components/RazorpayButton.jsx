// src/components/RazorpayButton.jsx

const RazorpayButton = () => {
  const handlePayment = async () => {
    const response = await fetch("http://localhost:5000/order", {
      method: "POST",
    });

    const order = await response.json();

    const options = {
      key: "ixnR3PVcmwfRdrnCSNutMTIN", // Your Razorpay API Key
      amount: order.amount,
      currency: order.currency,
      name: "Kanban Premium",
      description: "Access to Pro features",
      order_id: order.id,
      handler: function (response) {
        alert("Payment Successful!");
      },
      prefill: {
        name: "Nishi Sharma",
        email: "nishisharma842004@gmail.com",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button onClick={handlePayment} style={{ padding: "10px", marginTop: "20px" }}>
      Pay with Razorpay
    </button>
  );
};

export default RazorpayButton;
