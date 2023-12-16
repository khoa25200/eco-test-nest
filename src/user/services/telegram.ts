import { Injectable, Logger } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TimerService {
  static bot;

  static sendToTelegram(content, chatid) {
    try {
      this.connectBot();
      if (!this.bot || !this.bot.sendMessage) return;

      this.bot.sendMessage(chatid, ` ${content}`);
    } catch (err) {
      Logger.error(err.message, '', 'Timer sendToTelegram Err');
    }
  }

  static connectBot(): any {
    try {
      const token =
        '6693408491:AAE5sYV3YThRwOI3yTjfa1zEKfVg1r5DWRw';
      if (!token) this.bot = null;

      this.bot = new TelegramBot(token, {
        polling: false
      });

      this.bot.on('polling_error', (err) => {
        Logger.error(err.message, '', 'Timer Service polling_error');
      });
      this.bot.on('webhook_error', (err) => {
        Logger.error(err.message, '', 'Timer Service webhook_error');
      });
    } catch (err) {
      Logger.error(err.message, '', 'Timer sendToTelegram Err');
    }
  }


}
