import { Listener, ListenerOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import chalk from "chalk";
import { botActivity, botActivityType, botSelfRoleChannelId, botSelfRoleMessageId } from "../config";
import { MessageAttachment, MessageEmbed, TextBasedChannels } from "discord.js";
import { oneCak } from "../Util/oneCakScrape";
import { get } from "superagent";
const emoji = ["😂", "🔼", "🔽"];
const reaction = ["👩", "👨"];

@ApplyOptions<ListenerOptions>({
    name: "ready",
    once: true
})

export class readyEvent extends Listener {
    async run() {
        this.container.client.user?.setActivity({
            name: botActivity,
            type: botActivityType
        });
        const selfRoleChannel = this.container.client.channels.cache.get(botSelfRoleChannelId) as TextBasedChannels;
        if (selfRoleChannel) {
            const message = await selfRoleChannel.messages.fetch(botSelfRoleMessageId);
            message.edit({
                embeds: [
                    new MessageEmbed()
                        .setColor("BLURPLE")
                        .setTitle("Self Role")
                        .setThumbnail(message.guild?.iconURL()!)
                        .setDescription("> React 👩 untuk mendapatkan <@&883612750239109181>\n> React 👨 untuk mendapatkan <@&882928013203865602>\n")
                ],
                content: null
            });
            for (const react of reaction) {
                message.react(react);
            }
        }
        const channel = this.container.client.channels.cache.get("881013594509160468") as TextBasedChannels;
        if (!channel?.isText()) return;
        setInterval(async () => {
            const image = await oneCak.getFirstImage();
            const { body } = await get(image.url).set("Referer", "https://1cak.com/").set("Referrer-Policy", "strict-origin-when-cross-origin")
                .set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9")
                .set("User-Agent", "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1");
            channel.send({
                embeds: [
                    new MessageEmbed()
                        .addField("Caption: ", image.title)
                        .setImage("attachment://image.jpg")
                        .setColor("BLURPLE")
                ],
                files: [
                    new MessageAttachment(body, "image.jpg")
                ]
            }).then(x => {
                for (const emote of emoji) {
                    x.react(emote);
                }
            });
        }, 60000).unref();

        return this.container.logger.info(chalk.green(`[CLIENT]: ${this.container.client.user?.username.toUpperCase()} CONNECTED TO DISCORD`));
    }
}
