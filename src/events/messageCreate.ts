import { EmbedBuilder, Events, GuildMember, Message, TextChannel, User } from 'discord.js';
import BotEvent from '../classes/event';
import { config } from 'dotenv';
import { randomIntInRange } from '../modules/random';
import Profile, { IProfile } from '../schemas/profileModel';

config();

class MessageCreate extends BotEvent {

    constructor() {
        super();
        this.name = Events.MessageCreate;
    }

    async execute(message: Message) {

        let member: GuildMember | null = message.member;

        if (!member){
            return;
        }

        const memberProfile: IProfile | null = await Profile.getProfileById(member.user.id, member.guild.id);

        if (!memberProfile) {
            return;
        }

        if (randomIntInRange(0,1) == 1) {
            member.timeout(3600000, "They took the risk");

            memberProfile.messageCount += 1;
            memberProfile.muteCount += 1;

            memberProfile.save();
        }
        else {
            memberProfile.coins += 1;
            memberProfile.messageCount += 1;

            memberProfile.save();
        }
    }
}

export default new MessageCreate();     