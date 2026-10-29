const path = require('path')

const defaultJsonFolder = process.env.SERINA_DATA_DIR || path.join(__dirname, '../json')

module.exports = {
  ENABLE_SORT_ASC_JSON: true,
  JSON_NB_SPACES_INDENT: 2,
  PATH_API: '/api',
  PATH_JSON_FOLDER: defaultJsonFolder,
  DEFAULT_PATH_JSON_FOLDER: defaultJsonFolder,
  ADD: 'add',
  UPDATE: 'update',
  DELETE: 'delete'
}
