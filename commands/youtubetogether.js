const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('youtubetogether')
		.setDescription('Start a YouTube Together session in a Voice Channel.'),
	async execute(interaction) {
		if (interaction.member.voice.channel) {
			interaction.client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'youtube').then(async invite => {
				return interaction.reply(`${invite.code}`);
			});
		}
	},
};
