let choice1 = [
    {
        type: "trait",
        name: "Corruption (Minor)",
        diff : {
            system : {
                specification : {
                    value : "Minor"
                }
            }
        }
    },
    {
        type: "trait",
        name: "Infected",
    },
    {
        type: "trait",
        name: "Territorial",
    }
]

let updateObj;
let actor;

async function addTrait(c) {
    let items = [];
    let existing;
    if (c.type == "trait") {
        existing = updateObj.items.find(i => i.name == c.name && i.type == c.type);
    }
    if (!existing) {
        let item = await game.wfrp4e.utility.find(c.name, c.type);
        if (item) {
            item = item.toObject();
            foundry.utils.mergeObject(item, c.diff);
            items.push(item);
        }
        else
            ui.notifications.warn(`Could not find ${c}`, { permanent: true });
    }
    actor.createEmbeddedDocuments("Item", items);
}

async function dialogChoice() {
    for (let c of choice1) {
        await new Dialog({
            title: "Option",
            content:
                `<p>
            Add Option?
            </p>
            <ol>
            <li>${c.name}</li>
            </ol> 
            `,
            buttons: {
                1: {
                    label: "Yes",
                    callback: () => {
                        addTrait(c)
                        c.valid = true;
                    }
                },
                2: {
                    label: "No",
                    callback: () => {
                    }
                }
            }
        }).render(true)
    }
}

updateObj = this.actor.toObject();
actor = this.actor
await dialogChoice();

