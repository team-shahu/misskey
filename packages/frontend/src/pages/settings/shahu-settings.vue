<!--
SPDX-FileCopyrightText: chan-mai
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<div class="_gaps_m">
	<FormSection>
		<div class="_gaps_s">
			<FormLink to="/settings/post-form">{{ i18n.ts.postForm }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></FormLink>
		</div>
	</FormSection>
	<FormSection>
		<template #label>{{ i18n.ts.display }}</template>

		<div class="_gaps_m">
			<MkFolder>
				<template #icon><i class="ti ti-eye"></i></template>
				<template #label>{{ i18n.ts.displayOfNote }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
				<template v-if="displaySettingsForm.modified.value" #footer>
					<MkFormFooter :form="displaySettingsForm"/>
				</template>

				<div class="_gaps_s">
					<MkSelect v-model="displaySettingsForm.state.hideReactionCount">
						<template #label>{{ i18n.ts.hideReactionCount }}</template>
						<option value="none">{{ i18n.ts._hideReactionCount.none }}</option>
						<option value="self">{{ i18n.ts._hideReactionCount.self }}</option>
						<option value="others">{{ i18n.ts._hideReactionCount.others }}</option>
						<option value="all">{{ i18n.ts._hideReactionCount.all }}</option>
					</MkSelect>
					<MkSwitch v-model="displaySettingsForm.state.hideReactionUsers">
						<template #caption>{{ i18n.ts.hideReactionUsersDescription }}</template>
						{{ i18n.ts.hideReactionUsers }}
					</MkSwitch>

					<MkSwitch v-if="instance.federation !== 'none' && instanceTicker !== 'none'" v-model="displaySettingsForm.state.instanceIcon">
						<template #caption>{{ i18n.ts.instanceIconDescription }}</template>
						{{ i18n.ts.instanceIcon }}
					</MkSwitch>

					<MkSwitch v-model="displaySettingsForm.state.disableNoteNyaize">{{ i18n.ts.disableNoteNyaize }}</MkSwitch>
				</div>
			</MkFolder>

			<MkFolder>
				<template #icon><i class="ti ti-heart"></i></template>
				<template #label>{{ i18n.ts.like }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
				<template v-if="likeSettingsForm.modified.value" #footer>
					<MkFormFooter :form="likeSettingsForm"/>
				</template>

				<div class="_gaps_m">
					<MkSwitch v-model="likeSettingsForm.state.showLikeButton">{{ i18n.ts.showLikeButton }}</MkSwitch>

					<FromSlot v-model="likeSettingsForm.state.selectReaction">
						<template #label>{{ i18n.ts.selectReaction }}</template>
						<MkCustomEmoji v-if="likeSettingsForm.state.selectReaction && likeSettingsForm.state.selectReaction.startsWith(':')" style="max-height: 3em; font-size: 1.1em;" :useOriginalSize="false" :name="likeSettingsForm.state.selectReaction" :normal="true" :noStyle="true"/>
						<MkEmoji v-else-if="likeSettingsForm.state.selectReaction && !likeSettingsForm.state.selectReaction.startsWith(':')" :emoji="likeSettingsForm.state.selectReaction" style="max-height: 3em; font-size: 1.1em;" :normal="true" :noStyle="true"/>
						<span v-else-if="!likeSettingsForm.state.selectReaction">{{ i18n.ts.notSet }}</span>
						<div class="_buttons" style="padding-top: 8px;">
							<MkButton rounded :small="true" inline @click="chooseNewReaction"><i class="ti ti-mood-happy"></i> Change</MkButton>
							<MkButton rounded :small="true" inline @click="resetReaction"><i class="ti ti-reload"></i> Reset</MkButton>
						</div>
					</FromSlot>
				</div>
			</MkFolder>

			<MkFolder>
				<template #icon><i class="ti ti-typography"></i></template>
				<template #label>{{ i18n.ts.customFont }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
				<template v-if="appearanceSettingsForm.modified.value" #footer>
					<MkFormFooter :form="appearanceSettingsForm"/>
				</template>

				<div class="_gaps_m">
					<MkSelect v-model="appearanceSettingsForm.state.customFont">
						<template #label>{{ i18n.ts.customFont }}</template>
						<option :value="null">{{ i18n.ts.default }}</option>
						<option v-for="[name, font] of Object.entries(fontList)" :value="name">{{ font.name }}</option>
					</MkSelect>
				</div>
			</MkFolder>
		</div>
	</FormSection>

	<FormSection>
		<template #label>{{ i18n.ts.behavior }}</template>

		<div class="_gaps_m">
			<MkFolder>
				<template #icon><i class="ti ti-settings"></i></template>
				<template #label>{{ i18n.ts.reaction }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
				<template v-if="behaviorSettingsForm.modified.value" #footer>
					<MkFormFooter :form="behaviorSettingsForm"/>
				</template>

				<div class="_gaps_s">
					<MkSwitch v-model="behaviorSettingsForm.state.reactionChecksMuting">
						{{ i18n.ts._reactionChecksMuting.title }}
						<template #caption>{{ i18n.ts._reactionChecksMuting.caption }}</template>
					</MkSwitch>
				</div>
			</MkFolder>
		</div>
	</FormSection>

	<FormSection>
		<template #label>{{ i18n.ts.otherSettings }}</template>

		<div class="_gaps_m">
			<MkFolder>
				<template #icon><i class="ti ti-user-off"></i></template>
				<template #label>{{ i18n.ts._profileHiddenSettings.hiddenProfile }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
				<template v-if="profileHiddenSettingsForm.modified.value" #footer>
					<MkFormFooter :form="profileHiddenSettingsForm"/>
				</template>

				<div class="_gaps_m">
					<div class="_buttons">
						<MkButton inline @click="enableAllHidden">{{ i18n.ts.enableAll }}</MkButton>
						<MkButton inline @click="disableAllHidden">{{ i18n.ts.disableAll }}</MkButton>
					</div>
					<MkSwitch v-model="profileHiddenSettingsForm.state.hiddenPinnedNotes">
						<template #caption>{{ i18n.ts._profileHiddenSettings.hiddenPinnedNotesDescription }}</template>
						{{ i18n.ts._profileHiddenSettings.hiddenPinnedNotes }}
					</MkSwitch>
					<MkSwitch v-model="profileHiddenSettingsForm.state.hiddenActivity">
						<template #caption>{{ i18n.ts._profileHiddenSettings.hiddenActivityDescription }}</template>
						{{ i18n.ts._profileHiddenSettings.hiddenActivity }}
					</MkSwitch>
					<MkSwitch v-model="profileHiddenSettingsForm.state.hiddenFiles">
						<template #caption>{{ i18n.ts._profileHiddenSettings.hiddenFilesDescription }}</template>
						{{ i18n.ts._profileHiddenSettings.hiddenFiles }}
					</MkSwitch>
				</div>
			</MkFolder>

			<MkFolder>
				<template #icon><i class="ti ti-timeline"></i></template>
				<template #label>{{ i18n.ts.timeline }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
				<template v-if="timelineSettingsForm.modified.value" #footer>
					<MkFormFooter :form="timelineSettingsForm"/>
				</template>

				<div class="_gaps_m">
					<MkSwitch v-model="timelineSettingsForm.state.hideLocalTimeLine">{{ i18n.ts.hideLocalTimeLine }}</MkSwitch>
					<MkSwitch v-model="timelineSettingsForm.state.hideSocialTimeLine">{{ i18n.ts.hideSocialTimeLine }}</MkSwitch>
					<MkSwitch v-model="timelineSettingsForm.state.hideGlobalTimeLine">{{ i18n.ts.hideGlobalTimeLine }}</MkSwitch>
				</div>
			</MkFolder>

			<MkFolder>
				<template #icon><i class="ti ti-robot"></i></template>
				<template #label>{{ i18n.ts._llm.title }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
				<template v-if="llmSettingsForm.modified.value" #footer>
					<MkFormFooter :form="llmSettingsForm"/>
				</template>

				<div class="_gaps_m">
					<MkSwitch v-model="llmSettingsForm.state.useGeminiLLMAPI" :disabled="!$i?.policies.canUseGeminiLLMAPI">
						{{ i18n.ts._llm.useGeminiLLMAPI }}
						<template #caption>{{ i18n.ts._llm.useGeminiLLMAPIDescription }}</template>
					</MkSwitch>

					<MkInput v-model="llmSettingsForm.state.geminiToken" type="text" :disabled="llmSettingsForm.state.useGeminiLLMAPI">
						<template #label>{{ i18n.ts._llm.geminiTokenLabel }}</template>
						<template #caption>{{ i18n.ts._llm.geminiTokenCaption }}</template>
					</MkInput>

					<MkSelect v-model="llmSettingsForm.state.geminiModels" :disabled="llmSettingsForm.state.useGeminiLLMAPI">
						<template #label>{{ i18n.ts._llm.geminiModelLabel }}</template>
						<option value="gemini-2.0-flash">gemini-2.0-flash</option>
						<option value="gemini-1.5-flash">gemini-1.5-flash</option>
						<option value="gemini-1.5-pro">gemini-1.5-pro</option>
						<option value="gemini-2.0-pro-exp-02-05">gemini-2.0-pro-exp-02-05</option>
					</MkSelect>

					<MkInput v-model="llmSettingsForm.state.geminiSystemPrompt" type="text">
						<template #label>{{ i18n.ts._llm.geminiSystemPromptLabel }}</template>
						<template #caption>{{ i18n.ts._llm.geminiSystemPromptCaption }}</template>
					</MkInput>

					<MkInput v-model="llmSettingsForm.state.geminiPromptNote" type="text">
						<template #label>{{ i18n.ts._llm.geminiSummarizePromptLabel }}</template>
						<template #caption>{{ i18n.ts._llm.geminiSummarizePromptCaption }}</template>
					</MkInput>

					<MkInput v-model="llmSettingsForm.state.geminiPromptProfile" type="text">
						<template #label>{{ i18n.ts._llm.geminiProfileSummarizePromptLabel }}</template>
						<template #caption>{{ i18n.ts._llm.geminiProfileSummarizePromptCaption }}</template>
					</MkInput>

					<MkFolder>
						<template #icon><i class="ti ti-info"></i></template>
						<template #label>{{ i18n.ts._llm.notesPrompt }}</template>

						<div class="_gaps_m">
							<MkInput v-model="llmSettingsForm.state.geminiNoteLongText" type="text">
								<template #label>{{ i18n.ts._llm.geminiNoteLongText }}</template>
							</MkInput>

							<MkInput v-model="llmSettingsForm.state.geminiNoteShortText" type="text">
								<template #label>{{ i18n.ts._llm.geminiNoteShortText }}</template>
							</MkInput>

							<MkInput v-model="llmSettingsForm.state.geminiNoteSimpleText" type="text">
								<template #label>{{ i18n.ts._llm.geminiNoteSimpleText }}</template>
							</MkInput>

							<MkInput v-model="llmSettingsForm.state.geminiNoteCasualText" type="text">
								<template #label>{{ i18n.ts._llm.geminiNoteCasualText }}</template>
							</MkInput>

							<MkInput v-model="llmSettingsForm.state.geminiNoteProfessionalText" type="text">
								<template #label>{{ i18n.ts._llm.geminiNoteProfessionalText }}</template>
							</MkInput>

							<MkInput v-model="llmSettingsForm.state.geminiNoteCatText" type="text">
								<template #label>{{ i18n.ts._llm.geminiNoteCatText }}</template>
							</MkInput>

							<MkInput v-model="llmSettingsForm.state.geminiNoteCustomText" type="text">
								<template #label>{{ i18n.ts._llm.geminiNoteCustomText }}</template>
							</MkInput>
						</div>
					</MkFolder>
				</div>
			</MkFolder>
		</div>
	</FormSection>
</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import * as Misskey from 'misskey-js';
import MkInput from '@/components/MkInput.vue';
import MkSwitch from '@/components/MkSwitch.vue';
import MkSelect from '@/components/MkSelect.vue';
import MkFolder from '@/components/MkFolder.vue';
import MkButton from '@/components/MkButton.vue';
import FormSection from '@/components/form/section.vue';
import FormLink from '@/components/form/link.vue';
import FromSlot from '@/components/form/slot.vue';
import MkCustomEmoji from '@/components/global/MkCustomEmoji.vue';
import MkEmoji from '@/components/global/MkEmoji.vue';
import MkFormFooter from '@/components/MkFormFooter.vue';
import { prefer } from '@/preferences.js';
import * as os from '@/os.js';
import { reloadAsk } from '@/utility/reload-ask.js';
import { i18n } from '@/i18n.js';
import { definePage } from '@/page.js';
import { fontList } from '@/utility/font';
import { instance } from '@/instance.js';
import { $i } from '@/i.js';
import { useForm } from '@/use/use-form.js';

const instanceTicker = prefer.s.instanceTicker;

// フォームの定義
const displaySettingsForm = useForm({
	hideReactionCount: prefer.s.hideReactionCount,
	hideReactionUsers: prefer.s.hideReactionUsers,
	instanceIcon: prefer.s.instanceIcon,
	disableNoteNyaize: prefer.s.disableNoteNyaize,
}, async (state) => {
	prefer.commit('hideReactionCount', state.hideReactionCount);
	prefer.commit('hideReactionUsers', state.hideReactionUsers);
	prefer.commit('instanceIcon', state.instanceIcon);
	prefer.commit('disableNoteNyaize', state.disableNoteNyaize);
	await reloadAsk({ reason: i18n.ts.reloadToApplySetting, unison: true });
});

const likeSettingsForm = useForm({
	showLikeButton: prefer.s.showLikeButton,
	selectReaction: prefer.s.selectReaction || '',
}, async (state) => {
	prefer.commit('showLikeButton', state.showLikeButton);
	prefer.commit('selectReaction', state.selectReaction);
	await reloadAsk({ reason: i18n.ts.reloadToApplySetting, unison: true });
});

const appearanceSettingsForm = useForm({
	customFont: prefer.s.customFont,
}, async (state) => {
	prefer.commit('customFont', state.customFont);
	await reloadAsk({ reason: i18n.ts.reloadToApplySetting, unison: true });
});

const behaviorSettingsForm = useForm({
	reactionChecksMuting: prefer.s.reactionChecksMuting,
}, async (state) => {
	prefer.commit('reactionChecksMuting', state.reactionChecksMuting);
	await reloadAsk({ reason: i18n.ts.reloadToApplySetting, unison: true });
});

const profileHiddenSettingsForm = useForm({
	hiddenPinnedNotes: prefer.s.hiddenPinnedNotes,
	hiddenActivity: prefer.s.hiddenActivity,
	hiddenFiles: prefer.s.hiddenFiles,
}, async (state) => {
	prefer.commit('hiddenPinnedNotes', state.hiddenPinnedNotes);
	prefer.commit('hiddenActivity', state.hiddenActivity);
	prefer.commit('hiddenFiles', state.hiddenFiles);
	await reloadAsk({ reason: i18n.ts.reloadToApplySetting, unison: true });
});

const timelineSettingsForm = useForm({
	hideLocalTimeLine: prefer.s.hideLocalTimeLine,
	hideSocialTimeLine: prefer.s.hideSocialTimeLine,
	hideGlobalTimeLine: prefer.s.hideGlobalTimeLine,
}, async (state) => {
	prefer.commit('hideLocalTimeLine', state.hideLocalTimeLine);
	prefer.commit('hideSocialTimeLine', state.hideSocialTimeLine);
	prefer.commit('hideGlobalTimeLine', state.hideGlobalTimeLine);
	await reloadAsk({ reason: i18n.ts.reloadToApplySetting, unison: true });
});

const llmSettingsForm = useForm({
	useGeminiLLMAPI: prefer.s.useGeminiLLMAPI,
	geminiToken: prefer.s.geminiToken || '',
	geminiModels: prefer.s.geminiModels || 'gemini-2.0-flash',
	geminiSystemPrompt: prefer.s.geminiSystemPrompt || '',
	geminiPromptNote: prefer.s.geminiPromptNote || '',
	geminiPromptProfile: prefer.s.geminiPromptProfile || '',
	geminiNoteLongText: prefer.s.geminiNoteLongText || '',
	geminiNoteShortText: prefer.s.geminiNoteShortText || '',
	geminiNoteSimpleText: prefer.s.geminiNoteSimpleText || '',
	geminiNoteCasualText: prefer.s.geminiNoteCasualText || '',
	geminiNoteProfessionalText: prefer.s.geminiNoteProfessionalText || '',
	geminiNoteCatText: prefer.s.geminiNoteCatText || '',
	geminiNoteCustomText: prefer.s.geminiNoteCustomText || '',
}, async (state) => {
	prefer.commit('useGeminiLLMAPI', $i?.policies.canUseGeminiLLMAPI ? state.useGeminiLLMAPI : false);
	prefer.commit('geminiToken', state.geminiToken);
	prefer.commit('geminiModels', state.geminiModels);
	prefer.commit('geminiSystemPrompt', state.geminiSystemPrompt);
	prefer.commit('geminiPromptNote', state.geminiPromptNote);
	prefer.commit('geminiPromptProfile', state.geminiPromptProfile);
	prefer.commit('geminiNoteLongText', state.geminiNoteLongText);
	prefer.commit('geminiNoteShortText', state.geminiNoteShortText);
	prefer.commit('geminiNoteSimpleText', state.geminiNoteSimpleText);
	prefer.commit('geminiNoteCasualText', state.geminiNoteCasualText);
	prefer.commit('geminiNoteProfessionalText', state.geminiNoteProfessionalText);
	prefer.commit('geminiNoteCatText', state.geminiNoteCatText);
	prefer.commit('geminiNoteCustomText', state.geminiNoteCustomText);
	await reloadAsk({ reason: i18n.ts.reloadToApplySetting, unison: true });
});

function chooseNewReaction(ev: MouseEvent) {
	os.pickEmoji(getHTMLElement(ev), {
		showPinned: false,
	}).then(async (emoji) => {
		likeSettingsForm.state.selectReaction = emoji as string;
	});
}

function resetReaction() {
	likeSettingsForm.state.selectReaction = '';
}

function getHTMLElement(ev: MouseEvent): HTMLElement {
	const target = ev.currentTarget ?? ev.target;
	return target as HTMLElement;
}

function enableAllHidden() {
	profileHiddenSettingsForm.state.hiddenPinnedNotes = true;
	profileHiddenSettingsForm.state.hiddenActivity = true;
	profileHiddenSettingsForm.state.hiddenFiles = true;
}

function disableAllHidden() {
	profileHiddenSettingsForm.state.hiddenPinnedNotes = false;
	profileHiddenSettingsForm.state.hiddenActivity = false;
	profileHiddenSettingsForm.state.hiddenFiles = false;
}

const headerActions = computed(() => []);
const headerTabs = computed(() => []);

definePage(() => ({
	title: 'shahu-fork',
	icon: 'ti ti-adjustments',
}));
</script>
