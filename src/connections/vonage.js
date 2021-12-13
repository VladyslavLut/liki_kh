const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
    apiKey: "aaf30ab6",
    apiSecret: "jEOChY9o7TssjjpA"
})

const APP_NAME = "LikiKh"

module.exports = {
    vonage: vonage,
    sendSms: async (phone, text) => {
        vonage.message.sendSms(APP_NAME, phone, text, (error, responseData) => {
            if (error) {
                console.error(error);
            } else {
                if (responseData.messages[0]['status'] === "0") {
                    console.log(`Sms to ${phone} send successfully. Message: ${text}`)
                } else {
                    console.log(`Failed to send sms to ${phone}. Error: ${responseData.messages[0]['error-text']}`)
                }
            }
        })
    }
}