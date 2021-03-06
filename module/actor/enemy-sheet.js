import { TalismanBaseActorSheet } from "./base-actor-sheet.js";

export class TalismanEnemySheet extends TalismanBaseActorSheet {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["talisman", "sheet", "actor"],
            template: "systems/talisman2/templates/actor/enemy-sheet.html",
            width: 680,
            height: 760,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "skills" }],
        });
    }

    /** @override */
    getData() {
        const data = super.getData();
        data.dtypes = ["String", "Number", "Boolean"];
        // Prepare items.
        if (this.actor.data.type == "enemy") {
            this._prepareEnemyItems(data);
            //actorData.derived.spellPoints.max = actorData.attributes.craft.value;
        }

        return data;
    }

    _prepareEnemyItems(sheetData) {
        const actorData = sheetData.actor;
        const attacks = [];
        for (let i of sheetData.items) {
            i.img = i.img || DEFAULT_TOKEN;
            if (i.type === "enemy_attack") {
                attacks.push(i);
            }
        }
        actorData.attacks = attacks;
    }
}
