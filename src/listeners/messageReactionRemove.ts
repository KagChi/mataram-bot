import { Listener, ListenerOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { MessageReaction, User } from "discord.js";
import { botSelfRole1Id, botSelfRole2Id, botSelfRoleChannelId, botSelfRoleMessageId } from "../config";

@ApplyOptions<ListenerOptions>({
    name: "messageReactionRemove"
})

export class messageReactionRemoveEvent extends Listener {
    async run(messageReaction: MessageReaction, user: User) {
        if (messageReaction.message.id! !== botSelfRoleMessageId || user.bot || !messageReaction.message.guild) return;
        if (messageReaction.message.channelId === botSelfRoleChannelId && messageReaction.message.id === botSelfRoleMessageId) {
            if (messageReaction.emoji.name === "👩") {
                messageReaction.message.guild?.members.resolve(user)?.roles.remove(botSelfRole2Id);
            } else if (messageReaction.emoji.name === "👨") {
                messageReaction.message.guild?.members.resolve(user)?.roles.remove(botSelfRole1Id);
            }
        }
    }
}
