import * as migration_20260925_162048_initial from './20260925_162048_initial';
import * as migration_20260930_120948_about_video from './20260930_120948_about_video';
import * as migration_20260930_124718_light_theme from './20260930_124718_light_theme';

export const migrations = [
  {
    up: migration_20260925_162048_initial.up,
    down: migration_20260925_162048_initial.down,
    name: '20260925_162048_initial',
  },
  {
    up: migration_20260930_120948_about_video.up,
    down: migration_20260930_120948_about_video.down,
    name: '20260930_120948_about_video',
  },
  {
    up: migration_20260930_124718_light_theme.up,
    down: migration_20260930_124718_light_theme.down,
    name: '20260930_124718_light_theme'
  },
];
