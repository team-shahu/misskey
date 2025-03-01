<!--
SPDX-FileCopyrightText: chan-mai
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<div>
	<MkStickyContainer>
		<template #header><XHeader :tabs="headerTabs"/></template>
		<MkSpacer :contentMax="700" :marginMin="16" :marginMax="32">
			<FormSuspense :p="init">
				<div class="_gaps_m">
					<div class="_gaps">
						<MkTextarea v-model="customSplashText">
							<template #label>{{ i18n.ts.customSplashText }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
							<template #caption>{{ i18n.ts.customSplashTextDescription }}</template>
						</MkTextarea>
						<MkButton primary @click="save_customSplashText">{{ i18n.ts.save }}</MkButton>
					</div>

					<div class="_gaps">
						<MkInput v-model="serverGeminiApiKey" type="text">
							<template #label>{{ i18n.ts._llm._server.serverGeminiApiKey }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
							<template #caption>{{ i18n.ts._llm._server.serverGeminiApiKeyDescription }}</template>
						</MkInput>

						<MkSelect v-model="serverGeminiModels">
							<template #label>{{ i18n.ts._llm.geminiModelLabel }}</template>
							<template #caption>{{ i18n.ts._llm._server.serverGeminiModels }}</template>
							<option value="gemini-2.0-flash">gemini-2.0-flash</option>
							<option value="gemini-1.5-flash">gemini-1.5-flash</option>
							<option value="gemini-1.5-pro">gemini-1.5-pro</option>
							<option value="gemini-2.0-pro-exp-02-05">gemini-2.0-pro-exp-02-05</option>
						</MkSelect>
						<MkButton primary @click="save_serverGemini">{{ i18n.ts.save }}</MkButton>
					</div>
				</div>
			</formsuspense>
		</MkSpacer>
	</MkStickyContainer>
</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import XHeader from './_header_.vue';
import MkInput from '@/components/MkInput.vue';
import MkTextarea from '@/components/MkTextarea.vue';
import FormSuspense from '@/components/form/suspense.vue';
import * as os from '@/os.js';
import { misskeyApi } from '@/scripts/misskey-api.js';
import { fetchInstance } from '@/instance.js';
import { i18n } from '@/i18n.js';
import { definePageMetadata } from '@/scripts/page-metadata.js';
import MkButton from '@/components/MkButton.vue';
import MkSelect from '@/components/MkSelect.vue';

const meta = await misskeyApi('admin/meta');

const customSplashText = ref<string>('');
const serverGeminiApiKey = ref<string>('');
const serverGeminiModels = ref<string>('gemini-2.0-flash');

async function init() {
	customSplashText.value = meta.customSplashText.join('\n');
	serverGeminiApiKey.value = meta.serverGeminiApiKey!;
	serverGeminiModels.value = meta.serverGeminiModels;
}

function save_customSplashText() {
	os.apiWithDialog('admin/update-meta', {
		customSplashText: customSplashText.value.split('\n'),
	}).then(() => {
		fetchInstance(true);
	});
}

function save_serverGemini() {
	os.apiWithDialog('admin/update-meta', {
		serverGeminiApiKey: serverGeminiApiKey.value,
		serverGeminiModels: serverGeminiModels.value,
	}).then(() => {
		fetchInstance(true);
	});
}

const headerTabs = computed(() => []);

definePageMetadata(() => ({
	title: i18n.ts.moderation,
	icon: 'ti ti-shield',
}));
</script>
