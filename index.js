const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(cors({
	origin: 'https://dmca-ui.vercel.app',
}));

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'roma@incorporatenow.com',
		pass: 'lolb molr njzf xvig'
	}
});

app.post('/send-email', (req, res) => {
	const { to, subject, text, html } = req.body;

	const mailOptions = {
		from: 'roma@incorporatenow.com',
		to: to, // Кому отправляем
		subject: subject, // Тема письма
		text: text, // Текст письма
		html: html // HTML версия письма
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error('Ошибка при отправке письма:', error, info);
			return res.status(500).send('Ошибка при отправке письма');
		}
		console.log('Письмо успешно отправлено:', info.response);
		res.send('Письмо успешно отправлено');
	});
});

app.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}`);
});
