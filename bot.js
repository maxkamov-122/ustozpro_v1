const { Telegraf, Markup } = require('telegraf');

// Telegram bot tokeni
const BOT_TOKEN = '8478066852:AAH0WZDqDwG9rn3ew4eJKQYNYkm8SJVjAtg';

// Web App URL (GitHub Pages dan keyin o'zgartiring)
const WEB_APP_URL = 'https://maxkamov-122.github.io/ustozpro_v1/';

const bot = new Telegraf(BOT_TOKEN);

// Start command
bot.start(async (ctx) => {
    const userId = ctx.from.id;
    const firstName = ctx.from.first_name;
    const username = ctx.from.username || 'foydalanuvchi';
    
    const webAppUrl = `${WEB_APP_URL}?tg_id=${userId}&name=${encodeURIComponent(firstName)}`;
    
    await ctx.reply(
        `🎓 *USTOZPRO* - O'quv markazi boshqaruvi\n\n` +
        `👋 Assalomu alaykum, ${firstName}!\n` +
        `@${username} platformaga xush kelibsiz.\n\n` +
        `📱 Quyidagi tugma orqali tizimga kiring:`,
        {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.webApp('🚀 Platformani ochish', webAppUrl)],
                [Markup.button.callback('📊 Bugungi statistikam', 'my_stats')],
                [Markup.button.callback('💰 To\'lov holati', 'payment_status')]
            ])
        }
    );
});

// Statistika
bot.action('my_stats', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply(
        `📊 *Statistika*\n\n` +
        `• Bugungi davomat: *0* ta\n` +
        `• Umumiy davomat: *0%*\n` +
        `• To'lov holati: *To'g'ri*\n\n` +
        `Batafsil ma'lumot uchun platformaga kiring.`,
        { parse_mode: 'Markdown' }
    );
});

// To'lov holati
bot.action('payment_status', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply(
        `💰 *To'lov holati*\n\n` +
        `✅ Hozircha to'lov kerak emas\n` +
        `📅 Navbatdagi to'lov: - \n\n` +
        `To'lovlar haqida platformadan bilib oling.`,
        { parse_mode: 'Markdown' }
    );
});

// Help command
bot.help(async (ctx) => {
    await ctx.reply(
        `🤖 *Yordam* | *Help*\n\n` +
        `/start - Botni qayta ishga tushirish\n` +
        `/help - Yordam oynasi\n` +
        `/about - Platforma haqida\n\n` +
        `📱 Platforma: ${WEB_APP_URL}`,
        { parse_mode: 'Markdown' }
    );
});

// About command
bot.about = bot.command('about', async (ctx) => {
    await ctx.reply(
        `ℹ️ *USTOZPRO* v1.0\n\n` +
        `O'quv markazlari uchun boshqaruv tizimi.\n` +
        `✅ Davomat belgilash\n` +
        `✅ To'lovlarni boshqarish\n` +
        `✅ Real-time chat\n` +
        `✅ Statistika va hisobotlar\n\n` +
        `📧 Qo'llab-quvvatlash: @support`,
        { parse_mode: 'Markdown' }
    );
});

// Error handling
bot.catch((err, ctx) => {
    console.error(`Bot error: ${err}`);
    ctx.reply('❌ Xatolik yuz berdi. Iltimos, keyinroq urinib ko\'ring.');
});

// Start bot
bot.launch().then(() => {
    console.log('🤖 Telegram bot ishga tushdi!');
    console.log(`📱 Web App URL: ${WEB_APP_URL}`);
    console.log(`🔗 Bot username: ${bot.botInfo?.username}`);
});

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));