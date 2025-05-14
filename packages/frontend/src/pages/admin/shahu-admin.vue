<!--
SPDX-FileCopyrightText: chan-mai
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<div>
	<MkStickyContainer>
		<PageWithHeader :actions="headerActions" :tabs="headerTabs">
			<MkSpacer :contentMax="700" :marginMin="16" :marginMax="32">
				<FormSuspense :p="init">
					<div class="_gaps_m">
						<MkFolder>
							<template #icon><i class="ti ti-text-caption"></i></template>
							<template #label>{{ i18n.ts.customSplashText }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
							<template v-if="customSplashTextForm.modified.value" #footer>
								<MkFormFooter :form="customSplashTextForm"/>
							</template>

							<div class="_gaps">
								<MkTextarea v-model="customSplashTextForm.state.customSplashText">
									<template #caption>{{ i18n.ts.customSplashTextDescription }}</template>
								</MkTextarea>
							</div>
						</MkFolder>

						<MkFolder>
							<template #icon><i class="ti ti-robot"></i></template>
							<template #label>{{ i18n.ts._llm.title }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
							<template v-if="serverGeminiEnabled" #suffix>Enabled</template>
							<template v-else #suffix>Disabled</template>
							<template v-if="geminiSettingsForm.modified.value" #footer>
								<MkFormFooter :form="geminiSettingsForm"/>
							</template>

							<div class="_gaps">
								<MkSwitch v-model="geminiSettingsForm.state.serverGeminiEnabled">
									<template #label>{{ i18n.ts._llm.serverGeminiEnabled }}</template>
									<template #caption>{{ i18n.ts._llm._server.serverGeminiEnabledDescription }}</template>
								</MkSwitch>

								<MkInput v-model="geminiSettingsForm.state.serverGeminiApiKey" type="text">
									<template #label>{{ i18n.ts._llm._server.serverGeminiApiKey }}</template>
									<template #caption>{{ i18n.ts._llm._server.serverGeminiApiKeyDescription }}</template>
								</MkInput>

								<MkSelect v-model="geminiSettingsForm.state.serverGeminiModels">
									<template #label>{{ i18n.ts._llm.geminiModelLabel }}</template>
									<template #caption>{{ i18n.ts._llm._server.serverGeminiModelsDescription }}</template>
									<option value="gemini-2.0-flash">gemini-2.0-flash</option>
									<option value="gemini-2.0-flash-lite">gemini-2.0-flash-lite</option>
									<option value="gemini-2.5-flash-preview-04-17">gemini-2.5-flash-preview-04-17</option>
									<option value="gemini-2.5-pro-preview-05-06">gemini-2.5-pro-preview-05-06</option>
								</MkSelect>
							</div>
						</MkFolder>
					</div>
				</formsuspense>
			</MkSpacer>
		</PageWithHeader>
	</MkStickyContainer>
</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import MkInput from '@/components/MkInput.vue';
import MkSwitch from '@/components/MkSwitch.vue';
import MkFolder from '@/components/MkFolder.vue';
import MkTextarea from '@/components/MkTextarea.vue';
import FormSuspense from '@/components/form/suspense.vue';
import * as os from '@/os.js';
import { misskeyApi } from '@/utility/misskey-api.js';
import { fetchInstance } from '@/instance.js';
import { i18n } from '@/i18n.js';
import { definePage } from '@/page.js';
import MkButton from '@/components/MkButton.vue';
import MkSelect from '@/components/MkSelect.vue';
import { useForm } from '@/use/use-form.js';
import MkFormFooter from '@/components/MkFormFooter.vue';

const meta = await misskeyApi('admin/meta');

const customSplashText = ref<string>('');
const serverGeminiEnabled = ref<boolean>(false);
const serverGeminiApiKey = ref<string>('');
const serverGeminiModels = ref<string>('gemini-2.0-flash');

async function init() {
	customSplashText.value = meta.customSplashText.join('\n');
	serverGeminiEnabled.value = meta.serverGeminiEnabled;
	serverGeminiApiKey.value = meta.serverGeminiApiKey!;
	serverGeminiModels.value = meta.serverGeminiModels;
}

const customSplashTextForm = useForm({
	customSplashText: meta.customSplashText.join('\n'),
}, async (state) => {
	await os.apiWithDialog('admin/update-meta', {
		customSplashText: state.customSplashText.split('\n'),
	});
	fetchInstance(true);
});

const geminiSettingsForm = useForm({
	serverGeminiEnabled: meta.serverGeminiEnabled,
	serverGeminiApiKey: meta.serverGeminiApiKey || '',
	serverGeminiModels: meta.serverGeminiModels || 'gemini-2.0-flash',
}, async (state) => {
	await os.apiWithDialog('admin/update-meta', {
		serverGeminiEnabled: state.serverGeminiEnabled,
		serverGeminiApiKey: state.serverGeminiApiKey,
		serverGeminiModels: state.serverGeminiModels,
	});
	fetchInstance(true);
});

const headerTabs = computed(() => []);

definePage(() => ({
	title: i18n.ts.moderation,
	icon: 'ti ti-shield',
}));
</script>
