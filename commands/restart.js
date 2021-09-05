const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('restart')
		.setDescription('Restarts pippi. (soafen only)'),
	async execute(interaction) {
		if (interaction.user.id === '833219268911955968') {
			await interaction.reply('Restarting!');
			process.exit();
		}
		else {
			await interaction.reply('You aren\'t soafen, silly!');
		}
	},
};
