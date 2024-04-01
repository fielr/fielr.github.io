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

/**
 * @param {() => boolean} predicate - a function that returns true when the awaited condition is true
 * @param {() => boolean} [cancelPredicate] - a function that returns true when the waiting should be cancelled
 * @returns {Promise<boolean>} true if predicate returned true, false if cancelled
 */
export async function waitFor(predicate, cancelPredicate = () => false) {
	while (!predicate()) {
		if (cancelPredicate()) {
			return false
		}
		// eslint-disable-next-line no-await-in-loop - delay inside the loop intended
		await sleep(10)
	}
	return true
}

/**
 * @param {number} ms
 */
export function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
