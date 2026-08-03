import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

// Resend client — key is injected from environment variable
const resend = new Resend(process.env.RESEND_API_KEY)

// ─── Types ────────────────────────────────────────────────────────────────────

interface RsvpPayload {
  guestName: string
  attendance: "yes" | "no"
  dietary: string
  song: string
  artist: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────


/** Format submission date/time in a readable UK format */
function formatDateTime(): string {
  return new Date().toLocaleString("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/London",
  })
}

/** Build the HTML email body */
function buildEmailHtml(payload: RsvpPayload): string {
  const { guestName, attendance, dietary, song, artist } = payload
  const attending = attendance === "yes"

  return `
<!DOCTYPE html>
<html>
<body style="
margin:0;
padding:0;
background:#050505;
font-family:Georgia,'Times New Roman',serif;
color:#ffffff;
">

<table width="100%" cellpadding="0" cellspacing="0" style="
background:#050505;
padding:40px 20px;
">

<tr>
<td align="center">

<table width="600" style="
max-width:600px;
background:#0d0b08;
border:1px solid #c8a96e40;
padding:40px;
">


<tr>
<td align="center">

<p style="
color:#c8a96e;
letter-spacing:5px;
font-size:12px;
text-transform:uppercase;
">
Wedding RSVP
</p>


<h1 style="
color:#c8a96e;
font-weight:400;
font-size:32px;
margin-bottom:40px;
">
Elizabeth & Julian
</h1>


</td>
</tr>



<tr>
<td>


<p style="
color:#c8a96e;
font-size:12px;
letter-spacing:3px;
text-transform:uppercase;
">
Guest
</p>

<h2 style="
color:white;
font-weight:400;
margin-top:5px;
">
${guestName}
</h2>


<hr style="border:none;border-top:1px solid #c8a96e30;">



<p style="
color:#c8a96e;
font-size:12px;
letter-spacing:3px;
">
Response
</p>


<p style="
font-size:18px;
color:${attending ? "#c8a96e" : "#ffffff"};
">
${attending 
? "✦ Can't wait to celebrate with you!"
: "✦ Sadly unable to attend"}
</p>



${attending ? `

<hr style="border:none;border-top:1px solid #c8a96e30;">


<p style="
color:#c8a96e;
font-size:12px;
letter-spacing:3px;
">
Dietary Requests
</p>

<p style="
color:white;
font-size:16px;
">
${dietary || "None"}
</p>



<p style="
color:#c8a96e;
font-size:12px;
letter-spacing:3px;
">
Song Request
</p>

<p style="
color:white;
font-size:16px;
">
${song || "No song requested"}
</p>



<p style="
color:#c8a96e;
font-size:12px;
letter-spacing:3px;
">
Artist
</p>

<p style="
color:white;
font-size:16px;
">
${artist || "—"}
</p>

` : ""}



<hr style="border:none;border-top:1px solid #c8a96e30;">


<p style="
color:#777;
font-size:12px;
">
Submitted:
${formatDateTime()}
</p>


</td>
</tr>


<tr>
<td align="center">

<p style="
color:#c8a96e;
font-size:11px;
letter-spacing:2px;
margin-top:30px;
">
Elizabeth & Julian Wedding
</p>

</td>
</tr>


</table>

</td>
</tr>

</table>


</body>
</html>
`
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const payload: RsvpPayload = await req.json()

    // Basic validation
    if (!payload.guestName || !payload.attendance) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const { data, error } = await resend.emails.send({
      // ⚠️ IMPORTANT: Replace this with a verified sender address on your Resend account.
      // Until you verify a domain, you can use: onboarding@resend.dev (but only to your own email).
      // See: https://resend.com/docs/dashboard/domains/introduction
    from: "Wedding RSVP <onboarding@resend.dev>",
      to: ["julianbozzardi.pro@gmail.com"],
      subject: `RSVP: ${payload.guestName} — ${payload.attendance === "yes" ? "Attending ✦" : "Not attending"}`,
      html: buildEmailHtml(payload),
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err: any) {
    console.error("RSVP route error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}