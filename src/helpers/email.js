const nodemailer = require("nodemailer");

class EmailManager {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: "calasalde@gmail.com",
        pass: "mgbb omgo irwr tbuc",
      },
    });
  }

  // async enviarCorreoCompra(email, first_name, ticket) {
  //   try {
  //     const mailOptions = {
  //       from: "calasalde@gmail.com",
  //       to: email,
  //       subject: "Confirmación de compra",
  //       html: `
  //                   <h1>Confirmación de compra</h1>
  //                   <p>Gracias por tu compra, ${first_name}!</p>
  //                   <p>El número de tu orden es: ${ticket}</p>
  //               `,
  //     };
  //     await this.transporter.sendMail(mailOptions);
  //   } catch (error) {
  //     console.error("Error al enviar el correo electrónico:", error);
  //   }
  // }

  async enviarCorreoCompra(email, first_name) {
    try {
      const mailOptions = {
        from: "calasalde@gmail.com",
        to: email,
        subject: "Confirmación de compra",
        html: `
                    <h1>Confirmación de compra</h1>
                    <p>Gracias por tu compra, ${first_name}!</p>
                `,
      };
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error al enviar el correo electrónico:", error);
    }
  }


  async enviarCorreoRestablecimiento(email, first_name, token) {
    try {
      const mailOptions = {
        from: "calasalde@gmail.com",
        to: email,
        subject: "Restablecimiento de Contraseña",
        html: `
                    <h1>Restablecimiento de Contraseña</h1>
                    <p>Hola ${first_name},</p>
                    <p>Has solicitado restablecer tu contraseña. Utiliza el siguiente código para cambiar tu contraseña:</p>
                    <p><strong>${token}</strong></p>
                    <p>Este código expirará en 1 hora.</p>
                    <a href="${process.env.BASE_URL}views/password">Restablecer Contraseña</a>
                    <p>Si no solicitaste este restablecimiento, ignora este correo.</p>
                `,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error al enviar correo electrónico:", error);
      throw new Error("Error al enviar correo electrónico");
    }
  }

  async sendDeletedProductEmail(user, product) {
    try {
      const mailOptions = {
        from: "calasalde@gmail.com",
        to: user.email,
        subject: "Uno de tus productos fue eliminado!",
        html: `
                    <h1>Hola ${user.first_name},</h1>
                    <p>Uno de tus productos fue eliminado de nuestra tienda.</p>
                    <p>El producto es: <strong>${product.title}</strong></p>
                `,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error al enviar correo electrónico:", error);
      throw new Error("Error al enviar correo electrónico");
    }
  }

  async sendDeletedUserMail(user) {
    console.log("user in mail:", user);
    try {
      const mailOptions = {
        from: "calasalde@gmail.com",
        to: user.email,
        subject: "Tu usuario fue eliminado!!",
        html: `
                    <h2>Hola ${user.first_name},</h2>
                    <p>Tu usuario fue eliminado de nuestra base de datos por inactividad.</p>
                    <p>El periodo de inactividad es de 2 dias. Luego de esto nos guardamos el derecho de eliminar usuarios inactivos.</p>
                    <p>Te invitamos a crearte un nuevo usuario!</p>
                `,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error al enviar correo electrónico:", error);
      throw new Error("Error al enviar correo electrónico");
    }
  }
}

module.exports = EmailManager;
