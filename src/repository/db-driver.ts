import {addRxPlugin, createRxDatabase, RxDatabase} from "rxdb";
import {getRxStorageDexie} from "rxdb/plugins/storage-dexie";
import {RxDBDevModePlugin} from 'rxdb/plugins/dev-mode';
import {RxDBMigrationPlugin} from 'rxdb/plugins/migration';

addRxPlugin(RxDBMigrationPlugin);
addRxPlugin(RxDBDevModePlugin);

export namespace DbDriver {
  let driver: null | RxDatabase = null;

  export function getDriver(): RxDatabase {
    return driver!;
  }

  export async function initialize(): Promise<void> {
    driver = await createRxDatabase({
      name: 'poe_l10n',
      storage: getRxStorageDexie(),
      ignoreDuplicate: true,
    });
    return Promise.resolve();
  }

  export function remove(): Promise<string[]> {
    return driver!.remove();
  }

}
