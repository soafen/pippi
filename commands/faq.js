const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('faq')
		.setDescription('Various FAQs accessible from the bot.')
		.addStringOption(option =>
			option.setName('topic')
				.setDescription('The topic to reply.')
				.setRequired(true)
				.addChoice('Why are there so many bots chatting in #general?', 'faq_bots')),
	async execute(interaction) {
		const chosentopic = interaction.options.getString('topic');
		if (chosentopic === 'faq_bots') {
			await interaction.reply('this discord server is bridged to a matrix room (accessible from the channel topic). matrix chatters are shown as webhooks here on discord, hence the "BOT" tag.');
		}
	},
};
