import { update } from '@shoutem/redux-io';
import { url, appId } from 'environment';
import { EXTENSION_INSTALLATIONS, SHORTCUTS } from './types';

export function updateExtensionInstallationSettings(id, settings) {
  const config = {
    endpoint: `//${url.apps}/v1/apps/${appId}/installations/${id}`,
    headers: {
      'Content-Type': 'application/vnd.api+json',
    },
  };

  const partialInstallation = {
    type: EXTENSION_INSTALLATIONS,
    id,
    attributes: {
      settings,
    },
  };

  return update(config, EXTENSION_INSTALLATIONS, partialInstallation);
}

export function updateShortcutSettings(id, settings) {
  const config = {
    endpoint: `//${url.apps}/v1/apps/${appId}/shortcuts/${id}`,
    headers: {
      'Content-Type': 'application/vnd.api+json',
    },
  };

  const partialShortcut = {
    type: SHORTCUTS,
    id,
    attributes: {
      settings,
    },
  };

  return update(config, SHORTCUTS, partialShortcut);
}
