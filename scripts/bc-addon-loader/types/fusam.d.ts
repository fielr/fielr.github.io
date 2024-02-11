/**
 *     FUSAM
 *  Copyright (C) 2023  Sid
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

export {}

declare global {
	interface Window {
		FUSAM?: FUSAMPublicAPI
	}
}

type FUSAMPublicAPI = {
	present: true
	addons: Record<string, FUSAMAddonState>
	registerDebugMethod: (
		name: string,
		method: () => string | Promise<string>
	) => void
}

type FUSAMAddonState = {
	distribution: string
	status: "loading" | "loaded" | "error"
}

export type FUSAMSettings = {
	enabledDistributions: Record<string, string>
}
