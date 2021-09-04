import { Listener, ListenerOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { GuildMember, MessageEmbed, TextBasedChannels } from "discord.js";
import { botWelcomeChannelId } from "../config";


@ApplyOptions<ListenerOptions>({
    name: "guildMemberRemove"
})

export class guildMemberRemoveEvent extends Listener {
    async run(member: GuildMember) {
        const channel = member.guild.channels.cache.get(botWelcomeChannelId) as TextBasedChannels;
        channel.send({
            embeds: [
                new MessageEmbed()
                    .setDescription(`🎑 | Sepertinya ${member.user.username} tidak nyaman di server ini, ${member.user.username} keluar dari server.`)
                    .setColor("BLURPLE")
                    .setFooter(`Member di server ini: ${member.guild.memberCount}`, member.guild.iconURL()!)
            ]
        });
    }
}
