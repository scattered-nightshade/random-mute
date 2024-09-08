import { EmbedBuilder, Events, GuildMember, Message, TextChannel, User } from 'discord.js';
import BotEvent from '../classes/event';
import { config } from 'dotenv';
import { randomIntInRange } from '../modules/random';

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

        if (randomIntInRange(0,1) == 1) {
            member.timeout(3600000, "They took the risk")
        }   
    }
}

export default new MessageCreate();     