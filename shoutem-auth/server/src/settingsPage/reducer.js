import { combineReducers } from 'redux';
import { collection, one, find, update } from '@shoutem/redux-io';
import { auth, url, appId } from 'environment';
import { ext } from 'context';
import { EXTENSION_INSTALLATIONS, SHORTCUTS } from 'types';

export default combineReducers({
  shortcuts: collection(SHORTCUTS, ext('shortcuts')),
});

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

export function loadShortcuts() {
  const config = {
    schema: SHORTCUTS,
    request: {
      endpoint: `//${url.apps}/v1/apps/${appId}/shortcuts`,
      headers: {
        'Accept': 'application/vnd.api+json',
      },
    },
  };

  return find(config, ext('shortcuts'));
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
