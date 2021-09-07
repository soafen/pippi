const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const { DiscordTogether } = require('discord-together');
const d = new Date;
const date = d.toDateString() + ' ' + d.getHours() + ':' + d.getMinutes();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.discordTogether = new DiscordTogether(client);
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
	client.user.setPresence({ activities: [{ name: 'osu!' }], status: 'dnd' });
});

// never publish your tokens on github kids !
client.login(token);

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	try {
		console.log(`${date} [CMD] [${interaction.guild.name} - #${interaction.channel.name}] <${interaction.user.tag}> /${interaction.commandName}`);
	}
	catch (error) {
		console.error(`${date} [ERR] `, error);
	}

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});