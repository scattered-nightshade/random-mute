import { ChatInputCommandInteraction, CommandInteraction, CommandInteractionOptionResolver, EmbedBuilder, GuildMember, PermissionFlagsBits, PermissionsBitField, SlashCommandBuilder, TextChannel } from 'discord.js';
import { InteractionCommand } from '../../../classes/command';
import { randomHexColour } from '../../../modules/random';
import Profile from '../../../schemas/profileModel';

export class WarnCommand extends InteractionCommand {
    constructor() {
        super();
        this.name = 'unmute';
        this.description = 'Unmute a Member';
        this.data = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .setNSFW(this.nsfw)
            .addUserOption(option => 
                option.setName('member')
                    .setDescription('The member\'s stats to get')
                    .setRequired(false)
            )
            .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    }

    async execute(interaction: ChatInputCommandInteraction): Promise<any> {
        let member = interaction.options.getMember('member') as GuildMember | null;

        if (!member) {
            member = interaction.member as GuildMember;
        }

        member.timeout(null, 'Unmuted by moderator')

        const embed = new EmbedBuilder()
            .setTitle(`<@${member.id}>`)
            .setImage(member.avatar)
            .setDescription(`Unmuted <@${member.id}>`)
            .setColor(randomHexColour())
        
        interaction.reply({ embeds: [embed]})
    }
}

export default new WarnCommand();