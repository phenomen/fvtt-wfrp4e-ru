const eye = await fromUuid("Compendium.wfrp4e-core.items.weczkAMPlTjX7lqU");
const nose = await fromUuid("Compendium.wfrp4e-core.items.SpPRZZRHxly7uo2G");
this.actor.createEmbeddedDocuments("Item", [eye, nose]);
