const newuser = (name , username , role , email) => `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New User Created</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 30px 15px;">
        
        <!-- Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#111827; padding:20px; text-align:center;">
              <h2 style="color:#ffffff; margin:0;">New User Registered</h2>
              <p style="color:#9ca3af; margin:5px 0 0; font-size:14px;">
                Visuels Platform
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 25px;">
              <p style="font-size:16px; color:#111827; margin-bottom:20px;">
                A new user has successfully created an account.
              </p>

              <!-- User Details Table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                <tr>
                  <td style="padding:10px; background:#f9fafb; border:1px solid #e5e7eb;"><strong>Name</strong></td>
                  <td style="padding:10px; border:1px solid #e5e7eb;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:10px; background:#f9fafb; border:1px solid #e5e7eb;"><strong>Username</strong></td>
                  <td style="padding:10px; border:1px solid #e5e7eb;">${username}</td>
                </tr>
                <tr>
                  <td style="padding:10px; background:#f9fafb; border:1px solid #e5e7eb;"><strong>Email</strong></td>
                  <td style="padding:10px; border:1px solid #e5e7eb;">${email}</td>
                </tr>
                <tr>
                  <td style="padding:10px; background:#f9fafb; border:1px solid #e5e7eb;"><strong>Role</strong></td>
                  <td style="padding:10px; border:1px solid #e5e7eb;">${role}</td>
                </tr>
              </table>

              
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; padding:15px; text-align:center; font-size:12px; color:#9ca3af;">
              © 2025 Visuels. Internal Notification.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>

`

module.exports  = newuser