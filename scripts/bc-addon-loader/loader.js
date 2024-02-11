import { waitFor } from "./delay.js"
import { get as getLocal } from "./localstore.js"
import { getAddon, getAddonVersion, updateManifest } from "./manifest.js"
import { playerSettingsLoaded } from "./playerstore.js"
import { get } from "./settings.js"

export async function loadAddons() {
	await updateManifest()

	// Skip loading device addons if the player is already logged in
	if (!playerSettingsLoaded()) {
		const addons = getLocal()
		await load(addons.enabledDistributions)
	}

	await waitFor(() => playerSettingsLoaded())
	const addons = get()
	await load(addons.enabledDistributions)
}

/**
 * @param {Record<string, string>} settings
 */
async function load(settings) {
	for (const [id, distribution] of Object.entries(settings)) {
		if (id in window.FUSAM.addons) continue

		window.FUSAM.addons[id] = {
			distribution,
			status: "loading",
		}

		const addon = getAddon(id)
		const version = getAddonVersion(id, distribution)
		if (!version) {
			console.warn(`Addon ${id} or its distribution ${distribution} not found`)
			window.FUSAM.addons[id].status = "error"
			continue
		}
		console.debug(`Loading addon ${id} from ${distribution}`)
		try {
			const onload = () => {
				window.FUSAM.addons[id].status = "loaded"
			}
			const onerror = () => {
				window.FUSAM.addons[id].status = "error"
			}
			switch (addon.type) {
				case "eval":
					await evalAddon(version.source)
					window.FUSAM.addons[id].status = "loaded"
					break
				case "module":
					await import(`${version.source}?v=${Date.now()}`)
					window.FUSAM.addons[id].status = "loaded"
					break
				case "script":
					scriptAddon(version.source, "text/javascript", onload, onerror)
					break
			}
		} catch (e) {
			console.error(`Failed to load addon ${id}`, e)
			window.FUSAM.addons[id].status = "error"
			continue
		}
	}
}

/**
 * @param {string} source URL of the script
 * @param {'module' | 'text/javascript'} type Type of the script
 * @param {() => void} [onload] Callback when the script is loaded
 * @param {() => void} [onerror] Callback when the script fails to load
 */
function scriptAddon(source, type, onload, onerror) {
	const script = document.createElement("script")
	script.type = type
	script.crossOrigin = "anonymous"
	script.src = `${source}?v=${Date.now()}`
	script.onload = onload
	script.onerror = onerror
	document.head.appendChild(script)
}

async function evalAddon(source) {
	const sourceRequestUrl = `${source}?v=${Date.now()}`
	await fetch(sourceRequestUrl)
		.then((resp) => resp.text())
		.then((resp) => {
			resp = resp.replace(
				/sourceMappingURL=.*?.map/u,
				`sourceMappingURL=${source}.map`
			)
			eval?.(resp)
		})
}
