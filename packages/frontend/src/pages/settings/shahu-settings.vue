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
		<template #label>{{ i18n.ts.displayOfNote }}</template>

		<div class="_gaps_m">
			<div class="_gaps_s">
				<MkSelect v-model="hideReactionCount">
					<template #label>{{ i18n.ts.hideReactionCount }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
					<option value="none">{{ i18n.ts._hideReactionCount.none }}</option>
					<option value="self">{{ i18n.ts._hideReactionCount.self }}</option>
					<option value="others">{{ i18n.ts._hideReactionCount.others }}</option>
					<option value="all">{{ i18n.ts._hideReactionCount.all }}</option>
				</MkSelect>
				<MkSwitch v-model="hideReactionUsers">
					<template #caption>{{ i18n.ts.hideReactionUsersDescription }}</template>
					{{ i18n.ts.hideReactionUsers }}
					<span class="_beta">{{ i18n.ts.originalFeature }}</span>
				</MkSwitch>
			</div>

			<MkSwitch v-if="instance.federation !== 'none' && instanceTicker !== 'none'" v-model="instanceIcon">
				<template #caption>{{ i18n.ts.instanceIconDescription }}</template>
				{{ i18n.ts.instanceIcon }}
				<span class="_beta">{{ i18n.ts.originalFeature }}</span>
			</MkSwitch>

			<MkSwitch v-model="disableNoteNyaize">{{ i18n.ts.disableNoteNyaize }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></MkSwitch>

			<MkFolder>
				<template #label>{{ i18n.ts.like }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
				<div class="_gaps_m">
					<MkSwitch v-model="showLikeButton">{{ i18n.ts.showLikeButton }}</MkSwitch>

					<FromSlot v-model="selectReaction">
						<template #label>{{ i18n.ts.selectReaction }}</template>
						<MkCustomEmoji v-if="selectReaction && selectReaction.startsWith(':')" style="max-height: 3em; font-size: 1.1em;" :useOriginalSize="false" :name="selectReaction" :normal="true" :noStyle="true"/>
						<MkEmoji v-else-if="selectReaction && !selectReaction.startsWith(':')" :emoji="selectReaction" style="max-height: 3em; font-size: 1.1em;" :normal="true" :noStyle="true"/>
						<span v-else-if="!selectReaction">{{ i18n.ts.notSet }}</span>
						<div class="_buttons" style="padding-top: 8px;">
							<MkButton rounded :small="true" inline @click="chooseNewReaction"><i class="ti ti-mood-happy"></i> Change</MkButton>
							<MkButton rounded :small="true" inline @click="resetReaction"><i class="ti ti-reload"></i> Reset</MkButton>
						</div>
					</FromSlot>
				</div>
			</MkFolder>
		</div>
	</FormSection>

	<FormSection>
		<template #label>{{ i18n.ts.appearance }}</template>

		<div class="_gaps_m">
			<MkSelect v-model="customFont">
				<template #label>{{ i18n.ts.customFont }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
				<option :value="null">{{ i18n.ts.default }}</option>
				<option v-for="[name, font] of Object.entries(fontList)" :value="name">{{ font.name }}</option>
			</MkSelect>
		</div>
	</FormSection>

	<FormSection>
		<template #label>{{ i18n.ts.behavior }}</template>

		<div class="_gaps_m">
			<div class="_gaps_s">
				<MkSwitch v-model="reactionChecksMuting">
					{{ i18n.ts._reactionChecksMuting.title }}<span class="_beta">{{ i18n.ts.originalFeature }}</span>
					<template #caption>{{ i18n.ts._reactionChecksMuting.caption }}</template>
				</MkSwitch>
			</div>
		</div>
	</FormSection>
	<FormSection>
		<template #label>{{ i18n.ts.otherSettings }}</template>

		<div class="_gaps_m">
			<MkFolder>
				<template #label>{{ i18n.ts._profileHiddenSettings.hiddenProfile }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
				<div class="_gaps_m">
					<div class="_buttons">
						<MkButton inline @click="enableAllHidden">{{ i18n.ts.enableAll }}</MkButton>
						<MkButton inline @click="disableAllHidden">{{ i18n.ts.disableAll }}</MkButton>
					</div>
					<MkSwitch v-model="hiddenPinnedNotes">
						<template #caption>{{ i18n.ts._profileHiddenSettings.hiddenPinnedNotesDescription }}</template>
						{{ i18n.ts._profileHiddenSettings.hiddenPinnedNotes }}
					</MkSwitch>
					<MkSwitch v-model="hiddenActivity">
						<template #caption>{{ i18n.ts._profileHiddenSettings.hiddenActivityDescription }}</template>
						{{ i18n.ts._profileHiddenSettings.hiddenActivity }}
					</MkSwitch>
					<MkSwitch v-model="hiddenFiles">
						<template #caption>{{ i18n.ts._profileHiddenSettings.hiddenFilesDescription }}</template>
						{{ i18n.ts._profileHiddenSettings.hiddenFiles }}
					</MkSwitch>
				</div>
			</MkFolder>

			<MkFolder>
				<template #label>{{ i18n.ts.timeline }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
				<div class="_gaps_m">
					<MkSwitch v-model="hideLocalTimeLine">{{ i18n.ts.hideLocalTimeLine }}</MkSwitch>
					<MkSwitch v-model="hideSocialTimeLine">{{ i18n.ts.hideSocialTimeLine }}</MkSwitch>
					<MkSwitch v-model="hideGlobalTimeLine">{{ i18n.ts.hideGlobalTimeLine }}</MkSwitch>
				</div>
			</MkFolder>

			<MkFolder>
				<template #icon><i class="ti ti-robot"></i></template>
				<template #label>{{ i18n.ts._llm.title }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
				<div class="_gaps_m">
					<MkSwitch v-if="$i?.policies.canUseGeminiLLMAPI" v-model="useGeminiLLMAPI">
						{{ i18n.ts._llm.useGeminiLLMAPI }}
						<template #caption>{{ i18n.ts._llm.useGeminiLLMAPIDescription }}</template>
					</MkSwitch>

					<MkInput v-model="geminiToken" type="text" :disabled="useGeminiLLMAPI">
						<template #label>{{ i18n.ts._llm.geminiTokenLabel }}</template>
						<template #caption>{{ i18n.ts._llm.geminiTokenCaption }}</template>
					</MkInput>

					<MkSelect v-model="geminiModels" :disabled="useGeminiLLMAPI">
						<template #label>{{ i18n.ts._llm.geminiModelLabel }}</template>
						<option value="gemini-2.0-flash">gemini-2.0-flash</option>
						<option value="gemini-1.5-flash">gemini-1.5-flash</option>
						<option value="gemini-1.5-pro">gemini-1.5-pro</option>
						<option value="gemini-2.0-pro-exp-02-05">gemini-2.0-pro-exp-02-05</option>
					</MkSelect>

					<MkInput v-model="geminiPromptNote" type="text" :disabled="!geminiToken">
						<template #label>{{ i18n.ts._llm.geminiSummarizePromptLabel }}</template>
						<template #caption>{{ i18n.ts._llm.geminiSummarizePromptCaption }}</template>
					</MkInput>

					<MkInput v-model="geminiPromptProfile" type="text" :disabled="!geminiToken">
						<template #label>{{ i18n.ts._llm.geminiProfileSummarizePromptLabel }}</template>
						<template #caption>{{ i18n.ts._llm.geminiProfileSummarizePromptCaption }}</template>
					</MkInput>

					<MkFolder>
						<template #icon><i class="ti ti-info"></i></template>
						<template #label>{{ i18n.ts._llm.notesPrompt }}</template>

						<div class="_gaps_m">
							<MkInput v-model="geminiNoteLongText" type="text" :disabled="!geminiToken">
								<template #label>{{ i18n.ts._llm.geminiNoteLongText }}</template>
							</MkInput>

							<MkInput v-model="geminiNoteShortText" type="text" :disabled="!geminiToken">
								<template #label>{{ i18n.ts._llm.geminiNoteShortText }}</template>
							</MkInput>

							<MkInput v-model="geminiNoteSimpleText" type="text" :disabled="!geminiToken">
								<template #label>{{ i18n.ts._llm.geminiNoteSimpleText }}</template>
							</MkInput>

							<MkInput v-model="geminiNoteCasualText" type="text" :disabled="!geminiToken">
								<template #label>{{ i18n.ts._llm.geminiNoteCasualText }}</template>
							</MkInput>

							<MkInput v-model="geminiNoteProfessionalText" type="text" :disabled="!geminiToken">
								<template #label>{{ i18n.ts._llm.geminiNoteProfessionalText }}</template>
							</MkInput>

							<MkInput v-model="geminiNoteCatText" type="text" :disabled="!geminiToken">
								<template #label>{{ i18n.ts._llm.geminiNoteCatText }}</template>
							</MkInput>

							<MkInput v-model="geminiNoteCustomText" type="text" :disabled="!geminiToken">
								<template #label>{{ i18n.ts._llm.geminiNoteCustomText }}</template>
							</MkInput>
						</div>
					</MkFolder>

					<div class="_buttons">
						<MkButton primary @click="saveLLMSettings">{{ i18n.ts.save }}</MkButton>
					</div>
				</div>
			</MkFolder>
		</div>
	</FormSection>
</div>
</template>

<script lang="ts" setup>
import { computed, watch, ref } from 'vue';
import * as Misskey from 'misskey-js';
import MkInput from '@/components/MkInput.vue';
import MkSwitch from '@/components/MkSwitch.vue';
import MkSelect from '@/components/MkSelect.vue';
import MkRadios from '@/components/MkRadios.vue';
import MkFolder from '@/components/MkFolder.vue';
import MkButton from '@/components/MkButton.vue';
import FormSection from '@/components/form/section.vue';
import FormLink from '@/components/form/link.vue';
import FromSlot from '@/components/form/slot.vue';
import MkCustomEmoji from '@/components/global/MkCustomEmoji.vue';
import MkEmoji from '@/components/global/MkEmoji.vue';
import { defaultStore } from '@/store.js';
import * as os from '@/os.js';
import { reloadAsk } from '@/scripts/reload-ask.js';
import { i18n } from '@/i18n.js';
import { definePageMetadata } from '@/scripts/page-metadata.js';
import { fontList } from '@/scripts/font';
import { instance } from '@/instance.js';
import { $i } from '@/account.js';

const useGeminiLLMAPI = computed(defaultStore.makeGetterSetter('useGeminiLLMAPI'));
const hideReactionUsers = computed(defaultStore.makeGetterSetter('hideReactionUsers'));
const hideReactionCount = computed(defaultStore.makeGetterSetter('hideReactionCount'));
const showReactionsCount = computed(defaultStore.makeGetterSetter('showReactionsCount'));
const customFont = computed(defaultStore.makeGetterSetter('customFont'));
const hiddenPinnedNotes = computed(defaultStore.makeGetterSetter('hiddenPinnedNotes'));
const hiddenActivity = computed(defaultStore.makeGetterSetter('hiddenActivity'));
const hiddenFiles = computed(defaultStore.makeGetterSetter('hiddenFiles'));
const instanceIcon = computed(defaultStore.makeGetterSetter('instanceIcon'));
const disableNoteNyaize = computed(defaultStore.makeGetterSetter('disableNoteNyaize'));
const reactionChecksMuting = computed(defaultStore.makeGetterSetter('reactionChecksMuting'));
const hideLocalTimeLine = computed(defaultStore.makeGetterSetter('hideLocalTimeLine'));
const hideGlobalTimeLine = computed(defaultStore.makeGetterSetter('hideGlobalTimeLine'));
const hideSocialTimeLine = computed(defaultStore.makeGetterSetter('hideSocialTimeLine'));
const selectReaction = computed(defaultStore.makeGetterSetter('selectReaction'));
const instanceTicker = computed(defaultStore.makeGetterSetter('instanceTicker'));
const showLikeButton = computed(defaultStore.makeGetterSetter('showLikeButton'));

const geminiToken = computed(defaultStore.makeGetterSetter('geminiToken'));
const geminiModels = computed(defaultStore.makeGetterSetter('geminiModels'));
const geminiPromptNote = computed(defaultStore.makeGetterSetter('geminiPromptNote'));
const geminiPromptProfile = computed(defaultStore.makeGetterSetter('geminiPromptProfile'));
const geminiNoteLongText = computed(defaultStore.makeGetterSetter('geminiNoteLongText'));
const geminiNoteShortText = computed(defaultStore.makeGetterSetter('geminiNoteShortText'));
const geminiNoteSimpleText = computed(defaultStore.makeGetterSetter('geminiNoteSimpleText'));
const geminiNoteCasualText = computed(defaultStore.makeGetterSetter('geminiNoteCasualText'));
const geminiNoteProfessionalText = computed(defaultStore.makeGetterSetter('geminiNoteProfessionalText'));
const geminiNoteCatText = computed(defaultStore.makeGetterSetter('geminiNoteCatText'));
const geminiNoteCustomText = computed(defaultStore.makeGetterSetter('geminiNoteCustomText'));

watch([
	hideReactionUsers,
	hideReactionCount,
	showReactionsCount,
	customFont,
	hiddenPinnedNotes,
	hiddenActivity,
	hiddenFiles,
	instanceIcon,
	disableNoteNyaize,
	reactionChecksMuting,
	hideLocalTimeLine,
	hideGlobalTimeLine,
	hideSocialTimeLine,
	selectReaction,
	instanceTicker,
	showLikeButton,
], async () => {
	await reloadAsk({ reason: i18n.ts.reloadToApplySetting, unison: true });
});

function chooseNewReaction(ev: MouseEvent) {
	os.pickEmoji(getHTMLElement(ev), {
		showPinned: false,
	}).then(async (emoji) => {
		selectReaction.value = emoji as string;
		await reloadAsk();
	});
}

function resetReaction() {
	selectReaction.value = '';
	reloadAsk();
}

function getHTMLElement(ev: MouseEvent): HTMLElement {
	const target = ev.currentTarget ?? ev.target;
	return target as HTMLElement;
}

function enableAllHidden() {
	defaultStore.set('hiddenPinnedNotes', true);
	defaultStore.set('hiddenActivity', true);
	defaultStore.set('hiddenFiles', true);
}

function disableAllHidden() {
	defaultStore.set('hiddenPinnedNotes', false);
	defaultStore.set('hiddenActivity', false);
	defaultStore.set('hiddenFiles', false);
}

async function saveLLMSettings() {
	await reloadAsk({ reason: i18n.ts.reloadToApplySetting, unison: true });
}

const headerActions = computed(() => []);

const headerTabs = computed(() => []);

definePageMetadata(() => ({
	title: 'shahu-fork',
	icon: 'ti ti-adjustments',
}));
</script>
