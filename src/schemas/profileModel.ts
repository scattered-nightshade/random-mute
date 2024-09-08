import { model, Schema, Document } from 'mongoose';

export interface IProfile extends Document {
    userID: string;
    guildID: string;
    coins: number;
    messageCount: number;
    muteCount: number;
}

const profileSchema = new Schema({
    userID: { type: Schema.Types.String, required: true, unique: true },
    guildID: { type: Schema.Types.String, required: true },
    coins: { type: Schema.Types.Number, default: 0 },
    messageCount: { type: Schema.Types.Number, default: 0 },
    muteCount: { type: Schema.Types.Number, default: 0 },
}, { timestamps: true });

const ProfileModel = model<IProfile>('profiles', profileSchema);

class Profile {
    userID: string;
    guildID: string;
    coins: number;
    messageCount: number;
    muteCount: number;

    constructor(userID: string, guildID: string, coins: number, messageCount: number, muteCount: number) {
        this.userID = userID;
        this.guildID = guildID;
        this.coins = coins;
        this.messageCount = messageCount; 
        this.muteCount = muteCount;
    }

    static async getAllProfiles(): Promise<IProfile[]> {
        return ProfileModel.find();
    }

    static async getProfileById(userID: string, guildID: string): Promise<IProfile | null> {
        return ProfileModel.findOneAndUpdate({ userID, guildID }, { userID, guildID }, { upsert: true, new: true });
    }

    static async getProfilesByUser(userID: string): Promise<IProfile[]> {
        return ProfileModel.find({ userID });
    }

    static async getProfilesByGuild(guildID: string): Promise<IProfile[]> {
        return ProfileModel.find({ guildID });
    }

    async save(): Promise<IProfile> {

        const profile = new ProfileModel({
            userID: this.userID,
            guildID: this.guildID,
            coins: this.coins,
            messageCount: this.messageCount,
            muteCount: this.muteCount,
        });

        return profile.save();
    }

    static async updateProfile(userID: string, guildID: string, update: Partial<IProfile>): Promise<IProfile | null> {
        return ProfileModel.findOneAndUpdate({ userID, guildID }, update, { new: true });
    }

    static async deleteProfile(userID: string, guildID: string): Promise<IProfile | null> {
        return ProfileModel.findOneAndDelete({ userID, guildID });
    }

}

export default Profile;