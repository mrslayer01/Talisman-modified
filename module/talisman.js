import { DiceRoller } from "./components/dice-roller.js";
import { RollDialog } from "./components/roll-dialog.js";
import { TalismanDieBase } from "./talisman-dice.js";
import { TalismanDieKismet } from "./talisman-dice.js";

Hooks.once("init", async function () {
    game.talisman = {
        DiceRoller,
        RollDialog,
    };
    CONFIG.Dice.terms["b"] = TalismanDieBase;
    CONFIG.Dice.terms["k"] = TalismanDieKismet;

    Handlebars.registerHelper("isEqual", function (condition, value) {
        return condition == value;
    });
});

Hooks.on("renderChatMessage", (message, html) => {
    if (!message.isRoll || !message.isContentVisible) return;
    html.find(".dice-discardable").click((el) => {
        DiceRoller.updateMessage(message, html, el);
    });
});

/* -------------------------------------------- */
/*  DsN Hooks                                   */
/* -------------------------------------------- */

Hooks.on("diceSoNiceRollComplete", (chatMessageID) => {});

Hooks.once("diceSoNiceReady", (dice3d) => {
    dice3d.addColorset(
        {
            name: "talisman",
            description: "talisman/Wood",
            category: "talisman",
            foreground: "#9F8003",
            background: "#9F8",
            texture: "none",
            edge: "#9F8003",
            material: "glass",
        },
        "default"
    );

    dice3d.addSystem({ id: "talisman", name: "Talisman" }, true);
    dice3d.addDicePreset({
        type: "db",
        labels: [
            "systems/talisman/ui/dice/tdb1.png",
            "systems/talisman/ui/dice/tdb2.png",
            "systems/talisman/ui/dice/tdb3.png",
            "systems/talisman/ui/dice/tdb4.png",
            "systems/talisman/ui/dice/tdb5.png",
            "systems/talisman/ui/dice/tdb6.png",
        ],
        colorset: "talisman",
        system: "talisman",
    });
    dice3d.addDicePreset({
        type: "dk",
        labels: [
            "systems/talisman/ui/dice/tdk1.png",
            "systems/talisman/ui/dice/tdk2.png",
            "systems/talisman/ui/dice/tdk3.png",
            "systems/talisman/ui/dice/tdk4.png",
            "systems/talisman/ui/dice/tdk5.png",
            "systems/talisman/ui/dice/tdk6.png",
        ],
        colorset: "talisman",
        system: "talisman",
    });
});