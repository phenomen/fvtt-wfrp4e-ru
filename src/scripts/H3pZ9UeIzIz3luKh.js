args.actor.addCondition("bleeding");

this.actor.setFlag("wfrp4e", "isAttached", args.actor.name);

this.script.scriptMessage(`Прикрепляется к <strong>${args.actor.name}</strong>`);
