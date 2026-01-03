import { useState } from "react";
import api from "../api/axios";

export default function WithdrawButton({ applicationId, onWithdraw }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const handleWithdraw = async () => {
    if (!window.confirm("Are you sure you want to withdraw this application?")) return;

    setLoading(true);
    setMessage("");

    try {
      // Include withCredentials for Laravel session auth
      const response = await api.delete(`/applications/${applicationId}`, { withCredentials: true });

      if (response.status === 200) {
        setMessage("Application withdrawn successfully!");
        setMessageType("success");

        if (onWithdraw) onWithdraw(applicationId); // Remove from parent UI
      } else {
        setMessage(response.data.message || "Failed to withdraw application.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Withdraw error:", error);
      setMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <button
        onClick={handleWithdraw}
        disabled={loading}
        className="ml-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition disabled:opacity-50"
      >
        {loading ? "Withdrawing..." : "Withdraw"}
      </button>

      {message && (
        <p
          className={`mt-2 text-sm ${
            messageType === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
