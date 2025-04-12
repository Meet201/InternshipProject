const mailer = require('nodemailer');

const sendingMail = async(to,subject,text) => {

    const transporter = mailer.createTransport({
        service: 'gmail',
        auth:{
            user:"meetmachhi2110@gmail.com",
            pass:"qbef utqx bpwn uxss"
        }
    })

    const mailOptions = {
        from: 'meetmachhi2110@gmail.com',
        to: to,
        subject: subject,
        //text: text
        html:text
    }

    const mailresponse = await transporter.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;

}

module.exports ={
    sendingMail
}