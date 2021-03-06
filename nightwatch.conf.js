'use strict'
require('@babel/register')()

const crxFile = require('fs').readFileSync('./test-browser/extensions/chrome/metamask_7.7.9.crx')
const metamaskExtension = new Buffer.from(crxFile).toString('base64')

module.exports = {
  'src_folders': ['test-browser/tests'],
  'output_folder': 'test-browser/reports',
  'custom_commands_path': ['test-browser/commands'],
  'custom_assertions_path': '',
  'page_objects_path': '',
  'globals_path': '',

  'test_settings': {
    'default': {
      'selenium_port': 4444,
      'selenium_host': 'localhost',
      'globals': {
        'waitForConditionTimeout': 10000,
        'asyncHookTimeout': 100000
      },
      'screenshots': {
        'enabled': true,
        'path': './reports/screenshots',
        'on_failure': true,
        'on_error': true
      },
      'desiredCapabilities': {
        'browserName': 'firefox',
        'javascriptEnabled': true,
        'acceptSslCerts': true
      },
    },

    'chrome': {
      'desiredCapabilities': {
        'browserName': 'chrome',
        'javascriptEnabled': true,
        'acceptSslCerts': true,
        'goog:chromeOptions': {
          'args': ['window-size=2560,1440'],
          'extensions': [metamaskExtension]
        }
      }
    },

    'safari': {
      'desiredCapabilities': {
        'browserName': 'safari',
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    },

    'ie': {
      'desiredCapabilities': {
        'browserName': 'internet explorer',
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    },

    'firefox': {
      'desiredCapabilities': {
        'browserName': 'firefox',
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    }
  }
}
