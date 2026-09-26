import * as migration_20260925_162048_initial from './20260925_162048_initial';

export const migrations = [
  {
    up: migration_20260925_162048_initial.up,
    down: migration_20260925_162048_initial.down,
    name: '20260925_162048_initial'
  },
];
