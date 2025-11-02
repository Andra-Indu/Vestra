package com.excelR.vestra_backend.service;

// import com.razorpay.*;
import com.razorpay.Order;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Service
public class RazorpayService {

    private final String RAZORPAY_KEY_ID = "rzp_test_1234567890abcdef"; // ✅ Replace with your live/test key
    private final String RAZORPAY_SECRET = "1234567890abcdef1234567890abcdef"; // ⚠️ Replace with your secret key

    // 🔹 Create Razorpay order
    public Order createOrder(int amount) throws RazorpayException {
        RazorpayClient client = new RazorpayClient(RAZORPAY_KEY_ID, RAZORPAY_SECRET);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount);
        orderRequest.put("currency", "INR");
        orderRequest.put("payment_capture", 1);

        return client.orders.create(orderRequest);
    }

    // 🔹 Verify signature
    public boolean verifySignature(String orderId, String paymentId, String signature) {
        try {
            String data = orderId + "|" + paymentId;
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(RAZORPAY_SECRET.getBytes(), "HmacSHA256");
            sha256_HMAC.init(secretKey);
            byte[] hash = sha256_HMAC.doFinal(data.getBytes());
            String generatedSignature = new String(Base64.getEncoder().encode(hash));
            return generatedSignature.equals(signature);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
