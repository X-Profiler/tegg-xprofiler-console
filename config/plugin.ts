import path from 'path';

export default {
  auth: {
    enable: true,
    path: path.join(__dirname, '../src/plugin/auth'),
  },

  mysql: {
    enable: true,
    path: path.join(__dirname, '../src/plugin/mysql'),
  },

  render: {
    enable: true,
    path: path.join(__dirname, '../src/plugin/render'),
  },
};
