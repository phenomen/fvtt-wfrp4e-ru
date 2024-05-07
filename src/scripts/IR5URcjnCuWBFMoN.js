// If a full dose is imbibed,
// the victim must pass a Hard (-20) Endurance Test.

const test = await this.actor.setupSkill(game.i18n.localize("NAME.Endurance"), {
	fields: { difficulty: "hard" },
});
await test.roll();
if (test.failed) {
	this.script.scriptMessage(
		`<p><strong>${this.actor.prototypeToken.name}</strong> не замечает ничего необычного, кроме того что быстрее устаёт. В этот момент жертву еще можно спасти с помощью мощного противоядий или магических средств.</p>
    <p>Однако, как только персонаж заснёт, это станет почти невозможным. В этот момент жертва должна пройти <strong>тяжелую (-20) проверку стойкости</strong>. В случае провала жертва никогда не очнётся.</p>`,
		{
			whisper: ChatMessage.getWhisperRecipients("GM"),
			blind: true,
		},
	);
}
return test.failed;
