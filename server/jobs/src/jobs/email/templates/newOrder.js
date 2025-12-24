const newOrder = (
    artistName,
    product,
    customerDetail,
    orderId
) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Order Received</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 0;">
        
        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#111827; padding:20px 30px;">
              <h1 style="color:#ffffff; margin:0; font-size:22px;">
                🎉 New Order Received
              </h1>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:30px;">
              <p style="margin:0 0 15px; font-size:16px; color:#111827;">
                Hi <strong>${artistName}</strong>,
              </p>

              <p style="margin:0 0 20px; font-size:15px; color:#374151;">
                Great news! You’ve received a new order. Below are the details:
              </p>

              <!-- Order ID -->
              <p style="margin:0 0 25px; font-size:14px; color:#6b7280;">
                <strong>Order ID:</strong> #${orderId}
              </p>

              <!-- Product Section -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 25px;">
                <tr>
                  <td colspan="2" style="padding-bottom:10px;">
                    <h3 style="margin:0; font-size:16px; color:#111827;">
                      🛒 Product Details
                    </h3>
                  </td>
                </tr>

                <tr>
                  <td width="120" style="padding:10px 0;">
                    <img src="${product.image}" alt="${product.title}" style="width:100px; border-radius:6px;" />
                  </td>

                  <td style="padding-left:15px;">
                    <p style="margin:0 0 6px; font-size:15px; color:#111827;">
                      <strong>${product.title}</strong>
                    </p>
                    <p style="margin:0; font-size:14px; color:#374151;">
                      Quantity: ${product.quantity}
                    </p>
                    <p style="margin:4px 0; font-size:14px; color:#374151;">
                      Price: ₹${product.price}
                    </p>
                    <p style="margin:4px 0; font-size:14px; color:#111827;">
                      <strong>Subtotal: ₹${product.subtotal}</strong>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Customer Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e5e7eb; padding-top:20px;">
                <tr>
                  <td>
                    <h3 style="margin:0 0 10px; font-size:16px; color:#111827;">
                      👤 Customer Details
                    </h3>

                    <p style="margin:0 0 6px; font-size:14px; color:#374151;">
                      <strong>Name:</strong> ${customerDetail.name}
                    </p>
                    <p style="margin:0 0 6px; font-size:14px; color:#374151;">
                      <strong>Username:</strong> ${customerDetail.username}
                    </p>
                    <p style="margin:0; font-size:14px; color:#374151;">
                      <strong>Email:</strong> ${customerDetail.email}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <div style="margin-top:30px; text-align:center;">
                <a href="#" style="
                  background:#2563eb;
                  color:#ffffff;
                  text-decoration:none;
                  padding:12px 22px;
                  border-radius:6px;
                  font-size:14px;
                  display:inline-block;
                ">
                  View Order Dashboard
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; padding:20px; text-align:center;">
              <p style="margin:0; font-size:13px; color:#6b7280;">
                You’re receiving this email because you sell on our platform.
              </p>
              <p style="margin:5px 0 0; font-size:12px; color:#9ca3af;">
                © ${new Date().getFullYear()} Your Company Name
              </p>
            </td>
          </tr>

        </table>
        <!-- End Card -->

      </td>
    </tr>
  </table>
</body>
</html>
  `
}

module.exports = newOrder
