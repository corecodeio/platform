const { nodeMailerConfig, clientConfig } = require('./../config/index.js');
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport(nodeMailerConfig);

module.exports.sendRecoverPassword = ({ tokenRecover, email }) => {
    try {
        const message = {
            from: nodeMailerConfig.auth.user,
            to: email,
            subject: 'Password recovery',
            // html: `
            // <p>hola en este email encontrara un link para recuperar contraseña<p>
            // <a href="${clientConfig.student_url}/reset-password/${tokenRecover}">link</a>
            // `
            html: `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
            
            <head>
                <meta charset="UTF-8">
                <meta content="width=device-width, initial-scale=1" name="viewport">
                <meta name="x-apple-disable-message-reformatting">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta content="telephone=no" name="format-detection">
                <title></title>
                <link href="https://fonts.googleapis.com/css?family=Rubik" rel="stylesheet">
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <!--[if (mso 16)]>
                <style type="text/css">
                a {text-decoration: none;}
                </style>
                <![endif]-->
                <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
                <!--[if gte mso 9]>
            <xml>
                <o:OfficeDocumentSettings>
                <o:AllowPNG></o:AllowPNG>
                <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
                <!--[if !mso]><!-- -->
                <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700,700i" rel="stylesheet">
                <!--<![endif]-->
            </head>
            
            <body>
                <div class="es-wrapper-color">
                    <!--[if gte mso 9]>
                        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                            <v:fill type="tile" color="#f6f6f6"></v:fill>
                        </v:background>
                    <![endif]-->
                    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td class="esd-email-paddings" valign="top">
                                    <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">
                                        <tbody>
                                            <tr>
                                                <td class="esd-stripe" align="center">
                                                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                                        <tbody>
                                                            <tr>
                                                                <td class="es-p20t es-p20r es-p20l esd-structure" align="left" bgcolor="#F5F9FB" style="background-color: #f5f9fb;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-image es-p40t es-p25b es-p15r es-p15l" style="font-size: 0px; padding: 60px 0px 0px 0px; "><a target="_blank"><img class="adapt-img" src="https://mlskxy.stripocdn.email/content/guids/80d3f13b-48e2-49d6-9a64-50a340fdd412/images/logo.png" alt style="display: block;" width="126"></a></td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td class="esd-stripe" align="center">
                                                    <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td class="es-p20t es-p20r es-p20l esd-structure" align="left" bgcolor="#F5F9FB" style="background-color: #f5f9fb;">
                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-container-frame" width="560" valign="top" align="center">
                                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-text es-p5t es-p30b es-p30r es-p30l">
                                                                                                    <p style="color: #0d1e38; font-size: 28px; font-family: 'Rubik';font-size: 32px;"><strong>Recupera tu contraseña</strong></p>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table class="es-footer" cellspacing="0" cellpadding="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td class="esd-stripe" align="center">
                                                    <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="background-color: #ffffff;">
                                                        <tbody>
                                                            <tr>
                                                                <td class="esd-structure es-p20t es-p20r es-p20l" align="left" bgcolor="#F5F9FB" style="background-color: #f5f9fb;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="left" class="esd-block-text es-p40l" style="padding: 0px 10px 0px 50px;">
                                                                                                    <p style="color: #0d1e38; font-family: 'Source Sans Pro'; font-weight: 400; font-size: 18px;">¡Hola ${ first_name }! Esperamos que estés muy bien<br>Recibimos correctamente tu pedido de reseteo de contraseña.<br><br>Ingresa al siguiente <a href="${clientConfig.student_url}/reset-password/${tokenRecover}" style="color:#2764FF; font-weight:700; font-size: 18px; text-decoration: none;">link </a>y podrás cambiarla:</p>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="esd-structure es-p20t es-p20r es-p20l" align="left" bgcolor="#F5F9FB" style="background-color: #f5f9fb;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-button es-p20t es-p40b es-p15r es-p15l" style="padding: 20px 0px 60px 0px;"><span class="es-button-border" style="border-width: 0px; border-color: #2cb543; background: #6254ff;"><a href="${clientConfig.student_url}/reset-password/${tokenRecover}" class="es-button es-button-1680458315516" target="_blank" style="background: #6254ff; border-color: #6254ff; border-radius: 4px; font-family: &quot;Source Sans Pro&quot;; padding: 10px 25px; color: #ffffff; text-decoration: none;"> Recuperar contraseña </a></span></td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table class="esd-footer-popover es-footer" cellspacing="0" cellpadding="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td class="esd-stripe" align="center">
                                                    <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="background-color: #ffffff;">
                                                        <tbody>
                                                            <tr>
                                                                <td class="esd-structure es-p40t es-p20r es-p20l" align="left" bgcolor="#F5F9FB" style="background-color: #f5f9fb;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="left" class="esd-block-text es-p30b es-p40l" style="padding: 0px 40px 20px 50px;">
                                                                                                    <p style="color: #0d1e38; font-size:14px ;font-family:'Source Sans Pro'; font-weight:400">Cualquier duda, puedes escribir a <span style="color:#2764FF; font-weight:700">admisiones@core-code.io</span><br><br>Un fuerte abrazo,<br>Equipo Core Code</p>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="esd-structure es-p20t es-p20r es-p20l" align="left" bgcolor="#483ddb" style="background-color: #483ddb;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-social es-p20t" style="font-size: 0px; background-color: #483ddb;" bgcolor="#483ddb">
                                                                                                    <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" style="padding: 30px 0px 0px 0px;">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td align="center" valign="top" class="es-p10r"><a target="_blank" href="https://www.instagram.com/corecodeio/"><img style="margin: 0px 10px; background-color: #ffffff; border-radius: 40px" src="https://mlskxy.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/instagram-logo-colored-bordered.png" alt="Ig" title="Instagram" width="32"></a></td>
                                                                                                                <td align="center" valign="top" class="es-p10r"><a target="_blank" href="https://www.youtube.com/@core-codeio"><img style="margin: 0px 10px;background-color: #ffffff; border-radius: 40px" src="https://mlskxy.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/youtube-logo-colored-bordered.png" alt="Yt" title="Youtube" width="32"></a></td>
                                                                                                                <td align="center" valign="top"><a target="_blank" href="https://www.linkedin.com/company/core-code-io/"><img style="margin: 0px 10px; background-color: #ffffff; border-radius: 40px" src="https://mlskxy.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/linkedin-logo-colored-bordered.png" alt="In" title="Linkedin" width="32"></a></td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="esd-structure es-p20t es-p20r es-p20l" align="left" bgcolor="#483DDB" style="background-color: #483ddb;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-text">
                                                                                                    <p style="color: #ffffff; font-size: 12px; font-family: 'Source Sans Pro'; font-weight: 400;">Core Code © 2023 | Todos los derechos reservados.</p>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </body>
            
            </html>
            `
        };
        transport.sendMail(message);
    }
    catch(error) {
        console.log(error);
    }
}