const otpEmailTemplate = (otp) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Visuels Email Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f6f6f6; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; padding:24px;">

          <!-- Header -->
          <tr>
            <td style="text-align:center;">
              <h2 style="margin:0; color:#111;">Verify your email</h2>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding-top:16px; color:#555; font-size:14px;">
              <p>
                Your verification code for <strong>Visuels</strong> signup is:
              </p>
            </td>
          </tr>

          <!-- OTP Box -->
          <tr>
            <td style="text-align:center; padding: 16px 0;">
              <div style="
                display:inline-block;
                font-size:28px;
                font-weight:bold;
                letter-spacing:6px;
                color:#000;
                background:#f2f2f2;
                padding:12px 24px;
                border-radius:6px;
              ">
                ${otp}
              </div>
            </td>
          </tr>

          <!-- Info -->
          <tr>
            <td style="color:#666; font-size:13px;">
              <p>
                This code is valid for <strong>5 minutes</strong>.
                Please do not share this code with anyone.
              </p>
              <p>
                If you did not request this email, you can safely ignore it.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:20px; border-top:1px solid #eee; font-size:12px; color:#999;">
              — Team Visuels
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

module.exports = otpEmailTemplate;
