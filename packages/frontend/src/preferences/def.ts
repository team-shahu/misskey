/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as Misskey from 'misskey-js';
import { hemisphere } from '@@/js/intl-const.js';
import type { Theme } from '@/theme.js';
import type { SoundType } from '@/utility/sound.js';
import type { Plugin } from '@/plugin.js';
import type { DeviceKind } from '@/utility/device-kind.js';
import type { DeckProfile } from '@/deck.js';
import type { PreferencesDefinition } from './manager.js';
import { DEFAULT_DEVICE_KIND } from '@/utility/device-kind.js';

/** サウンド設定 */
export type SoundStore = {
	type: Exclude<SoundType, '_driveFile_'>;
	volume: number;
} | {
	type: '_driveFile_';

	/** ドライブのファイルID */
	fileId: string;

	/** ファイルURL（こちらが優先される） */
	fileUrl: string;

	volume: number;
};

// NOTE: デフォルト値は他の設定の状態に依存してはならない(依存していた場合、ユーザーがその設定項目単体で「初期値にリセット」した場合不具合の原因になる)

export const PREF_DEF = {
	accounts: {
		default: [] as [host: string, user: {
			id: string;
			username: string;
		}][],
	},

	pinnedUserLists: {
		accountDependent: true,
		default: [] as Misskey.entities.UserList[],
	},
	uploadFolder: {
		accountDependent: true,
		default: null as string | null,
	},
	widgets: {
		accountDependent: true,
		default: [{
			name: 'calendar',
			id: 'a', place: 'right', data: {},
		}, {
			name: 'notifications',
			id: 'b', place: 'right', data: {},
		}, {
			name: 'trends',
			id: 'c', place: 'right', data: {},
		}] as {
			name: string;
			id: string;
			place: string | null;
			data: Record<string, any>;
		}[],
	},
	'deck.profile': {
		accountDependent: true,
		default: null as string | null,
	},
	'deck.profiles': {
		accountDependent: true,
		default: [] as DeckProfile[],
	},

	emojiPalettes: {
		serverDependent: true,
		default: [{
			id: 'a',
			name: '',
			emojis: ['👍', '❤️', '😆', '🤔', '😮', '🎉', '💢', '😥', '😇', '🍮'],
		}] as {
			id: string;
			name: string;
			emojis: string[];
		}[],
	},
	emojiPaletteForReaction: {
		serverDependent: true,
		default: null as string | null,
	},
	emojiPaletteForMain: {
		serverDependent: true,
		default: null as string | null,
	},

	overridedDeviceKind: {
		default: null as DeviceKind | null,
	},
	themes: {
		default: [] as Theme[],
	},
	lightTheme: {
		default: null as Theme | null,
	},
	darkTheme: {
		default: null as Theme | null,
	},
	syncDeviceDarkMode: {
		default: true,
	},
	defaultNoteVisibility: {
		default: 'public' as (typeof Misskey.noteVisibilities)[number],
	},
	defaultNoteLocalOnly: {
		default: false,
	},
	keepCw: {
		default: true,
	},
	rememberNoteVisibility: {
		default: false,
	},
	reportError: {
		default: false,
	},
	collapseRenotes: {
		default: true,
	},
	menu: {
		default: [
			'notifications',
			'clips',
			'drive',
			'followRequests',
			'chat',
			'-',
			'explore',
			'announcements',
			'channels',
			'search',
			'-',
			'ui',
		],
	},
	statusbars: {
		default: [] as {
			name: string;
			id: string;
			type: string;
			size: 'verySmall' | 'small' | 'medium' | 'large' | 'veryLarge';
			black: boolean;
			props: Record<string, any>;
		}[],
	},
	serverDisconnectedBehavior: {
		default: 'quiet' as 'quiet' | 'reload' | 'dialog',
	},
	nsfw: {
		default: 'respect' as 'respect' | 'force' | 'ignore',
	},
	highlightSensitiveMedia: {
		default: false,
	},
	animation: {
		default: !window.matchMedia('(prefers-reduced-motion)').matches,
	},
	animatedMfm: {
		default: !window.matchMedia('(prefers-reduced-motion)').matches,
	},
	advancedMfm: {
		default: true,
	},
	showReactionsCount: {
		default: false,
	},
	enableQuickAddMfmFunction: {
		default: false,
	},
	loadRawImages: {
		default: false,
	},
	imageNewTab: {
		default: false,
	},
	disableShowingAnimatedImages: {
		default: window.matchMedia('(prefers-reduced-motion)').matches,
	},
	emojiStyle: {
		default: 'twemoji', // twemoji / fluentEmoji / native
	},
	menuStyle: {
		default: 'auto' as 'auto' | 'popup' | 'drawer',
	},
	useBlurEffectForModal: {
		default: DEFAULT_DEVICE_KIND === 'desktop',
	},
	useBlurEffect: {
		default: DEFAULT_DEVICE_KIND === 'desktop',
	},
	useStickyIcons: {
		default: true,
	},
	showFixedPostForm: {
		default: false,
	},
	showFixedPostFormInChannel: {
		default: false,
	},
	enableInfiniteScroll: {
		default: true,
	},
	useReactionPickerForContextMenu: {
		default: false,
	},
	showGapBetweenNotesInTimeline: {
		default: false,
	},
	instanceTicker: {
		default: 'remote' as 'none' | 'remote' | 'always',
	},
	emojiPickerScale: {
		default: 2,
	},
	emojiPickerWidth: {
		default: 2,
	},
	emojiPickerHeight: {
		default: 3,
	},
	emojiPickerStyle: {
		default: 'auto' as 'auto' | 'popup' | 'drawer',
	},
	squareAvatars: {
		default: false,
	},
	showAvatarDecorations: {
		default: true,
	},
	numberOfPageCache: {
		default: 3,
	},
	showNoteActionsOnlyHover: {
		default: false,
	},
	showClipButtonInNoteFooter: {
		default: false,
	},
	reactionsDisplaySize: {
		default: 'medium' as 'small' | 'medium' | 'large',
	},
	limitWidthOfReaction: {
		default: true,
	},
	forceShowAds: {
		default: false,
	},
	aiChanMode: {
		default: false,
	},
	devMode: {
		default: false,
	},
	mediaListWithOneImageAppearance: {
		default: 'expand' as 'expand' | '16_9' | '1_1' | '2_3',
	},
	notificationPosition: {
		default: 'rightBottom' as 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom',
	},
	notificationStackAxis: {
		default: 'horizontal' as 'vertical' | 'horizontal',
	},
	enableCondensedLine: {
		default: true,
	},
	keepScreenOn: {
		default: false,
	},
	disableStreamingTimeline: {
		default: false,
	},
	useGroupedNotifications: {
		default: true,
	},
	dataSaver: {
		default: {
			media: false,
			avatar: false,
			urlPreview: false,
			code: false,
		} as Record<string, boolean>,
	},
	hemisphere: {
		default: hemisphere as 'N' | 'S',
	},
	enableSeasonalScreenEffect: {
		default: false,
	},
	enableHorizontalSwipe: {
		default: false,
	},
	enablePullToRefresh: {
		default: true,
	},
	useNativeUiForVideoAudioPlayer: {
		default: false,
	},
	keepOriginalFilename: {
		default: true,
	},
	alwaysConfirmFollow: {
		default: true,
	},
	confirmWhenRevealingSensitiveMedia: {
		default: false,
	},
	contextMenu: {
		default: 'app' as 'app' | 'appWithShift' | 'native',
	},
	skipNoteRender: {
		default: true,
	},
	showSoftWordMutedWord: {
		default: false,
	},
	confirmOnReact: {
		default: false,
	},
	defaultFollowWithReplies: {
		default: false,
	},
	makeEveryTextElementsSelectable: {
		default: DEFAULT_DEVICE_KIND === 'desktop',
	},
	showNavbarSubButtons: {
		default: true,
	},
	showTitlebar: {
		default: false,
	},
	plugins: {
		default: [] as Plugin[],
	},

	'sound.masterVolume': {
		default: 0.3,
	},
	'sound.notUseSound': {
		default: false,
	},
	'sound.useSoundOnlyWhenActive': {
		default: false,
	},
	'sound.on.note': {
		default: { type: 'syuilo/n-aec', volume: 1 } as SoundStore,
	},
	'sound.on.noteMy': {
		default: { type: 'syuilo/n-cea-4va', volume: 1 } as SoundStore,
	},
	'sound.on.notification': {
		default: { type: 'syuilo/n-ea', volume: 1 } as SoundStore,
	},
	'sound.on.reaction': {
		default: { type: 'syuilo/bubble2', volume: 1 } as SoundStore,
	},
	'sound.on.chatMessage': {
		default: { type: 'syuilo/waon', volume: 1 } as SoundStore,
	},

	'deck.alwaysShowMainColumn': {
		default: true,
	},
	'deck.navWindow': {
		default: true,
	},
	'deck.useSimpleUiForNonRootPages': {
		default: true,
	},
	'deck.columnAlign': {
		default: 'center' as 'left' | 'right' | 'center',
	},
	'deck.columnGap': {
		default: 6,
	},
	'deck.menuPosition': {
		default: 'bottom' as 'right' | 'bottom',
	},
	'deck.navbarPosition': {
		default: 'left' as 'left' | 'top' | 'bottom',
	},
	'deck.wallpaper': {
		default: null as string | null,
	},

	'chat.showSenderName': {
		default: false,
	},
	'chat.sendOnEnter': {
		default: false,
	},

	'game.dropAndFusion': {
		default: {
			bgmVolume: 0.25,
			sfxVolume: 1,
		},
	},

	// region Original Features
	draftSavingBehavior: {
		default: 'auto' as 'auto' | 'manual',
	},
	defaultScheduledNoteDelete: {
		default: false,
	},
	defaultScheduledNoteDeleteTime: {
		default: 86400000,
	},
	postFormActions: {
		default: [
			'attachFile',
			'poll',
			'scheduledNoteDelete',
			'useCw',
			'mention',
			'hashtags',
			'plugins',
			'emoji',
			'addMfmFunction',
			'scheduleNote',
			'schedulePostList',
		],
	},
	instanceIcon: {
		default: false,
	},
	selectReaction: {
		default: '🤍' as string,
	},
	showLikeButton: {
		default: true,
	},
	hideReactionUsers: {
		default: false,
	},
	hideReactionCount: {
		default: 'none' as 'none' | 'self' | 'others' | 'all',
	},
	customFont: {
		default: null as null | string,
	},
	hiddenActivityAndFiles: {
		default: false,
	},
	hiddenPinnedNotes: {
		default: false,
	},
	hiddenActivity: {
		default: false,
	},
	hiddenFiles: {
		default: false,
	},
	disableNoteNyaize: {
		default: false,
	},
	hideLocalTimeLine: {
		default: false,
	},
	hideSocialTimeLine: {
		default: false,
	},
	hideGlobalTimeLine: {
		default: false,
	},
	reactionChecksMuting: {
		default: true,
	},
	useGeminiLLMAPI: {
		default: false,
	},
	geminiToken: {
		default: null as string | null,
	},
	geminiModels: {
		default: 'gemini-2.0-flash' as 'gemini-2.0-flash' | 'gemini-1.5-flash' | 'gemini-1.5-pro' | 'gemini-2.0-pro-exp-02-05' | null,
	},
	geminiSystemPrompt: {
		default: 'リスト記法は対応しておらず、パーサーが壊れるため使用禁止です。列挙する場合は「・」を使ってください。' as string | null,
	},
	geminiPromptNote: {
		default: '以下のSNSの投稿をわかりやすく簡潔にユーザーに要約してください。' as string | null,
	},
	geminiPromptProfile: {
		default: 'プロフィール情報と投稿からこのユーザーの特徴を簡潔に教えてください。' as string | null,
	},
	geminiNoteLongText: {
		default: '以下の文章を長文にしてください。' as string | null,
	},
	geminiNoteShortText: {
		default: '以下の文章を短文にしてください。' as string | null,
	},
	geminiNoteSimpleText: {
		default: '以下の文章を簡潔にしてください。' as string | null,
	},
	geminiNoteCasualText: {
		default: '以下の文章をカジュアルにしてください。' as string | null,
	},
	geminiNoteProfessionalText: {
		default: '以下の文章を専門的にしてください。' as string | null,
	},
	geminiNoteCatText: {
		default: '以下の文章を猫っぽくしてください。' as string | null,
	},
	geminiNoteCustomText: {
		default: null as string | null,
	},
	// endregion Original Features
	'experimental.stackingRouterView': {
		default: false,
	},
} satisfies PreferencesDefinition;
