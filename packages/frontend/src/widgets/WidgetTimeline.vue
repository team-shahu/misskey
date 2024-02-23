<!--
SPDX-FileCopyrightText: syuilo and misskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<MkContainer :showHeader="widgetProps.showHeader" :style="`height: ${widgetProps.height}px;`" :scrollable="true" data-cy-mkw-timeline class="mkw-timeline">
	<template #icon>
		<i v-if="widgetProps.src === 'home'" class="ti ti-home"></i>
		<i v-else-if="widgetProps.src === 'local'" class="ti ti-planet"></i>
		<i v-else-if="widgetProps.src === 'social'" class="ti ti-universe"></i>
		<i v-else-if="widgetProps.src === 'global'" class="ti ti-whirl"></i>
		<i v-else-if="widgetProps.src === 'list'" class="ti ti-list"></i>
		<i v-else-if="widgetProps.src === 'antenna'" class="ti ti-antenna"></i>
		<i v-else-if="widgetProps.src === 'custom-timeline-1'" class="ti ti-plus"></i>
		<i v-else-if="widgetProps.src === 'custom-timeline-2'" class="ti ti-plus"></i>
		<i v-else-if="widgetProps.src === 'custom-timeline-3'" class="ti ti-plus"></i>
		<i v-else-if="widgetProps.src === 'custom-timeline-4'" class="ti ti-plus"></i>
		<i v-else-if="widgetProps.src === 'custom-timeline-5'" class="ti ti-plus"></i>
	</template>
	<template #header>
		<button class="_button" @click="choose">
			<span>{{ widgetProps.src === 'list' ? widgetProps.list.name : widgetProps.src === 'antenna' ? widgetProps.antenna.name : i18n.ts._timelines[widgetProps.src] }}</span>
			<i :class="menuOpened ? 'ti ti-chevron-up' : 'ti ti-chevron-down'" style="margin-left: 8px;"></i>
		</button>
	</template>

	<div v-if="(((widgetProps.src === 'local' || widgetProps.src === 'social') && !isLocalTimelineAvailable) || (widgetProps.src === 'global' && !isGlobalTimelineAvailable))" :class="$style.disabled">
		<p :class="$style.disabledTitle">
			<i class="ti ti-minus"></i>
			{{ i18n.ts._disabledTimeline.title }}
		</p>
		<p :class="$style.disabledDescription">{{ i18n.ts._disabledTimeline.description }}</p>
	</div>
	<div v-else>
		<MkTimeline :key="widgetProps.src === 'list' ? `list:${widgetProps.list.id}` : widgetProps.src === 'antenna' ? `antenna:${widgetProps.antenna.id}` : widgetProps.src" :src="widgetProps.src" :list="widgetProps.list ? widgetProps.list.id : null" :antenna="widgetProps.antenna ? widgetProps.antenna.id : null"/>
	</div>
</MkContainer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useWidgetPropsManager, WidgetComponentEmits, WidgetComponentExpose, WidgetComponentProps } from './widget.js';
import { GetFormResultType } from '@/scripts/form.js';
import * as os from '@/os.js';
import { misskeyApi } from '@/scripts/misskey-api.js';
import MkContainer from '@/components/MkContainer.vue';
import MkTimeline from '@/components/MkTimeline.vue';
import { i18n } from '@/i18n.js';
import { $i } from '@/account.js';
import { instance } from '@/instance.js';
import { defaultStore } from '@/store.js';

const name = 'timeline';
const isLocalTimelineAvailable = (($i == null && instance.policies.ltlAvailable) || ($i != null && $i.policies.ltlAvailable));
const isGlobalTimelineAvailable = (($i == null && instance.policies.gtlAvailable) || ($i != null && $i.policies.gtlAvailable));

const widgetPropsDef = {
	showHeader: {
		type: 'boolean' as const,
		default: true,
	},
	height: {
		type: 'number' as const,
		default: 300,
	},
	src: {
		type: 'string' as const,
		default: 'home',
		hidden: true,
	},
	antenna: {
		type: 'object' as const,
		default: null,
		hidden: true,
	},
	list: {
		type: 'object' as const,
		default: null,
		hidden: true,
	},
};

type WidgetProps = GetFormResultType<typeof widgetPropsDef>;

const props = defineProps<WidgetComponentProps<WidgetProps>>();
const emit = defineEmits<WidgetComponentEmits<WidgetProps>>();

const { widgetProps, configure, save } = useWidgetPropsManager(name,
	widgetPropsDef,
	props,
	emit,
);

const menuOpened = ref(false);

const setSrc = (src) => {
	widgetProps.src = src;
	save();
};

const choose = async (ev) => {
	menuOpened.value = true;
	const [antennas, lists] = await Promise.all([
		misskeyApi('antennas/list'),
		misskeyApi('users/lists/list'),
	]);
	const antennaItems = antennas.map(antenna => ({
		text: antenna.name,
		icon: 'ti ti-antenna',
		action: () => {
			widgetProps.antenna = antenna;
			setSrc('antenna');
		},
	}));
	const listItems = lists.map(list => ({
		text: list.name,
		icon: 'ti ti-list',
		action: () => {
			widgetProps.list = list;
			setSrc('list');
		},
	}));

	const remoteLocalTimelineEnable1 = defaultStore.state['remoteLocalTimelineEnable1'];
	const remoteLocalTimelineEnable2 = defaultStore.state['remoteLocalTimelineEnable2'];
	const remoteLocalTimelineEnable3 = defaultStore.state['remoteLocalTimelineEnable3'];
	const remoteLocalTimelineEnable4 = defaultStore.state['remoteLocalTimelineEnable4'];
	const remoteLocalTimelineEnable5 = defaultStore.state['remoteLocalTimelineEnable5'];

	os.popupMenu([{
		text: i18n.ts._timelines.home,
		icon: 'ti ti-home',
		action: () => { setSrc('home'); },
	}, {
		text: i18n.ts._timelines.local,
		icon: 'ti ti-planet',
		action: () => { setSrc('local'); },
	}, {
		text: i18n.ts._timelines.social,
		icon: 'ti ti-universe',
		action: () => { setSrc('social'); },
	}, {
		text: i18n.ts._timelines.global,
		icon: 'ti ti-whirl',
		action: () => { setSrc('global'); },
	}, ...(remoteLocalTimelineEnable1 ? [{
		text: i18n.ts._timelines['custom-timeline-1'],
		icon: 'ti ti-plus',
		action: () => { setSrc('custom-timeline-1'); },
	}] : []), ...(remoteLocalTimelineEnable2 ? [{
		text: i18n.ts._timelines['custom-timeline-2'],
		icon: 'ti ti-plus',
		action: () => { setSrc('custom-timeline-2'); },
	}] : []), ...(remoteLocalTimelineEnable3 ? [{
		text: i18n.ts._timelines['custom-timeline-3'],
		icon: 'ti ti-plus',
		action: () => { setSrc('custom-timeline-3'); },
	}] : []), ...(remoteLocalTimelineEnable4 ? [{
		text: i18n.ts._timelines['custom-timeline-4'],
		icon: 'ti ti-plus',
		action: () => { setSrc('custom-timeline-4'); },
	}] : []), ...(remoteLocalTimelineEnable5 ? [{
		text: i18n.ts._timelines['custom-timeline-5'],
		icon: 'ti ti-plus',
		action: () => { setSrc('custom-timeline-5'); },
	}] : []),
	antennaItems.length > 0 ? { type: 'divider' } : undefined, ...antennaItems, listItems.length > 0 ? { type: 'divider' } : undefined, ...listItems], ev.currentTarget ?? ev.target).then(() => {
		menuOpened.value = false;
	});
};

defineExpose<WidgetComponentExpose>({
	name,
	configure,
	id: props.widget ? props.widget.id : null,
});
</script>

<style lang="scss" module>
.disabled {
	text-align: center;
}

.disabledTitle {
	margin: 16px;
}

.disabledDescription {
	font-size: 90%;
}
</style>
