if (args.item.type !== "weapon") return

const reach = args.item.reach.value;
let reachNum = game.wfrp4e.config.reachNum[reach];
reachNum = Math.min(reachNum + 2, 7);

const key = game.wfrp4e.utility.findKey(reachNum, game.wfrp4e.config.reachNum);

args.item.reach.value = key;
