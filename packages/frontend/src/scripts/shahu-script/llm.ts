/*
 * SPDX-FileCopyrightText: lqvp and chan-mai
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { defaultStore } from '@/store.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateGeminiSummary(prompt: string): Promise<any> {
	const { geminiToken, geminiModels } = defaultStore.state;
	if (!geminiToken) {
		throw new Error('Gemini API token is not available in store.');
	}

	const response = await fetch(
		`https://generativelanguage.googleapis.com/v1beta/models/${geminiModels}:generateContent?key=${geminiToken}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				contents: [
					{
						parts: [{ text: prompt }],
					},
				],
			}),
		},
	);

	if (!response.ok) {
		throw new Error('Failed to get summary from Gemini API.');
	}
	return response.json();
}
