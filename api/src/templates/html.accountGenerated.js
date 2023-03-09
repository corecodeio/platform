module.exports = ({ first_name, last_name, email, password, url }) => {
    return `<!DOCTYPE html>
  <html>
    <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <style type="text/css">
        /* FONTS */
        @media screen {
          @font-face {
            font-family: "Lato";
            font-style: normal;
            font-weight: 300;
            src: local("Lato Light"), local("Lato-Light"),
              url(https://fonts.gstatic.com/s/lato/v13/dPJ5r9gl3kK6ijoeP1IRsvY6323mHUZFJMgTvxaG2iE.woff2)
                format("woff2");
            unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF,
              U+2C60-2C7F, U+A720-A7FF;
          }
          @font-face {
            font-family: "Lato";
            font-style: normal;
            font-weight: 300;
            src: local("Lato Light"), local("Lato-Light"),
              url(https://fonts.gstatic.com/s/lato/v13/EsvMC5un3kjyUhB9ZEPPwg.woff2)
                format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA,
              U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
          }
          @font-face {
            font-family: "Lato";
            font-style: normal;
            font-weight: 400;
            src: local("Lato Regular"), local("Lato-Regular"),
              url(https://fonts.gstatic.com/s/lato/v13/UyBMtLsHKBKXelqf4x7VRQ.woff2)
                format("woff2");
            unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF,
              U+2C60-2C7F, U+A720-A7FF;
          }
          @font-face {
            font-family: "Lato";
            font-style: normal;
            font-weight: 400;
            src: local("Lato Regular"), local("Lato-Regular"),
              url(https://fonts.gstatic.com/s/lato/v13/1YwB1sO8YE1Lyjf12WNiUA.woff2)
                format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA,
              U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
          }
          @font-face {
            font-family: "Lato";
            font-style: normal;
            font-weight: 700;
            src: local("Lato Bold"), local("Lato-Bold"),
              url(https://fonts.gstatic.com/s/lato/v13/ObQr5XYcoH0WBoUxiaYK3_Y6323mHUZFJMgTvxaG2iE.woff2)
                format("woff2");
            unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF,
              U+2C60-2C7F, U+A720-A7FF;
          }
          @font-face {
            font-family: "Lato";
            font-style: normal;
            font-weight: 700;
            src: local("Lato Bold"), local("Lato-Bold"),
              url(https://fonts.gstatic.com/s/lato/v13/H2DMvhDLycM56KNuAtbJYA.woff2)
                format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA,
              U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
          }
          @font-face {
            font-family: "Lato";
            font-style: normal;
            font-weight: 900;
            src: local("Lato Black"), local("Lato-Black"),
              url(https://fonts.gstatic.com/s/lato/v13/R4a6fty3waPci7C44H8AjvY6323mHUZFJMgTvxaG2iE.woff2)
                format("woff2");
            unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF,
              U+2C60-2C7F, U+A720-A7FF;
          }
          @font-face {
            font-family: "Lato";
            font-style: normal;
            font-weight: 900;
            src: local("Lato Black"), local("Lato-Black"),
              url(https://fonts.gstatic.com/s/lato/v13/tI4j516nok_GrVf4dhunkg.woff2)
                format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA,
              U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
          }
          @font-face {
            font-family: "Lato";
            font-style: italic;
            font-weight: 300;
            src: local("Lato Light Italic"), local("Lato-LightItalic"),
              url(https://fonts.gstatic.com/s/lato/v13/XNVd6tsqi9wmKNvnh5HNEBJtnKITppOI_IvcXXDNrsc.woff2)
                format("woff2");
            unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF,
              U+2C60-2C7F, U+A720-A7FF;
          }
          @font-face {
            font-family: "Lato";
            font-style: italic;
            font-weight: 300;
            src: local("Lato Light Italic"), local("Lato-LightItalic"),
              url(https://fonts.gstatic.com/s/lato/v13/2HG_tEPiQ4Z6795cGfdivFtXRa8TVwTICgirnJhmVJw.woff2)
                format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA,
              U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
          }
          @font-face {
            font-family: "Lato";
            font-style: italic;
            font-weight: 400;
            src: local("Lato Italic"), local("Lato-Italic"),
              url(https://fonts.gstatic.com/s/lato/v13/YMOYVM-eg6Qs9YzV9OSqZfesZW2xOQ-xsNqO47m55DA.woff2)
                format("woff2");
            unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF,
              U+2C60-2C7F, U+A720-A7FF;
          }
          @font-face {
            font-family: "Lato";
            font-style: italic;
            font-weight: 400;
            src: local("Lato Italic"), local("Lato-Italic"),
              url(https://fonts.gstatic.com/s/lato/v13/PLygLKRVCQnA5fhu3qk5fQ.woff2)
                format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA,
              U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
          }
          @font-face {
            font-family: "Lato";
            font-style: italic;
            font-weight: 700;
            src: local("Lato Bold Italic"), local("Lato-BoldItalic"),
              url(https://fonts.gstatic.com/s/lato/v13/AcvTq8Q0lyKKNxRlL28RnxJtnKITppOI_IvcXXDNrsc.woff2)
                format("woff2");
            unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF,
              U+2C60-2C7F, U+A720-A7FF;
          }
          @font-face {
            font-family: "Lato";
            font-style: italic;
            font-weight: 700;
            src: local("Lato Bold Italic"), local("Lato-BoldItalic"),
              url(https://fonts.gstatic.com/s/lato/v13/HkF_qI1x_noxlxhrhMQYEFtXRa8TVwTICgirnJhmVJw.woff2)
                format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA,
              U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
          }
  
          @font-face {
            font-family: "Playfair Display";
            font-style: normal;
            font-weight: 400;
            src: local("Playfair Display"), local("PlayfairDisplay-Regular"),
              url(https://fonts.gstatic.com/s/playfairdisplay/v10/2NBgzUtEeyB-Xtpr9bm1CUR-13DsDU150T1bKbJZejI.woff2)
                format("woff2");
            unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
          }
          @font-face {
            font-family: "Playfair Display";
            font-style: normal;
            font-weight: 400;
            src: local("Playfair Display"), local("PlayfairDisplay-Regular"),
              url(https://fonts.gstatic.com/s/playfairdisplay/v10/2NBgzUtEeyB-Xtpr9bm1CfoVn-aGdXvQRwgLLg-TkDk.woff2)
                format("woff2");
            unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF,
              U+2C60-2C7F, U+A720-A7FF;
          }
          @font-face {
            font-family: "Playfair Display";
            font-style: normal;
            font-weight: 400;
            src: local("Playfair Display"), local("PlayfairDisplay-Regular"),
              url(https://fonts.gstatic.com/s/playfairdisplay/v10/2NBgzUtEeyB-Xtpr9bm1Cdhy5e3cTyNKTHXrP9DO-Rc.woff2)
                format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA,
              U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
          }
        }
        /* CLIENT-SPECIFIC STYLES */
        body,
        table,
        td,
        a {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        table,
        td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        img {
          -ms-interpolation-mode: bicubic;
        }
        /* RESET STYLES */
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
        }
        table {
          border-collapse: collapse !important;
        }
        body {
          height: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
        }
        /* iOS BLUE LINKS */
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
        }
        .em_preheader a {
          color: #9da0b1;
          text-decoration: none;
        }
        .em_header a {
          color: #76798a;
          text-decoration: none;
        }
        .em_blk a {
          color: #333333;
          text-decoration: none;
        }
        .em_blk2 a {
          color: #000000;
          text-decoration: none;
        }
        .em_dkgray a {
          color: #414155;
          text-decoration: none;
        }
        .em_mdgray a {
          color: #747487;
          text-decoration: none;
        }
        .em_grayfooter a {
          color: #828282;
          text-decoration: none;
        }
        .em_red a {
          color: #dd2b0d;
          text-decoration: none;
        }
        .em_blue a {
          color: #0e72ed;
          text-decoration: none;
        }
        .em_wht a {
          color: #ffffff;
          text-decoration: none;
        }
        @media screen and (min-width: 601px) {
          .container {
            width: 600px !important;
          }
        }
        /* MOBILE STYLES */
        @media screen and (max-width: 600px) {
          .em_wrapper {
            width: 100% !important;
          }
          .em_pad {
            padding: 40px 15px 40px 15px !important;
          }
          .em_p15 {
            padding-bottom: 15px !important;
          }
          .em_p25 {
            padding-bottom: 25px !important;
          }
          .em_p40 {
            padding-bottom: 40px !important;
          }
          .em_pad_1 {
            padding: 0px 15px 10px 15px !important;
          }
          .em_pad_2 {
            padding: 0px 15px 40px 15px !important;
          }
          .em_brk {
            display: block !important;
          }
          .em_hide {
            display: none !important;
          }
          .em_center {
            text-align: center !important;
          }
          .BodyCopy {
            font-size: 16px !important;
            line-height: 24px !important;
          }
  
          /* BR STYLES */
  
          .em_d20 {
            height: 20px;
          }
  
          .em_d40 {
            height: 40px;
          }
  
          .img-max {
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
          }
  
          .mobile-first {
            display: table-header-group !important;
          }
          .mobile-intermediate {
            display: table-row !important;
          }
          .mobile-last {
            display: table-footer-group !important;
          }
  
          .mobile-center {
            display: table !important;
            float: none;
            margin-left: auto !important;
            margin-right: auto !important;
          }
  
          .mobile-full-width {
            display: table;
            width: 100%;
          }
  
          .mobile-cta {
            padding: 20px 25px !important;
            font-size: 14px !important;
          }
        }
        /* ANDROID CENTER FIX */
        div[style*="margin: 14px 0;"] {
          margin: 0 !important;
        }
      </style>
    </head>
    <body
      style="
        background-color: #eeeeee;
        margin: 0 !important;
        padding: 0 !important;
      "
    >
      <!-- Preheader -->
  
      <table
        align="center"
        border="0"
        cellpadding="0"
        cellspacing="0"
        width="100%"
      >
        <tbody>
          <tr>
            <td align="center" valign="top">
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="container"
                style="max-width: 600px"
                width="100%"
              >
                <!-- Navigation -->
                <tbody>
                  <tr>
                    <td align="center" valign="top">
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        style="max-width: 600px"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td
                              align="left"
                              bgcolor="#FFFFFF"
                              style="font-size: 0; padding-top: 0px"
                              valign="top"
                              class=""
                            >
                              <div
                                style="
                                  display: inline-block;
                                  max-width: 600px;
                                  vertical-align: top;
                                  width: 100%;
                                  background-color: #0f1f39;
                                "
                              >
                                <table
                                  align="left"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        align="left"
                                        style="
                                          padding: 30px 30px;
                                          position: relative;
                                        "
                                        valign="middle"
                                        class=""
                                      >
                                        hola
                                        <a
                                          href="${url}"
                                          style="text-decoration: none"
                                          target="_blank"
                                          ><img
                                            alt="Core Code Logo"
                                            border="0"
                                            src="https://i.ibb.co/L1ff7b9/logo.png"
                                            style="
                                              position: absolute;
                                              bottom: -50%;
                                              margin: auto;
                                              left: calc(50% - 120px);
                                              display: block;
                                              font-family: 'Lato', Helvetica,
                                                sans-serif;
                                              font-size: 18px;
                                              line-height: 22px;
                                              color: #76798a;
                                              font-weight: bold;
                                              width: 100%;
                                              max-width: 240px;
                                            "
                                            width="100"
                                          />
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <!-- Body -->
                  <tr>
                    <td
                      align="center"
                      bgcolor="#ffffff"
                      style="padding: 0px 30px 40px 30px"
                      valign="top"
                    >
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        style="max-width: 600px"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td
                              align="left"
                              class="BodyCopy"
                              style="
                                padding-bottom: 20px;
                                font-family: 'Lato', Helvetica, sans-serif;
                                font-size: 14px;
                                line-height: 17px;
                                font-weight: 400;
                                color: #232333;
                                letter-spacing: 0.01em;
                                text-align: left;
                                margin-top: 40px;
                              "
                            >
                              <div style="margin-top: 40px">
                                Hola, ${first_name} ${last_name}:
                              </div>
                              <div style="margin-top: 24px">
                                Ya te encuentras registrado en nuestra plataforma
                                de administracion.
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="left"
                              class="BodyCopy"
                              style="
                                padding-bottom: 20px;
                                font-family: 'Lato', Helvetica, sans-serif;
                                font-size: 14px;
                                line-height: 17px;
                                font-weight: 400;
                                color: #232333;
                                letter-spacing: 0.01em;
                                text-align: left;
                              "
                            >
                              <div>Los siguientes son tus datos de acceso:</div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="center"
                              style="
                                padding-top: 12px;
                                background-color: #f7f7fc;
                                padding-bottom: 12px;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                style="
                                  padding: 12px;
                                  font-family: helvetica, arial;
                                  font-size: 14px;
                                  line-height: 29px;
                                  color: #333333;
                                  width: 500px;
                                "
                              >
                                <tbody>
                                  <tr>
                                    <td style="color: #747487">Email</td>
                                    <td>${email}</td>
                                  </tr>
                                  <tr>
                                    <td style="color: #747487">Contraseña</td>
                                    <td>${password}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="left"
                              class="BodyCopy"
                              style="
                                font-family: 'Lato', Helvetica, sans-serif;
                                font-size: 14px;
                                line-height: 17px;
                                font-weight: 400;
                                color: #232333;
                                letter-spacing: 0.01em;
                                text-align: left;
                              "
                            >
                              <div style="margin-top: 24px">
                                Te dejamos el link del panel de administracion
                                <a
                                  href="${url}"
                                  target="_blank"
                                  style="text-decoration: none; color: #0e71eb"
                                  >aquí</a
                                >. Le recomendamos que actualice su contraseña
                                ingresando a la plataforma.
                              </div>
                              <div style="margin-top: 24px">
                                Un fuerte abrazo,
                              </div>
                              <div style="margin-bottom: 24px">
                                El Equipo de Core Code
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" class="BodyCopy">
                              <div
                                style="
                                  border-top: solid;
                                  background: #ededf4;
                                  position: static;
                                  color: #ededf4;
                                  margin-bottom: 24px;
                                "
                              ></div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="left"
                              class="BodyCopy"
                              style="
                                font-family: 'Lato', Helvetica, sans-serif;
                                font-size: 12px;
                                line-height: 15px;
                                font-weight: 400;
                                color: #747487;
                                letter-spacing: 0.01em;
                                text-align: left;
                              "
                            >
                              <div>
                                Para mejorar la seguridad de su cuenta, recuerde
                                actualizar su contraseña :)
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <!--END Body-->
                  <!-- Gray Box -->
                  <tr>
                    <td align="center" bgcolor="#E4E4ED" valign="top">
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        style="max-width: 600px"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td
                              align="center"
                              style="padding: 30px 15px"
                              valign="top"
                            >
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      align="center"
                                      style="padding-bottom: 15px"
                                      valign="top"
                                    >
                                      <table
                                        align="center"
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="center"
                                              valign="top"
                                              class=""
                                            >
                                              <a
                                                href="https://twitter.com/corecodeio"
                                                style="text-decoration: none"
                                                target="_blank"
                                                ><img
                                                  alt="Twitter"
                                                  border="0"
                                                  height="28"
                                                  src="http://click.zoom.us/l/84442/2019-12-26/bfs1bv/84442/140021/Social_Twitter_2020.png"
                                                  style="
                                                    display: block;
                                                    font-family: 'Lato', Helvetica,
                                                      sans-serif;
                                                    font-size: 9px;
                                                    line-height: 22px;
                                                    color: #ffffff;
                                                  "
                                                  width="28"
                                              /></a>
                                            </td>
                                            <td width="12" class="">&nbsp;</td>
                                            <td
                                              align="center"
                                              valign="top"
                                              class=""
                                            >
                                              <a
                                                href="https://www.linkedin.com/company/core-code-io/"
                                                style="text-decoration: none"
                                                target="_blank"
                                                ><img
                                                  alt="LinkedIn"
                                                  border="0"
                                                  height="28"
                                                  src="http://click.zoom.us/l/84442/2019-12-26/bfs1bs/84442/140023/Social_LinkedIn_2020.png"
                                                  style="
                                                    display: block;
                                                    font-family: 'Lato', Helvetica,
                                                      sans-serif;
                                                    font-size: 9px;
                                                    line-height: 22px;
                                                    color: #ffffff;
                                                  "
                                                  width="28"
                                              /></a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="center"
                                      class="em_grayfooter"
                                      style="
                                        font-family: 'Lato', Helvetica, sans-serif;
                                        font-size: 12px;
                                        line-height: 15px;
                                        color: #828282;
                                      "
                                    >
                                      Core Code © 2023 | Todos los derechos
                                      reservados.
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
    </body>
  </html>`;
};
