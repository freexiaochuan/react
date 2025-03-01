const _forks = {
  React: {
    "./packages/shared/ReactSharedInternals.js": "./packages/react/src/ReactSharedInternalsClient.js",
    "./packages/shared/ReactDOMSharedInternals.js": new Error('fork error'),
    "./packages/scheduler/src/SchedulerFeatureFlags.js": "./packages/scheduler/src/SchedulerFeatureFlags.js",
    "./packages/use-sync-external-store/src/useSyncExternalStore.js": "./packages/use-sync-external-store/src/forks/useSyncExternalStore.forward-to-built-in.js",
    "./packages/use-sync-external-store/src/isServerEnvironment.js": undefined,
  },
  ReactDOM: {
    "./packages/shared/ReactDOMSharedInternals.js": "./packages/react-dom/src/ReactDOMSharedInternals.js",
    "./packages/scheduler/src/SchedulerFeatureFlags.js": "./packages/scheduler/src/SchedulerFeatureFlags.js",
    "./packages/react-reconciler/src/ReactFiberConfig.js": "./packages/react-reconciler/src/forks/ReactFiberConfig.dom.js",
    "./packages/react-server/src/ReactServerStreamConfig.js": "./packages/react-server/src/forks/ReactServerStreamConfig.dom-browser.js",
    "./packages/react-server/src/ReactFizzConfig.js": "./packages/react-server/src/forks/ReactFizzConfig.dom.js",
    "./packages/react-server/src/ReactFlightServerConfig.js": "./packages/react-server/src/forks/ReactFlightServerConfig.dom-browser.js",
    "./packages/react-client/src/ReactFlightClientConfig.js": "./packages/react-client/src/forks/ReactFlightClientConfig.dom-browser.js",
    "./packages/use-sync-external-store/src/useSyncExternalStore.js": "./packages/use-sync-external-store/src/forks/useSyncExternalStore.forward-to-built-in.js",
    "./packages/use-sync-external-store/src/isServerEnvironment.js": undefined,
  },
  ReactDOMClient: {
    "./packages/scheduler/src/SchedulerFeatureFlags.js": "./packages/scheduler/src/SchedulerFeatureFlags.js",
    "./packages/react-reconciler/src/ReactFiberConfig.js": "./packages/react-reconciler/src/forks/ReactFiberConfig.dom.js",
    "./packages/react-server/src/ReactServerStreamConfig.js": "./packages/react-server/src/forks/ReactServerStreamConfig.dom-browser.js",
    "./packages/react-server/src/ReactFizzConfig.js": "./packages/react-server/src/forks/ReactFizzConfig.dom.js",
    "./packages/react-server/src/ReactFlightServerConfig.js": "./packages/react-server/src/forks/ReactFlightServerConfig.dom-browser.js",
    "./packages/react-client/src/ReactFlightClientConfig.js": "./packages/react-client/src/forks/ReactFlightClientConfig.dom-browser.js",
    "./packages/use-sync-external-store/src/useSyncExternalStore.js": "./packages/use-sync-external-store/src/forks/useSyncExternalStore.forward-to-built-in.js",
    "./packages/use-sync-external-store/src/isServerEnvironment.js": undefined,
  }
};


module.exports = {
  _forks,
}
