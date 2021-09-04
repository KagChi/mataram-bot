import { ActivityType, Snowflake } from "discord.js";
export const botOwners: string[] = JSON.parse(process.env.OWNERS!);
export const botPrefix = process.env.PREFIX || "b!";
export const botActivity = process.env.ACTIVITY || "Sapphire bot template";
export const botActivityType: ActivityType = (process.env.ACTIVITY_TYPE as ActivityType | undefined) || "WATCHING";
export const botSelfRoleChannelId: Snowflake = "883613368794116096";
export const botSelfRoleMessageId: Snowflake = "883613644099825685";
export const botSelfRole1Id: Snowflake = "882928013203865602";
export const botSelfRole2Id: Snowflake = "883612750239109181";
