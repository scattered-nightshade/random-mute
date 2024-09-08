import { ChatInputCommandInteraction, CommandInteraction, CommandInteractionOptionResolver, EmbedBuilder, GuildMember, PermissionFlagsBits, SlashCommandBuilder, TextChannel } from 'discord.js';
import { InteractionCommand } from '../../../classes/command';
import { randomHexColour } from '../../../modules/random';
import Profile from '../../../schemas/profileModel';

export class WarnCommand extends InteractionCommand {
    constructor() {
        super();
        this.name = 'warn';
        this.description = 'placeholder';
        this.data = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .setNSFW(this.nsfw)
            .addUserOption(option => 
                option.setName('member')
                    .setDescription('The member\'s stats to get')
                    .setRequired(false)
            )
    }

    async execute(interaction: ChatInputCommandInteraction): Promise<any> {
        let member = interaction.options.getMember('member') as GuildMember | null;

        if (!member) {
            member = interaction.member as GuildMember;
        }

        const profile = await Profile.getProfileById(member.user.id, member.guild.id);

        if (!profile) {
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle(`<@${member.id}>`)
            .setImage(member.avatar)
            .addFields(
                { name: 'Coins:', value: `${profile.coins}`},
                { name: 'Messages Sent:', value: `${profile.messageCount}`},
                { name: 'Mutes:', value: `${profile.muteCount}`}    
            )
            .setColor(randomHexColour())
        
        interaction.reply({ embeds: [embed]})
    }
}

export default new WarnCommand();