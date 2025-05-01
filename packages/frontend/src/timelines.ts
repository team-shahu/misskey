/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { $i } from '@/i.js';
import { instance } from '@/instance.js';
import { store } from '@/store.js';

export const basicTimelineTypes = [
	'home',
	'local',
	'social',
	'global',
] as const;

export type BasicTimelineType = typeof basicTimelineTypes[number];

export function isBasicTimeline(timeline: string): timeline is BasicTimelineType {
	return basicTimelineTypes.includes(timeline as BasicTimelineType);
}

export function basicTimelineIconClass(timeline: BasicTimelineType): string {
	switch (timeline) {
		case 'home':
			return 'ti ti-home';
		case 'local':
			return 'ti ti-planet';
		case 'social':
			return 'ti ti-universe';
		case 'global':
			return 'ti ti-whirl';
	}
}

export function isAvailableBasicTimeline(timeline: BasicTimelineType | undefined | null): boolean {
	switch (timeline) {
		case 'home':
			return $i != null;
		case 'local':
			return ($i == null && instance.policies.ltlAvailable && !store.get('hideLocalTimeLine')) || ($i != null && $i.policies.ltlAvailable && !store.get('hideLocalTimeLine'));
		case 'social':
			return $i != null && $i.policies.ltlAvailable && !store.get('hideSocialTimeLine');
		case 'global':
			return ($i == null && instance.policies.gtlAvailable && !store.get('hideGlobalTimeLine')) || ($i != null && $i.policies.gtlAvailable && !store.get('hideGlobalTimeLine'));
		default:
			return false;
	}
}

export function availableBasicTimelines(): BasicTimelineType[] {
	return basicTimelineTypes.filter(isAvailableBasicTimeline);
}

export function hasWithReplies(timeline: BasicTimelineType | undefined | null): boolean {
	return timeline === 'local' || timeline === 'social';
}
