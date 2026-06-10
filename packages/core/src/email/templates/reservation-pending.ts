import { EMAIL_TEXTS, type EmailLocale } from "../i18n/email.texts";

export function reservationPendingHtml(
  guestName: string,
  reservationCode: string,
  checkIn: string,
  checkOut: string,
  roomName: string,
  locale: EmailLocale,
): string {
  const t = EMAIL_TEXTS[locale];
  const s = t.PENDING;

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="${locale}">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <body style='background-color:rgb(243,244,246);font-family:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";padding-top:40px;padding-bottom:40px'>
    <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
      ${s.PREVIEW} - ${reservationCode}
    </div>
    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:rgb(255,255,255);max-width:600px;margin-left:auto;margin-right:auto;border-radius:8px;box-shadow:0 1px 3px 0 rgba(0,0,0,0.1)">
      <tbody>
        <tr style="width:100%">
          <td>
            <!-- Header -->
            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:rgb(6,78,59);color:rgb(255,255,255);text-align:center;padding-top:32px;padding-bottom:32px;border-top-left-radius:8px;border-top-right-radius:8px">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size:24px;font-weight:700;margin:0px;line-height:24px;letter-spacing:2px">${t.HOTEL_NAME}</p>
                    <p style="font-size:14px;color:rgb(209,213,219);margin:0px;margin-top:8px;line-height:24px">${t.HOTEL_SUBTITLE}</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Status Badge -->
            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="text-align:center;padding-top:24px;padding-bottom:24px">
              <tbody>
                <tr>
                  <td>
                    <div style="display:inline-block;background-color:rgb(254,243,199);color:rgb(146,64,14);padding-left:16px;padding-right:16px;padding-top:8px;padding-bottom:8px;border-radius:20px;border-width:1px;border-style:solid;border-color:rgb(253,230,138)">
                      <p style="font-size:14px;font-weight:600;margin:0px;line-height:24px">${s.BADGE}</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Body -->
            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="padding-left:32px;padding-right:32px;padding-bottom:32px">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size:20px;font-weight:700;color:rgb(30,41,59);margin-bottom:16px;line-height:24px;margin-top:16px">${s.GREETING} ${guestName},</p>
                    <p style="font-size:16px;color:rgb(55,65,81);margin-bottom:24px;line-height:24px;margin-top:16px">${s.BODY}</p>
                    <!-- Details Box -->
                    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:rgb(249,250,251);border-radius:8px;padding:24px;margin-bottom:24px">
                      <tbody>
                        <tr>
                          <td>
                            <p style="font-size:18px;font-weight:700;color:rgb(30,41,59);margin-bottom:16px;line-height:24px;margin-top:16px">${t.DETAILS_TITLE}</p>
                            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:12px">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td style="width:130px"><p style="font-size:14px;font-weight:600;color:rgb(75,85,99);margin:0px;line-height:24px">${t.LABEL_CONFIRMATION}</p></td>
                                  <td><p style='font-size:14px;color:rgb(30,41,59);margin:0px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Courier New",monospace;line-height:24px'>${reservationCode}</p></td>
                                </tr>
                              </tbody>
                            </table>
                            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:12px">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td style="width:130px"><p style="font-size:14px;font-weight:600;color:rgb(75,85,99);margin:0px;line-height:24px">${t.LABEL_ROOM}</p></td>
                                  <td><p style="font-size:14px;color:rgb(30,41,59);margin:0px;line-height:24px">${roomName}</p></td>
                                </tr>
                              </tbody>
                            </table>
                            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:12px">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td style="width:130px"><p style="font-size:14px;font-weight:600;color:rgb(75,85,99);margin:0px;line-height:24px">${t.LABEL_CHECKIN}</p></td>
                                  <td><p style="font-size:14px;color:rgb(30,41,59);margin:0px;line-height:24px">${checkIn}</p></td>
                                </tr>
                              </tbody>
                            </table>
                            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td style="width:130px"><p style="font-size:14px;font-weight:600;color:rgb(75,85,99);margin:0px;line-height:24px">${t.LABEL_CHECKOUT}</p></td>
                                  <td><p style="font-size:14px;color:rgb(30,41,59);margin:0px;line-height:24px">${checkOut}</p></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p style="font-size:14px;color:rgb(75,85,99);margin-bottom:24px;line-height:20px;margin-top:16px">${t.FOOTER_NOTE}</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Footer -->
            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:rgb(249,250,251);padding-left:32px;padding-right:32px;padding-top:24px;padding-bottom:24px;border-bottom-right-radius:8px;border-bottom-left-radius:8px;border-top-width:1px;border-top-style:solid;border-color:rgb(229,231,235)">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size:14px;font-weight:600;color:rgb(30,41,59);margin-bottom:8px;line-height:24px;margin-top:16px">${t.CONTACT_TITLE}</p>
                    <p style="font-size:12px;color:rgb(75,85,99);margin:0px;line-height:24px">${t.CONTACT_PHONE}</p>
                    <p style="font-size:12px;color:rgb(75,85,99);margin:0px;line-height:24px">${t.CONTACT_EMAIL}</p>
                    <p style="font-size:12px;color:rgb(75,85,99);margin:0px;line-height:24px">${t.CONTACT_ADDRESS}</p>
                    <p style="font-size:12px;color:rgb(107,114,128);margin:0px;line-height:24px;margin-top:8px">${t.COPYRIGHT}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`;
}
