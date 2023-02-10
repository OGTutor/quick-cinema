import { ITelegramOptions } from 'src/telegram/telegram.interface';

export const getTelegramConfig = (): ITelegramOptions => ({
	chatId: process.env.TELEGRAM_CHAT_ID,
	token: process.env.TELEGRAM_TOKEN,
});
