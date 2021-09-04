import { Listener, ListenerOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { GuildMember, MessageEmbed, TextBasedChannels } from "discord.js";
import { botWelcomeChannelId } from "../config";


@ApplyOptions<ListenerOptions>({
    name: "guildMemberAdd"
})

export class guildMemberAddEvent extends Listener {
    async run(member: GuildMember) {
        const channel = member.guild.channels.cache.get(botWelcomeChannelId) as TextBasedChannels;
        channel.send({
            embeds: [
                new MessageEmbed()
                    .setDescription(`🎉 | Semuanya beri sambut ${member.user.username}, ${member.user.username} telah masuk ke server ini.`)
                    .setColor("BLURPLE")
                    .setFooter(`Member di server ini: ${member.guild.memberCount}`, member.guild.iconURL()!)
            ]
        });
    }
}
