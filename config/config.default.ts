import path from 'path';

export default {
  port: 7001,

  mysql: {
    clients: {
      xprofiler_console: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'xprofiler_console',
      },
      xprofiler_logs: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'xprofiler_logs',
      },
    },
  },

  render: {
    engine: 'ejs',
    options: {
      cache: true,
      root: path.join(__dirname, '../src/view'),
    },
  },
};
